<?php

namespace tests\Model;

use PHPUnit\Framework\TestCase;

abstract class AbstractTestCase extends TestCase {
    private $em;

    private function prepareDB() {          
        if(!defined('_LOCAL_'))
            define('_LOCAL_' , true); 

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
        $configDoctrine->addCustomStringFunction('DATE', 'Classes\DoctrineExtensions\Date');             

        $this->em = \Doctrine\ORM\EntityManager::create($config['db'], $configDoctrine);        

        //Creating test's database
        $this->em->getConnection()->exec('CREATE DATABASE IF NOT EXISTS ' . $config['tests']['dbname']);

        //Conneting test's database
        $this->em = \Doctrine\ORM\EntityManager::create($config['tests'], $configDoctrine);        
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