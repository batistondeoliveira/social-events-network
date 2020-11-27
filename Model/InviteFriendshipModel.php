<?php

namespace Model;

use Entity\InviteFriendshipEntity;

use Model\AbstractModel;

class InviteFriendshipModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, InviteFriendshipEntity::class);
    }        
}