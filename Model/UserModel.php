<?php

namespace Model;

use Entity\UserEntity;

use Model\AbstractModel;

class UserModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, UserEntity::class);
    }
}