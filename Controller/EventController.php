<?php

namespace Controller;

use Classes\Enums\ActiveEnum;
use Classes\Exceptions\InvalidDateException;
use Classes\Exceptions\InvalidTypeException;
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
     * @apiHeader {String} x-token header User's token
     * @apiHeader {String} E-Mail header User's email
     * 
     * @apiHeaderExample {json} Header-Example:
     *    {
     *       "X-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ"
     *       "E-Mail": "fulano@gmail.com"
     *    }
     * 
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
     * @apiError (401) String Unauthorized action
     * @apiError (402) String Usuário não encontrado 
     * @apiError (403) InvalidDateException A data do evento não pode ser menor que a data atual     
     * @apiError (405) InvalidTypeException Tipo do campo %s inválido
     * @apiError (406) MessageError Validation error message     
     *
     * @apiSuccess (200) {String} json Persisted user json object
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
                return $response->withJson('Usuário não encontrado', 402, JSON_UNESCAPED_UNICODE);

            $eventEntity->setIdUser($userEntity->getId());
            $eventEntity->setType('OWNER');

            $eventModel = new EventModel($this->container->em);                    
            
            $eventModel->save($eventEntity);            

            return $response->withJson($eventEntity->serialize(), 200);
        } catch(InvalidDateException $ex1) {
            return $response->withJson($ex1->getMessage(), 403);
        } catch(InvalidTypeException $ex2) { 
            return $response->withJson($ex2->getMessage(), 405);
        } catch(\Exception $ex3) {            
            return $response->withJson(
                $this->handlingError(
                    [$eventEntity],
                    $ex3
                ), 406, JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * @api {post} /event/list List all available events
     * @apiVersion 1.0.0
     * @apiName getAllActiveEvent
     * @apiGroup event
     *                
     * @apiParam (parameters) {array} filters Array with event filters by date and/or place
     * 
     * @apiParamExample {json} Exemple Value
     *    [     
     *      "data": "24/05/2021"
     *      "place": "Shopping",    
     *    ]
     * 
     * @apiSuccess (200) {jsonArray} data List all available events
     * 
     * @apiSuccessExample {json} Exemple Value
     *    [
     *       {
     *          "id": 1,
     *          "name":"Congresso Campinas",
     *          "date":"2021-08-01",
     *          "time":"09:00:00",
     *          "place":"Shopping"}
     *       }
     *    ]
     *      
     */
    public function getAllActiveEvent(Request $request, Response $response) {
        $eventModel = new EventModel($this->container->em);  
        
        $page = $request->getParsedBodyParam('page');
        $filters = $request->getParsedBodyParam('filters');
        
        $list = $eventModel->getAllActiveEvent($filters, $page);
        $totalRecords = $eventModel->getTotalRecords($filters);

        return $response->withJson([
            'body' => $this->serialize($list),
            'totalRecords' => $totalRecords
        ], 200);
    }

    /**
     * @api {get} /event/detail/{id} Show event by id
     * @apiVersion 1.0.0
     * @apiName getById
     * @apiGroup event
     *           
     *      
     * @apiError (402) String Informe o id do evento
     * @apiError (403) String Evento não encontrado
     * 
     * @apiSuccess (200) {String} json event object json
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
     * @api {post} /event/mylist Show event by id
     * @apiVersion 1.0.0
     * @apiName eventList
     * @apiGroup event
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
     * @apiParam (parameters) {array} filters Array with event filters by date and / or place
     * 
     * @apiParamExample {json} Exemple Value
     *    [     
     *      "data": "24/05/2021"
     *      "place": "Shopping",    
     *    ]
     * 
     * 
     * @apiError (401) String Unauthorized action     
     * 
     * @apiSuccess (200) {String} json event object json
     * 
     * @apiSuccessExample {json} Exemple Value
     *    [
     *      {
     *          "id":"1",
     *          "name":"Congresso Campinas",
     *          "date":"2021-08-01",
     *          "time":"09:00:00",
     *          "place":"Shopping",
     *          "type":"OWNER"
     *      },
     *      {
     *          "id":"2",
     *          "name":"Congresso Sao Paulo",
     *          "date":"2021-08-01",
     *          "time":"09:00:00",
     *          "place":"Shopping",
     *          "type":"GUEST"
     *      }
     *   ]
     * 
     */
    public function eventList(Request $request, Response $response) {
        $this->auth($request);

        $eventModel = new EventModel($this->container->em);                        
        
        $filters = $request->getParsedBodyParam('filters');
        
        $list = $eventModel->getEventsByFilter(
            $this->auth->getId(),
            $filters
        );

        return $response->withJson($this->serialize($list), 200);
    }

    /**
     * @api {get} /event/{id} Cancel an event by id
     * @apiVersion 1.0.0
     * @apiName cancelar
     * @apiGroup event          
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
     * 
     * @apiError (401) String Unauthorized action
     * @apiError (402) String Evento não encontrado
     * @apiError (403) String Você só pode cancelar seus próprios eventos
     * 
     * 
     * @apiSuccess (200) {String} mensagem Evento cancelado com sucesso
     *          
     */
    public function cancelar(Request $request, Response $response, $args) {
        $this->auth($request);
        
        $eventModel = new EventModel($this->container->em);                
        
        $eventEntity = $eventModel->getById($args['id']);
        
        if(empty($eventEntity))
            return $response->withJson('Evento não encontrado', 402, JSON_UNESCAPED_UNICODE);

        if($this->auth->getId() !== $eventEntity->getIdUser())
            return $response->withJson('Você só pode cancelar seus próprios eventos', 403, JSON_UNESCAPED_UNICODE);

        $eventEntity->setActive(ActiveEnum::NO);

        $eventModel->save($eventEntity);

        return $response->withJson('Evento cancelado com sucesso', 200, JSON_UNESCAPED_UNICODE);
    }

    /**
     * @api {get} /event/place/list List all available place
     * @apiVersion 1.0.0
     * @apiName placeList
     * @apiGroup event
     *           
     * @apiSuccess (200) {jsonArray} data List all available place
     *
     * @apiSuccessExample {json} Exemple Value
     *    [
     *      {"place":"Place 1"},
     *      {"place":"Place2"}
     *    ]
     *      
     */
    public function placeList(Request $request, Response $response) {                         
        $eventModel = new EventModel($this->container->em);        
        
        return $response->withJson($this->serialize($eventModel->placeList()), 200);
    }
}