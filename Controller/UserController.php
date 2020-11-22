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
                ), 400, JSON_UNESCAPED_UNICODE);
        }
    }
}