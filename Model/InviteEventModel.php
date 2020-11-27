<?php

namespace Model;

use Entity\InviteEventEntity;

use Model\AbstractModel;

class InviteEventModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, InviteEventEntity::class);
    }    

    public function alreadySentInvite($idEvent, $idUser, $idUserFriendship) {
        return $this->getRepository()            
            ->findOneBy([                
                'idEvent' => $idEvent,
                'idUser' => $idUser,
                'idUserFriendship' => $idUserFriendship                
            ]);
    }
}