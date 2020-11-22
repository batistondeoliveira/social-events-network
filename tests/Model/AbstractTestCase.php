<?php

namespace tests\Model;

use PHPUnit\Framework\TestCase;

abstract class AbstractTestCase extends TestCase {
    private $em;

    private function prepareDB() {  
        require 'config.php';
        
        $configDoctrine =  \Doctrine\ORM\Tools\Setup::createConfiguration($config['local']);
        $driver = new \Doctrine\ORM\Mapping\Driver\AnnotationDriver(
            new \Doctrine\Common\Annotations\AnnotationReader(), ['../']
        );


        \Doctrine\Common\Annotations\AnnotationRegistry::registerLoader('class_exists');
        $configDoctrine->setMetadataDriverImpl($driver);
        $configDoctrine->setProxyDir('../Model/Proxy');
        $configDoctrine->setProxyNamespace('Model\Proxy');        
        $configDoctrine->setAutoGenerateProxyClasses(true);                

        $this->em = \Doctrine\ORM\EntityManager::create($config['test'], $configDoctrine);                        
    }

    public function setUp() {        
        //clear all itens from the cache
        (new \Doctrine\Common\Cache\FilesystemCache('./temp'))->deleteAll();
        
        $this->prepareDB();
    }

    public function getEm() {
        return $this->em;
    }
}