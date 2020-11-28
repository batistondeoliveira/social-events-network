<?php

ini_set('display_errors',0); 
ini_set('display_startup_erros',0); 
error_reporting(E_ALL);

define('_LOCAL_' , true); //mudar para false em producao
define('_BASE_' , (_LOCAL_ == true) ?  '../' : '../app/');
date_default_timezone_set('America/Sao_Paulo');

require _BASE_ . 'vendor/autoload.php';
require _BASE_. 'config.php';

global $config;

require 'doctrine.php';

global $configDoctrine;

$app = new \Slim\App($config);

$container = $app->getContainer();

$container['dirUpload'] = (_LOCAL_) ?__DIR__ . '/../img/'  : __DIR__. '/../public_html/img/';

$container['config'] = function ($container) use ($config) {
   return $config;
};

$container['key'] = function ($container) {
   return '87fdjfduity*';
};

$container['em'] = function ($container) use ($config, $configDoctrine) {
   return Doctrine\ORM\EntityManager::create($config['db'], $configDoctrine);
};

$app->options('/{routes:.+}', function ($request, $response, $args) {
   return $response;
});

require _BASE_ . 'route.php';

$app->add(new Slim\Middleware\JwtAuthentication([
    "regexp" => "/(.*)/",
    "header" => "X-Token",
    "path" => "/",
    "passthrough" => [          
        //user
        '/user',
        '/user/login',

        //event
        '/event',
        '/event/list',
        '/event/mylist',
        '/event/detail',
        '/event/place/list',        

        //friendship
        '/friendship',
        '/friendship/undo',
        '/friendship/event/invite',

        //Invite
        '/invite/friendship',
        '/invite/event',
    ],
    "realm" => "Protected",
    "secure" => false,
    "secret" => $container['key'],
    "callback" => function (\Slim\Http\Request $request, \Slim\Http\Response $response, $arguments) use ($container) {        
        
    }
]));

unset($config);

$app->run();