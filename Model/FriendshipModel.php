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
            SELECT u.id,
                   u.name, 
                   u.email,
                   'Owner' as type,
                   0 as checked
            FROM `user` u, 
                 friendship fr
            WHERE fr.id_user_friendship = u.id 
               AND fr.id_user = :idUser

            UNION 

            SELECT fr.id_user as id,
                   u.name, 
                   u.email,
                   'Friendship' as type,
                   0 as checked
            FROM `user` u, 
                 friendship fr
            WHERE u.id = fr.id_user
               AND fr.id_user_friendship = :idUser

            ORDER BY name
        ", array(
            'idUser' => $idUser
        ));
    }

    public function inviteEventList($idUser, $idEvent) {
        return $this->openSql("
            SELECT u.id,
                   u.name, 
                   u.email,
                   'Owner' as type,
                   0 as checked
            FROM `user` u, 
                 friendship fr
            WHERE fr.id_user_friendship = u.id 
               AND fr.id_user = :idUser
               AND fr.id_user_friendship NOT IN (
                    SELECT id_user_friendship 
                    FROM invite_event 
                    WHERE id_user = :idUser 
                       AND id_event = :idEvent
               )                
               AND fr.id_user_friendship NOT IN (
                    SELECT ev.id_user
                    FROM `event` ev
                    WHERE ev.id = :idEvent
               ) 

            UNION 

            SELECT fr.id_user as id,
                   u.name, 
                   u.email,
                   'Friendship' as type,
                   0 as checked
            FROM `user` u, 
                 friendship fr
            WHERE u.id = fr.id_user
               AND fr.id_user_friendship = :idUser
               AND fr.id_user NOT IN (
                    SELECT ie.id_user_friendship 
                    FROM invite_event ie
                    WHERE ie.id_user_friendship = fr.id_user
                       AND ie.id_event = :idEvent
               ) 

            ORDER BY name
        ", array(
            'idUser' => $idUser,
            'idEvent' => $idEvent
        ));
    }

    public function getByIdFriendship($idUser, $idUserFriendship) {
        return $this->getRepository()            
            ->findOneBy([   
                'idUser' => $idUser, 
                'idUserFriendship' => $idUserFriendship
            ]);
    }
}