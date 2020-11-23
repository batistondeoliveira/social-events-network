<?php

namespace Controller;

use Entity\EventEntity;
use Entity\UserEntity;

use Model\EventModel;
use Model\UserModel;

use Slim\Http\Request;
use Slim\Http\Response;

class EventController extends AbstractController {
    public function __construct($container) {
        parent::__construct($container);
    }      

    /**
     * @api {post} /event Save a new event
     * @apiVersion 1.0.0
     * @apiName save
     * @apiGroup event
     *
     * @apiParam (parameters) {json} body User object to be added to the database
     *     
     * @apiParamExample {json} Exemple Value
     *    {     
     *      "user": "fulano@gmail.com"
     *      "name": "Congresso Campinas",
     *      "description": "Participação especial de palestrantes famosos",
     *      "date": "19/08/2021",
     *      "time": "09:00",
     *      "place": "Shopping Campinas"
     *    }
     * 
     * @apiError (401) MessageError Validation error message     
     * @apiError (402) String Usuário não encontrado
     *
     * @apiSuccess (200) {String} token Generated validation token
     * 
     * 
     * @apiSuccessExample {json} Exemple Value
     *    {
     *      "id": 1,
     *      "user": "fulano@gmail.com"
     *      "name": "Congresso Campinas",
     *      "description": "Participação especial de palestrantes famosos",
     *      "date": "19/08/2021",
     *      "time": "09:00",
     *      "place": "Shopping Campinas"     
     *    }
     */
    public function save(Request $request, Response $response) {                         
        try {            
            $json = json_decode($request->getBody());                        

            $eventEntity = new EventEntity();

            $eventEntity = $eventEntity->deserialize($json);
            
            $userModel = new UserModel($this->container->em);

            $userEntity = $userModel->getByEmail($eventEntity->getUser());

            if(empty($userEntity))
                return $response->withJson('Usuário não encontrado', 402, JSON_UNESCAPED_UNICODE);

            $eventEntity->setIdUser($userEntity->getId());

            $eventModel = new EventModel($this->container->em);                    
            
            $eventModel->save($eventEntity);                                   

            return $response->withJson($eventEntity->serialize(), 200);
        } catch(\Exception $ex) {            
            return $response->withJson(
                $this->handlingError(
                    [$eventEntity],
                    $ex
                ), 401, JSON_UNESCAPED_UNICODE);
        }
    }
}