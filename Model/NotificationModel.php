<?php

namespace Model;

use Entity\InviteEventEntity;
use Entity\InviteFriendshipEntity;

use Model\AbstractModel;

class NotificationModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, null);
    }        

    public function notification($idUser) {        
        return $this->openSql("
            SELECT invfr.id,       
                   invfr.id_user,
                   u.name,
                   'Friendship' AS `type`,
                   NULL AS id_event,
                   NULL AS `event`
            FROM invite_friendship invfr,
                 `user` u
            WHERE u.id = invfr.id_user 
                AND invfr.id_user_friendship = :idUser
            
            UNION
            
            SELECT ie.id,       
                   ie.id_user,
                   u.name,
                   'Event' AS `type`,
                   e.id AS id_event,
                   e.name AS `event`
            FROM invite_event ie,
                 `user` u,
                 `event` e
            WHERE u.id = ie.id_user 
                AND e.id = ie.id_event
                AND ie.id_user_friendship = :idUser
        ", array(
            'idUser' => $idUser
        ));
    }
}