<?php

namespace Model;

use Classes\Exceptions\InvalidDateException;
use Classes\MyDateTime;

use Entity\EventEntity;
use Entity\UserEntity;

use Model\AbstractModel;

class EventModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, EventEntity::class);
    }

    public function getAllActiveEvent() {
        $date = (new \DateTime())->format('Y-m-d');

        return $this->getRepository()                        
            ->createQueryBuilder("e")
            ->select("e.id, e.name, DATE_FORMAT(e.date, '%Y-%m-%d') as date, e.time, e.place")
            ->andWhere('e.date >= :date')
            ->setParameter('date', $date)            
            ->getQuery()
            ->getResult(); 
    }

    public function getEventsByEmailUser($email) {        
        return $this->getRepository()    
            ->createQueryBuilder("e")                    
            ->select("e.id, e.name, e.description, DATE_FORMAT(e.date, '%Y-%m-%d') as date, e.time, e.place")
            ->Join(UserEntity::class, 'u', 'WITH', 'u.id = e.idUser and u.email = :email')            
            ->setParameter('email', $email)            
            ->getQuery()
            ->getResult(); 
    }

    public function save($eventEntity) {
        $date1 = MyDateTime::dateToTimeStamp($eventEntity->getDate());           
        $date2 = MyDateTime::dateToTimeStamp(new \DateTime());
            
        if($date1 < $date2)
            throw new InvalidDateException('A data do evento não pode ser menor que a data atual');

        parent::save($eventEntity);
    }
}