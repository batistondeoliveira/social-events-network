<?php

namespace Controller;

use Entity\UserEntity;

use Model\UserModel;

use Slim\Http\Request;
use Slim\Http\Response;

class UserController extends AbstractController {
    public function __construct($container) {
        parent::__construct($container);
    }      

    /**
     * @api {post} /user Save a new user
     * @apiVersion 1.0.0
     * @apiName save
     * @apiGroup user
     *
     * @apiParam (parameters) {jsonArray} body User object to be added to the database
     *     
     * @apiParamExample {json} Exemple Value
     *    {
     *      "name": "Fulano",
     *      "email": "fulano@gmail.com",
     *      "password": "123456",
     *      "bio": "",
     *      "profile_picture": "",
     *      "city": "Fulano City",
     *      "state": "MG"
     *    }
     * 
     * @apiError (401) MessageError Validation error message     
     *
     * @apiSuccess (200) {String} token Generated validation token
     * 
     * @apiSuccessExample {json} Exemple Value
     *    {
     *      "id": 1,
     *      "name": "Fulano",
     *      "email": "fulano@gmail.com",
     *      "password": "123456",
     *      "bio": "",
     *      "profile_picture": "",
     *      "city": "Fulano City",
     *      "state": "MG"
     *    }
     */
    public function save(Request $request, Response $response) {                         
        try {            
            $jsonArray = json_decode($request->getBody());                        

            $userEntity = new UserEntity();

            $userEntity = $userEntity->deserialize($jsonArray);
            
            $userModel = new UserModel($this->container->em);
            
            $userModel->save($userEntity);                                                     

            return $response->withJson($userEntity->serialize(), 200);
        } catch(\Exception $ex) {            
            return $response->withJson(
                $this->handlingError(
                    [$userEntity],
                    $ex
                ), 401, JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * @api {post} /user/login User login
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
     * @apiError (401) MessageError Usuário e/ou senha inválido    
     *
     * @apiSuccess (200) {jsonArray} json Persisted user json object
     * 
     * @apiSuccessExample {json} Exemple Value
     *    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJHlGc0JJN2VvNjdSTmc4SU9DeHhUQk95YVBzWmpCZGZtUGxDVWtkTGdIQXFta01FNm4zT3dlIiwiaWQiOjEsImlhdCI6MTYwNjA5NjU2MywiZXhwIjoxNjA2MTAwMTYzfQ.6huB7zuB6Mo9jUWVvILad9Jd-SvTP9EqKZgmQjP6Hj4
     */
    public function login(Request $request, Response $response) {
        $key = $this->container['key'];
                
        $email = $request->getParsedBodyParam('email');
        $senha = $request->getParsedBodyParam('password');           

        $userModel = new UserModel($this->container->em);
        
        $token = $userModel->login($key, $email, $senha);

        if(empty($token))
            return $response->withJson('Usuário e/ou senha inválido', 401, JSON_UNESCAPED_UNICODE);                

        return $response->withJson($token, 200);        
    }
}