<?php

$app->post('/user', 'Controller\UserController:save');
$app->post('/user/login', 'Controller\UserController:login');