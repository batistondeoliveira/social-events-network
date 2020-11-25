<?php

namespace Controller;

use Classes\Exceptions\InvalidDateException;
use Classes\MyDateTime;

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
     * @apiError (402) InvalidDateException A data do evento não pode ser menor que a data atual
     * @apiError (403) String Usuário não encontrado
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
        $this->auth($request);

        try {            
            $json = json_decode($request->getBody());                        

            $eventEntity = new EventEntity();

            $eventEntity = $eventEntity->deserialize($json);
                        
            $userModel = new UserModel($this->container->em);

            $userEntity = $userModel->getByEmail($this->auth->getEmail());

            if(empty($userEntity))
                return $response->withJson('Usuário não encontrado', 403, JSON_UNESCAPED_UNICODE);

            $eventEntity->setIdUser($userEntity->getId());

            $eventModel = new EventModel($this->container->em);                    
            
            $eventModel->save($eventEntity);            

            return $response->withJson($eventEntity->serialize(), 200);
        } catch(InvalidDateException $ex1) {
            return $response->withJson($ex1->getMessage(), 402);
        } catch(\Exception $ex2) {            
            return $response->withJson(
                $this->handlingError(
                    [$eventEntity],
                    $ex2
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

    /**
     * @api {get} /event/list/{id} Show event by id
     * @apiVersion 1.0.0
     * @apiName list/
     * @apiGroup event
     *           
     * @apiError (401) String Unauthorized action
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
    public function getEventsByEmailUser(Request $request, Response $response) {
        $this->auth($request);

        $eventModel = new EventModel($this->container->em);                

        $email = $this->auth->getEmail();
        
        if(empty($email))
            return $response->withJson('Informe o email do usuário', 402, JSON_UNESCAPED_UNICODE); 

        $list = $eventModel->getEventsByEmailUser($email);                

        return $response->withJson($this->serialize($list), 200);
    }

    /**
     * @api {delete} /event/{id} Delete an event by id
     * @apiVersion 1.0.0
     * @apiName event/
     * @apiGroup event          
     * 
     * @apiError (401) String Unauthorized action
     * 
     * 
     * @apiSuccess (200) {String} mensagem Evento excluído com sucesso
     *          
     */
    public function delete(Request $request, Response $response, $args) {
        $this->auth($request);

        $eventModel = new EventModel($this->container->em);                
        
        $eventEntity = $eventModel->getById($args['id']);
        
        if(empty($eventEntity))
            return $response->withJson('Evento excluído com sucesso', 200, JSON_UNESCAPED_UNICODE);

        $eventModel->remove($eventEntity);

        return $response->withJson('Evento excluído com sucesso', 200, JSON_UNESCAPED_UNICODE);
    }
}