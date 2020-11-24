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
     * @apiSuccess (200) {String} json Persisted user json object
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

    /**
     * @api {get} /event/list List all available events
     * @apiVersion 1.0.0
     * @apiName list
     * @apiGroup event
     *           
     * @apiSuccess (200) {jsonArray} data List all available events
     *      
     */
    public function getAllActiveEvent(Request $request, Response $response) {                         
        $eventModel = new EventModel($this->container->em);        
        
        return $response->withJson($this->serialize($eventModel->getAllActiveEvent()), 200);
    }

    /**
     * @api {get} /event/list/{id} Show event by id
     * @apiVersion 1.0.0
     * @apiName list/
     * @apiGroup event
     *           
     * @apiError (402) String Informe o id do evento
     * @apiError (403) String Evento não encontrado
     * 
     * @apiSuccess (200) {String} json event object json
     * 
     * 
     * @apiSuccessExample {json} Exemple Value
     *    {
     *      "id": 1,     
     *      "name": "Congresso Campinas",     
     *      "date": "19/08/2021",
     *      "time": "09:00",
     *      "place": "Shopping Campinas"     
     *    }
     */
    public function getById(Request $request, Response $response, $args) {                         
        $eventModel = new EventModel($this->container->em);        
        
        $id = $args['id'];

        if(empty($id))
            return $response->withJson('Informe o id do evento', 402, JSON_UNESCAPED_UNICODE); 

        $eventEntity = $eventModel->getById($id);        

        if(empty($eventEntity))
            return $response->withJson('Evento não encontrado', 403, JSON_UNESCAPED_UNICODE); 

        return $response->withJson($eventEntity->serialize(), 200);
    }
}