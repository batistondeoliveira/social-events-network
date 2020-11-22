<?php

namespace Controller;

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
}