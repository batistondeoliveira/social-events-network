<?php

namespace Controller;

use Entity\UserEntity;

use JMS\Serializer\SerializerBuilder;

use Model\UserModel;
use Model\UserLoginModel;

use Slim\Http\Request;
use Slim\Http\Response;

use Pimple\Tests\Fixtures\PimpleServiceProvider;

abstract class AbstractController {    
    /**
     * @var $container PimpleServiceProvider
     */
	protected $container;

    protected $dirUpload;     
    
    protected $auth;

	public function __construct($container) {			
        $this->dirUpload = $container->dirUpload;
        $this->container = $container;        
    }	
    
    public function handlingError($classes, $ex) {
        $listError = [];

        foreach($classes as $value) {
            $error = $value->getError($ex);

            if(!empty($error))
                array_push($listError, $error);
        }   
        
        return $listError;
    }
    
    public function serialize($jsonArray) {
        $serializer = SerializerBuilder::create()->build(); 
        
        return $serializer->toArray($jsonArray); 
    }

    public function auth(Request $request) {
        $userModel = new UserModel($this->container->em);

        $userEntity = $userModel->getByEmail($request->getHeaderLine('email'));

        if(empty($userEntity)) {
            header("HTTP/1.0 401");
            exit;
        }

        $userLoginModel = new UserLoginModel($this->container->em);

        $userLoginEntity = $userLoginModel->getByCredentials(
            $userEntity->getId(),
            $request->getHeaderLine('x-token')
        );

        if(empty($userLoginEntity)) {
            header("HTTP/1.0 401");
            exit;
        }        

        $this->auth = $userEntity;
    }
}