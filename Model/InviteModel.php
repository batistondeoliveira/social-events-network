<?php

namespace Model;

use Entity\InviteEntity;

use Model\AbstractModel;

class InviteModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, InviteEntity::class);
    }    
}