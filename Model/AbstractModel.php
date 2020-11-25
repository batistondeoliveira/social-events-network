<?php

namespace Model;

use Doctrine\ORM\EntityManager;

abstract class AbstractModel {
    /**
     * @var $em EntityManager
     */
    private $em;   
    
    private $class;    

	public function __construct($em, $class) {
        $this->em = $em;        
        $this->class = $class;        
    }    
    
    /**
     * Get entityManager
     *
     * @return  $em
     */ 
    public function getEm()
    {
        return $this->em;
    }        

    public function getRepository() {
        return $this->getEm()
            ->getRepository($this->class);
    }    

    public function save($entity) {        
        $this->getEm()->persist($entity);
        $this->getEm()->flush();
    }        

    public function remove($entity) {
        $this->getEm()->remove($entity);        
        $this->getEm()->flush();
    }    
    
    public function getAll() {
        return $this->getRepository()            
            ->findAll();
    }    

    public function getById($id) {
        return $this->getRepository()            
            ->findOneBy([                
                'id' => $id
            ]);
    }

    public function getConnection() {
        return $this->getEm()
            ->getConnection();
    }
    
    public function openSql($sql, $params = []) {
        $conn = $this->getConnection();  

        $stmt = $conn->prepare($sql);

        if(count($params) === 0)
            $stmt->execute();
        else
            $stmt->execute($params);        

        return $stmt->fetchAll();
    }
}