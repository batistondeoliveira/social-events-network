<?php

namespace Model;

use Classes\Exceptions\InvalidDateException;
use Classes\MyDateTime;

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

    public function getEventByIdFriendship($idEvent, $idUserFriendship) {
        return $this->getRepository()            
            ->findOneBy([                
                'idEvent' => $idEvent,                
                'idUserFriendship' => $idUserFriendship                
            ]);
    }

    public function replyInvitation($eventEntity, $inviteEventEntity) {
        $date1 = MyDateTime::dateToTimeStamp($eventEntity->getDate());           
        $date2 = MyDateTime::dateToTimeStamp(new \DateTime());
            
        if($date1 < $date2)
            throw new InvalidDateException('Você já não pode mais confirmar esse evento');  

        $this->save($inviteEventEntity);
    }
}