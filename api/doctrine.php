<?php

$configDoctrine =  \Doctrine\ORM\Tools\Setup::createConfiguration($config['local']);
$driver = new \Doctrine\ORM\Mapping\Driver\AnnotationDriver(new \Doctrine\Common\Annotations\AnnotationReader(), ['../']);

\Doctrine\Common\Annotations\AnnotationRegistry::registerLoader('class_exists');
$configDoctrine->setMetadataDriverImpl($driver);
$configDoctrine->setProxyDir('../Model/Proxy');
$configDoctrine->setProxyNamespace('Model\Proxy');
$configDoctrine->addCustomStringFunction('DATE', 'Classes\DoctrineExtensions\Date');

$configDoctrine->setAutoGenerateProxyClasses(true);

if($config['local']) {
   $configDoctrine->setAutoGenerateProxyClasses(true);
   error_reporting(E_ALL);
   ini_set('display_erros',1);
}

$em = Doctrine\ORM\EntityManager::create($config['db'], $configDoctrine);
function getEntityManager(){
    global $em;
    return $em;
}