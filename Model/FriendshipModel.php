<?php

namespace Model;

use Entity\FriendshipEntity;

use Model\AbstractModel;

class FriendshipModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, FriendshipEntity::class);
    }    

    public function list($idUser) {
        return $this->openSql("
            SELECT u.name, 
                   u.email
            FROM `user` u, 
                 friendship fr
            WHERE fr.id_user_friendship = u.id 
               AND fr.id_user = :idUser

            UNION 

            SELECT u.name, 
                   u.email
            FROM `user` u, 
                 friendship fr
            WHERE u.id = fr.id_user
               AND fr.id_user_friendship = :idUser
        ", array(
            'idUser' => $idUser
        ));
    }
}