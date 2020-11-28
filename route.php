<?php

//User
$app->post('/user', 'Controller\UserController:save');
$app->post('/user/login', 'Controller\UserController:login');
$app->post('/logout', 'Controller\UserController:logout');

//Event
$app->post('/event', 'Controller\EventController:save');
$app->get('/event/detail/{id}', 'Controller\EventController:getById');
$app->post('/event/list', 'Controller\EventController:getAllActiveEvent');
$app->get('/event/{id}', 'Controller\EventController:cancelar');
$app->get('/event/place/list', 'Controller\EventController:placeList');
$app->post('/event/mylist', 'Controller\EventController:eventList');

//Friendship
$app->get('/friendship', 'Controller\FriendshipController:list');
$app->post('/friendship/undo', 'Controller\FriendshipController:undoFriendship');
$app->get('/friendship/event/invite/{idEvento}', 'Controller\FriendshipController:inviteEventList');

//Invite
$app->get('/invite/friendship/{email}', 'Controller\InviteFriendshipController:invite');
$app->post('/invite/event', 'Controller\InviteEventController:invite');