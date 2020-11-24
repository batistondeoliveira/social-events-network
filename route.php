<?php

//User
$app->post('/user', 'Controller\UserController:save');
$app->post('/user/login', 'Controller\UserController:login');

//Event
$app->post('/event', 'Controller\EventController:save');
$app->get('/event/detail/{id}', 'Controller\EventController:getById');
$app->get('/event/list', 'Controller\EventController:getAllActiveEvent');