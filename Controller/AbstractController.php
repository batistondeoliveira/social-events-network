<?php

namespace Controller;

use JMS\Serializer\SerializerBuilder;

use Slim\Http\Request;
use Slim\Http\Response;

use Pimple\Tests\Fixtures\PimpleServiceProvider;

abstract class AbstractController {    
    /**
     * @var $container PimpleServiceProvider
     */
	protected $container;

    protected $dirUpload;        

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
}