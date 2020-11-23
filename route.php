<?php

//User
$app->post('/user', 'Controller\UserController:save');
$app->post('/user/login', 'Controller\UserController:login');

//Event
$app->post('/event', 'Controller\EventController:save');
$app->get('/event/getAll', 'Controller\EventController:getAll');