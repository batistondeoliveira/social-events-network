<?php

namespace Model;

use Entity\UserLoginEntity;

use Model\AbstractModel;

class UserLoginModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, UserLoginEntity::class);
    }    
}