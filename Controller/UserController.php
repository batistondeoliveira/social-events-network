<?php

namespace Controller;

use Entity\UserEntity;
use Entity\FriendshipEntity;

use Model\UserModel;
use Model\FriendshipModel;
use Model\UserLoginModel;

use Slim\Http\Request;
use Slim\Http\Response;

class UserController extends AbstractController {
    public function __construct($container) {
        parent::__construct($container);
    }      

    /**
     * @api {post} /api/user Save a new user
     * @apiVersion 1.0.0
     * @apiName save
     * @apiGroup user
     *
     * @apiParam (parameters) {json} body User object to be added to the database
     *     
     * @apiParamExample {json} Exemple Value
     *    {
     *      "name": "Fulano",
     *      "email": "fulano@gmail.com",
     *      "password": "123456",
     *      "bio": "",
     *      "profile_picture": "",
     *      "city": "Fulano City",
     *      "state": "MG",
     *      "idUserInvitedBy": 0
     *    }
     * 
     * @apiError (405) MessageError Validation error message     
     *
     * @apiSuccess (200) {String} json Persisted user json object
     * 
     * @apiSuccessExample {json} Exemple Value
     *    {
     *      "id": 1,
     *      "name": "Fulano",
     *      "email": "fulano@gmail.com",     
     *      "bio": "",
     *      "profile_picture": "",
     *      "city": "Fulano City",
     *      "state": "MG"
     *    }
     */
    public function save(Request $request, Response $response) {                         
        try {                        
            $userEntity = new UserEntity();

            $userEntity->setName($request->getParsedBodyParam('name'));
            $userEntity->setBio($request->getParsedBodyParam('bio'));
            $userEntity->setCity($request->getParsedBodyParam('city'));
            $userEntity->setState($request->getParsedBodyParam('state'));
            $userEntity->setEmail($request->getParsedBodyParam('email'));
            $userEntity->setPassword($request->getParsedBodyParam('password'));                        
            
            $userModel = new UserModel($this->container->em);
            
            $userModel->save($userEntity); 
            
            /**
             * @var UploadedFile[] $upload
             */
            $upload = $request->getUploadedFiles();
            if(!empty($upload) && !empty($upload['profile_picture']->getClientFilename())) {
                $ext = pathinfo($upload['profile_picture']->getClientFilename(), PATHINFO_EXTENSION);

                $fileName = $userEntity->getId() . '.' . $ext;

                $upload['profile_picture']->moveTo($this->dirUpload . 'user/' . $fileName);

                $userEntity->setProfilePicture($fileName);
            }            

            $userModel->save($userEntity); 

            if(empty($request->getParsedBodyParam('idInvitedBy')))
                return $response->withJson($userEntity->serialize(), 200);

            $friendshipModel = new FriendshipModel($this->container->em);

            $friendshipEntity = new FriendshipEntity();

            $friendshipEntity->setIdUser($userEntity->getId());
            $friendshipEntity->setIdUserFriendship($request->getParsedBodyParam('idInvitedBy'));

            $friendshipModel->save($friendshipEntity);

            return $response->withJson($userEntity->serialize(), 200);
        } catch(\Exception $ex) {            
            return $response->withJson(
                $this->handlingError(
                    [$userEntity],
                    $ex
                ), 405, JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * @api {post} /api/user/login User login
     * @apiVersion 1.0.0
     * @apiName login
     * @apiGroup user
     *
     * @apiParam (parameters) {String} email User's email
     * @apiParam (parameters) {String} password Password to login 
     *     
     * @apiParamExample {json} Exemple Value
     *    {     
     *      "email": "fulano@gmail.com",
     *      "password": "123456",     
     *    }
     * 
     * @apiError (402) MessageError Usuário e/ou senha inválido    
     *
     * @apiSuccess (200) {String} String Generated validation token
     * 
     * @apiSuccessExample {json} Exemple Value
     *    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJHlGc0JJN2VvNjdSTmc4SU9DeHhUQk95YVBzWmpCZGZtUGxDVWtkTGdIQXFta01FNm4zT3dlIiwiaWQiOjEsImlhdCI6MTYwNjA5NjU2MywiZXhwIjoxNjA2MTAwMTYzfQ.6huB7zuB6Mo9jUWVvILad9Jd-SvTP9EqKZgmQjP6Hj4
     */
    public function login(Request $request, Response $response) {
        $key = $this->container['key'];
                
        $email = $request->getParsedBodyParam('email');
        $password = $request->getParsedBodyParam('password');           

        $userModel = new UserModel($this->container->em);
        
        $userEntity = $userModel->login($key, $email, $password, $token);

        if(empty($token))
            return $response->withJson('Usuário e/ou senha inválido', 402, JSON_UNESCAPED_UNICODE);
            
        if(empty($userEntity))
            return $response->withJson('Usuário e/ou senha inválido', 402, JSON_UNESCAPED_UNICODE);

        return $response->withJson([            
            'token' => $token,
            'name' => $userEntity->getName(),
            'profile_picture' => $userEntity->getProfilePicture()
        ], 200);        
    }

    /**
     * @api {post} /api/logout User logout
     * @apiVersion 1.0.0
     * @apiName logout
     * @apiGroup user
     *
     * @apiHeader {String} x-token header User's token     
     * 
     * @apiHeaderExample {json} Header-Example:
     *    {
     *       "X-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ"     
     *    }     
     *                    
     *
     * @apiSuccess (200) {String} String Logout efetuado com sucesso
     *      
     */
    public function logout(Request $request, Response $response) {        
        $userLoginModel = new UserLoginModel($this->container->em);        
                
        $token = $request->getHeaderLine('X-Token');        

        $userLoginModel->logout($token);            

        return $response->withJson('Logout efetuado com sucesso', 200);      
    }
}