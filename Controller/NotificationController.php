<?php

namespace Controller;

use Controller\AbstractController;

use Model\NotificationModel;

use Slim\Http\Request;
use Slim\Http\Response;

class NotificationController extends AbstractController {
    public function __construct($container) {
        parent::__construct($container);
    }          

    /**
     * @api {get} /api/notification returns user notifications
     * @apiVersion 1.0.0
     * @apiName notification
     * @apiGroup notification
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
     * @apiSuccess (200) {jsonArray} data List all notifications
     *      
     */
    public function notification(Request $request, Response $response) {
        $this->auth($request);
        
        $notificationModel = new NotificationModel($this->container->em);

        $list = $notificationModel->notification($this->auth->getId());

        return $response->withJson($this->serialize($list), 200, JSON_UNESCAPED_UNICODE);        
    }        
}