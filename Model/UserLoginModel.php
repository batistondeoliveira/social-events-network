<?php

namespace Model;

use Entity\UserLoginEntity;

use Model\AbstractModel;

class UserLoginModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, UserLoginEntity::class);
    }    

    public function getByCredentials($idUser, $token) { 
        $date = (new \DateTime())->format('Y-m-d H:i:s');

        return $this->getRepository()                        
            ->createQueryBuilder("u")            
            ->andWhere('u.idUser = :idUser')
            ->setParameter('idUser', $idUser)
            ->andWhere('u.token = :token')
            ->setParameter('token', $token)
            ->andWhere('u.expirar >= :date')
            ->setParameter('date', $date)            
            ->getQuery()
            ->getResult();       
    }
}