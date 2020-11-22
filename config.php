<?php
$config = [
	'local' => _LOCAL_,
	'db' => [
		'driver' => 'pdo_mysql',
		'host' => 'localhost:3306',
		'dbname' => 'social_event_network',
		'user' => 'coderock',
		'password' => 'coderock',
		'charset'  => 'utf8',
        'driverOptions' => array(
            1002 => 'SET NAMES utf8'
        )
    ],
    'tests' => [
		'driver' => 'pdo_mysql',
		'host' => 'localhost:3306',
		'dbname' => 'social_event_network_tests',
		'user' => 'coderock',
		'password' => 'coderock',
		'charset'  => 'utf8',
        'driverOptions' => array(
            1002 => 'SET NAMES utf8'
        )
    ],
	'settings' => [
        'displayErrorDetails' => true
  ],
];

if(!_LOCAL_) {
    $config['db'] = [
        'driver' => 'pdo_mysql',
        'host' => '',
        'dbname' => '',
        'user' => '',
        'password' => '',
        'charset'  => 'utf8',
        'driverOptions' => array(
            1002 => 'SET NAMES utf8'
        )
    ];
}