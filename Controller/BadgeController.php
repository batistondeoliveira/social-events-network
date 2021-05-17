<?php

namespace Controller;

use Controller\AbstractController;

use Model\BadgeModel;

use Slim\Http\Request;
use Slim\Http\Response;

class BadgeController extends AbstractController {
    public function __construct($container) {
        parent::__construct($container);
    }          

    /**
     * @api {get} /api/badge returns the number of notifications from a user
     * @apiVersion 1.0.0
     * @apiName badge
     * @apiGroup badge
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
     * @apiSuccess (200) {string} message amount of notifications
     *      
     */
    public function badge(Request $request, Response $response) {
        $this->auth($request);
        
        $badgeModel = new BadgeModel($this->container->em);

        $count = $badgeModel->badge($this->auth->getId());

        return $response->withJson($count, 200);        
    }        
}