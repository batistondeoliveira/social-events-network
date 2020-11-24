<?php

namespace Model;

use Entity\EventEntity;

use Model\AbstractModel;

class EventModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, EventEntity::class);
    }

    public function getAllActiveEvent() {
        $date = (new \DateTime())->format('Y-m-d');

        return $this->getRepository()                        
            ->createQueryBuilder("e")
            ->select('e.id, e.name, DATE(e.date) as date, e.time, e.place')
            ->andWhere('e.date >= :date')
            ->setParameter('date', $date)            
            ->getQuery()
            ->getResult(); 
    }

    public function getEventsByUser($idUser) {        
        return $this->getRepository()                        
            ->createQueryBuilder("e")
            ->select('e')
            ->Join(UserEntity::class, 'u', 'WITH', 'u.id = u.idUser')
            ->andWhere('e.idUser = :idUser')
            ->setParameter('idUser', $idUser)            
            ->getQuery()
            ->getResult(); 
    }
}