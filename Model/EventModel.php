<?php

namespace Model;

use Classes\Enums\ActiveEnum;
use Classes\Exceptions\InvalidDateException;
use Classes\MyDateTime;

use Entity\EventEntity;
use Entity\UserEntity;

use Model\AbstractModel;

class EventModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, EventEntity::class);
    }

    public function getAllActiveEvent($filter) {
        $date = (new \DateTime())->format('Y-m-d');

        $query = $this->getRepository()                        
            ->createQueryBuilder("e")
            ->select("e.id, e.name, DATE_FORMAT(e.date, '%Y-%m-%d') as date, e.time, e.place")
            ->andWhere('e.date >= :date')
            ->setParameter('date', $date)   
            ->andWhere("e.active = :active")
            ->setParameter('active', ActiveEnum::YES);

        if(count($filter) > 0) {
            foreach($filter as $value) {
                if($value['field'] === 'date') {
                    $query = $query
                        ->andWhere("e." . $value['field'] . ' = :' . $value['field'])
                        ->setParameter($value['field'], MyDateTime::data_db($value['value']));

                    continue;
                }

                $query = $query
                    ->andWhere("e." . $value['field'] . ' = :' . $value['field'])
                    ->setParameter($value['field'], $value['value']);
            }
        }

        $query = $query
            ->getQuery();            

        return $query->getResult(); 
    }

    public function getEventsByEmailUser($email) {        
        return $this->getRepository()    
            ->createQueryBuilder("e")                    
            ->select("e.id, e.name, e.description, DATE_FORMAT(e.date, '%Y-%m-%d') as date, e.time, e.place")
            ->Join(UserEntity::class, 'u', 'WITH', 'u.id = e.idUser and u.email = :email')            
            ->setParameter('email', $email)  
            ->andWhere("e.active = :active")
            ->setParameter('active', ActiveEnum::YES)          
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

    public function placeList() {
        return $this->getRepository()    
            ->createQueryBuilder("e")                    
            ->select("e.place")                        
            ->andWhere("e.active = :active")
            ->setParameter('active', ActiveEnum::YES)          
            ->groupBy('e.place')
            ->getQuery()
            ->getResult();
    }
}