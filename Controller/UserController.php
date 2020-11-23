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
     * @api {post} /user/save Save a new user
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
     * @apiError (401) Exception Validation error message     
     *
     * @apiSuccess (200) {jsonArray} json Persisted user json object
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
}