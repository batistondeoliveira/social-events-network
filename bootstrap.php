<?php

define('_LOCAL_' , true); 

require './vendor/autoload.php';

require 'config.php';

global $config;

require './api/doctrine.php';

global $configDoctrine;

$container = new \Slim\Container();

$container['em'] = function ($container) use ($config, $configDoctrine) {
   return Doctrine\ORM\EntityManager::create($config['db'], $configDoctrine);
};

$app = new \Slim\App($container);