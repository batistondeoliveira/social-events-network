<?php

define('_LOCAL_' , true); 

require './vendor/autoload.php';

require 'config.php';

global $config;

$container = new \Slim\Container();

$isDevMode = true;

/**
 * Diretório de Entidades e Metadata do Doctrine
 */
$configDoctrine = \Doctrine\ORM\Tools\Setup::createAnnotationMetadataConfiguration(array(__DIR__."/Entity"), $isDevMode);


$em = \Doctrine\ORM\EntityManager::create($config['db'], $configDoctrine);

$container['em'] = $em;

$app = new \Slim\App($container);