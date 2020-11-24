<?php

//User
$app->post('/user', 'Controller\UserController:save');
$app->post('/user/login', 'Controller\UserController:login');

//Event
$app->post('/event', 'Controller\EventController:save');
$app->get('/event', 'Controller\EventController:getEventsByEmailUser');
$app->delete('/event/{id}', 'Controller\EventController:delete');
$app->get('/event/detail/{id}', 'Controller\EventController:getById');
$app->get('/event/list', 'Controller\EventController:getAllActiveEvent');