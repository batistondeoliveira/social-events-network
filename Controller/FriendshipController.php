<?php

namespace Controller;

use Classes\Enums\FriendshipTypeEnum;

use Entity\FriendshipEntity;

use Model\FriendshipModel;
use Model\UserModel;

use Slim\Http\Request;
use Slim\Http\Response;

class FriendshipController extends AbstractController {
    public function __construct($container) {
        parent::__construct($container);
    }      

    /**
     * @api {get} /api/friendship List all your friends
     * @apiVersion 1.0.0
     * @apiName list
     * @apiGroup friendship
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
     * @apiError (401) String Unauthorized action     
     * 
     * 
     * @apiSuccess (200) {jsonArray} data List all available friends
     * 
     * @apiSuccessExample {json} Exemple Value
     * 
     * [
     *   {
     *     "name": "fulano",
     *     "email": "fulano@yahoo.com.br",
     *     "type": "Owner"
     *   },
     *   {
     *     "name": "Beltrano",
     *     "email": "beltrano@yahoo.com.br",
     *     "type": "Friendship"
     *   }
     * ]
     *      
     */
    public function list(Request $request, Response $response) {
        $this->auth($request);

        $friendShipModel = new FriendshipModel($this->container->em);              
        
        $list = $friendShipModel->list($this->auth->getId());
        
        return $response->withJson($this->serialize($list), 200);
    }

    /**
     * @api {post} /api/friendship/undo undo friendship
     * @apiVersion 1.0.0
     * @apiName undoFriendship
     * @apiGroup friendship
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
     * @apiError (401) String Unauthorized action
     * @apiError (402) String Erro ao desfazer amizade
     * 
     * @apiSuccess (200) {string} message Amizade desfeita com sucesso
     *      
     */
    public function undoFriendship(Request $request, Response $response) {
        $this->auth($request);

        $idUserFriendship = $request->getParsedBodyParam('idUser');
        $type = $request->getParsedBodyParam('type');

        $resp = FriendshipTypeEnum::get($type)->invoke(
            $this, 
            $this->container->em,
            $this->auth->getId(),
            $idUserFriendship
        );

        if(!$resp)
            return $response->withJson('Erro ao desfazer amizade', 402, JSON_UNESCAPED_UNICODE);    

        return $response->withJson('Amizade desfeita com sucesso', 200, JSON_UNESCAPED_UNICODE);
    }

    /**
     * @api {get} /api/friendship/event/invite/{idEvento} List all your friends who have not been invited to an event 
     * @apiVersion 1.0.0
     * @apiName inviteEventList
     * @apiGroup friendship
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
     * @apiError (401) String Unauthorized action     
     * @apiError (402) String ID do evento não informado
     * 
     * 
     * @apiSuccess (200) {jsonArray} data List all available friends
     * 
     * @apiSuccessExample {json} Exemple Value
     * 
     * [
     *   {
     *     "name": "fulano",
     *     "email": "fulano@yahoo.com.br",
     *     "type": "Owner"
     *   },
     *   {
     *     "name": "Beltrano",
     *     "email": "beltrano@yahoo.com.br",
     *     "type": "Friendship"
     *   }
     * ]
     *      
     */
    public function inviteEventList(Request $request, Response $response, $args) {
        $this->auth($request);

        $idEvento = $args['idEvento'];

        if(empty($idEvento))
            $response->withJson('ID do evento não informado', 402, JSON_UNESCAPED_UNICODE);    

        $friendShipModel = new FriendshipModel($this->container->em);              
        
        $list = $friendShipModel->inviteEventList(
            $this->auth->getId(),
            $idEvento
        );
        
        return $response->withJson($this->serialize($list), 200);
    }
}