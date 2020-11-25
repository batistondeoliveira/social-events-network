<?php

namespace Controller;

use Entity\FriendshipEntity;

use Model\FriendshipModel;

use Slim\Http\Request;
use Slim\Http\Response;

class FriendshipController extends AbstractController {
    public function __construct($container) {
        parent::__construct($container);
    }      

    /**
     * @api {get} /friendship List all your friends
     * @apiVersion 1.0.0
     * @apiName list
     * @apiGroup friendship
     *                          
     * 
     * @apiSuccess (200) {jsonArray} data List all available friends
     * 
     * @apiSuccessExample {json} Exemple Value
     * 
     * [
     *   {
     *     "name": "fulano",
     *     "email": "fulano@yahoo.com.br"
     *   },
     *   {
     *     "name": "Beltrano",
     *     "email": "beltrano@yahoo.com.br"
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
}