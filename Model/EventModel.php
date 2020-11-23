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
            ->andWhere('e.date < :date')
            ->setParameter('date', $date)            
            ->getQuery()
            ->getResult(); 
    }
}