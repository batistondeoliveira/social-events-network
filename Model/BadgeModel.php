<?php

namespace Model;

use Classes\Enums\StatusEventEnum;

use Entity\InviteEventEntity;
use Entity\InviteFriendshipEntity;

use Model\AbstractModel;

class BadgeModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, null);
    }        

    public function badge($idUser) {        
        $query = $this->getEm()
            ->getRepository(InviteEventEntity::class)
            ->findBy([
                'idUserFriendship' => $idUser,
                'status' => StatusEventEnum::WAIT
            ]);

        $total = count($query);

        $query = $this->getEm()
            ->getRepository(InviteFriendshipEntity::class)
            ->findBy([
                'idUserFriendship' => $idUser
            ]);

        $total += count($query);

        return $total;
    }
}