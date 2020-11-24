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
}