<?php

namespace Controller;

use Classes\Exceptions\EmailException;
use Classes\Email;

use Controller\AbstractController;

use Entity\InviteFriendshipEntity;

use Model\FriendshipModel;
use Model\InviteFriendshipModel;
use Model\UserModel;

use Slim\Http\Request;
use Slim\Http\Response;

class InviteFriendshipController extends AbstractController {
    public function __construct($container) {
        parent::__construct($container);
    }      

    /**
     * @api {get} /invite/friendship/{email} invites someone to be your friend
     * @apiVersion 1.0.0
     * @apiName invite
     * @apiGroup invite friendship
     *                          
     * @apiHeader {String} x-token header User's token
     * @apiHeader {String} E-Mail header User's email
     * 
     * @apiHeaderExample {json} Header-Example:
     *    {
     *       "X-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ"
     *       "E-Mail": "fulano@gmail.com"
     *    }
     *       
     * @apiParam (parameters) {String} email User's email
     * 
     * @apiError (401) String Unauthorized action
     * @apiError (402) String Informe um e-mail válido
     * @apiError (403) String Você não pode enviar uma solicitação de amizade para você mesmo
     * @apiError (405) String Vocês já são amigos     
     * @apiError (406) EmailException Erro ao enviar o e-mail
     * @apiError (407) MessageError Validation error message     
     * 
     * @apiSuccess (200) {string} message Email de solicitação de convite de amizade enviada
     * @apiSuccess (201) {string} message Solicitação de convite enviada
     *      
     */
    public function invite(Request $request, Response $response, $args) {
        $this->auth($request);

        $email = $args['email'];
        
        if(empty($email))
            return $response->withJson('Informe um e-mail válido', 402, JSON_UNESCAPED_UNICODE);           

        if($email === $this->auth->getEmail())
            return $response->withJson('Você não pode enviar uma solicitação de amizade para você mesmo', 403, JSON_UNESCAPED_UNICODE);           

        $userModel = new UserModel($this->container->em);

        $userEntity = $userModel->getByEmail($email);                

        try {            
            if(empty($userEntity)) {
                Email::sendEmail(
                    $email,                     
                    'Você recebeu uma solicitação de amizade de [' . $this->auth->getName() . '] clique no link para se registrar: https://elielbatiston.life/convite/' . $this->auth->getId() . '/' . $email
                );

                return $response->withJson('Email de solicitação de convite enviada', 200, JSON_UNESCAPED_UNICODE);           
            }        

            $friendshipModel = new FriendshipModel($this->container->em);

            $friendshipEntity = $friendshipModel->getByIdFriendship(
                $this->auth->getId(),
                $userEntity->getId()                
            );

            if(!empty($friendshipEntity))
                return $response->withJson('Vocês já são amigos', 405, JSON_UNESCAPED_UNICODE);           
        
            $inviteEntity = new InviteFriendshipEntity();
            
            $inviteEntity->setIdUser($this->auth->getId());
            $inviteEntity->setIdUserFriendship($userEntity->getId());            

            $inviteModel = new InviteFriendshipModel($this->container->em);

            $inviteModel->save($inviteEntity);

            return $response->withJson('Solicitação de convite de amizade enviada', 201, JSON_UNESCAPED_UNICODE);        
        } catch(EmailException $ex1) {
            return $response->withJson('Erro ao enviar o e-mail', 406, JSON_UNESCAPED_UNICODE);           
        } catch(\Exception $ex2) {
            return $response->withJson(
                $this->handlingError(
                    [$inviteEntity],
                    $ex2
                ), 407, JSON_UNESCAPED_UNICODE);        
        }
    }
}