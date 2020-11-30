<?php

namespace Model;

use Entity\InviteFriendshipEntity;

use Model\AbstractModel;

class InviteFriendshipModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, InviteFriendshipEntity::class);
    }    
    
    public function getByIdFriendship($idUser, $idUserFriendship) {
        return $this->getRepository()            
            ->findOneBy([                     
                'idUser' => $idUser,
                'idUserFriendship' => $idUserFriendship,
            ]);
    }
}