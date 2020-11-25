<?php

//User
$app->post('/user', 'Controller\UserController:save');
$app->post('/user/login', 'Controller\UserController:login');

//Event
$app->post('/event', 'Controller\EventController:save');
$app->get('/event', 'Controller\EventController:getEventsByEmailUser');
$app->get('/event/detail/{id}', 'Controller\EventController:getById');
$app->post('/event/list', 'Controller\EventController:getAllActiveEvent');
$app->get('/event/{id}', 'Controller\EventController:cancelar');
$app->get('/event/place/list', 'Controller\EventController:placeList');