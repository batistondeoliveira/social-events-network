<?php

namespace tests\Model;

use Entity\EventEntity;
use Entity\UserEntity;

use Model\EventModel;
use Model\UserModel;

use tests\Model\AbstractTestCase;
use tests\Migration\EventMigration;
use tests\Migration\UserMigration;

class EventModelTest extends AbstractTestCase {
    private function createUser() {
        $migration = new UserMigration($this->getEm());
        $migration->up();        
        
        $userModel = new UserModel($this->getEm());

        $userEntity = $userModel->getByEmail('fulano@yahoo.com.br');
        
        if(!empty($userEntity))
            return $userEntity;

        $userEntity = new UserEntity();

        $userEntity->setName('Eliel');
        $userEntity->setEmail('fulano@yahoo.com.br');
        $userEntity->setPassword('123456');
        $userEntity->setBio('Programador PHP');
        $userEntity->setCity('Pocos de Caldas');
        $userEntity->setState('MG');        
        
        try {
            $userModel->save($userEntity); 
            
            return $userEntity;
        } catch(\Exception $ex) {
            return ;
        } 
    }    

    public function testSave() {  
        $migration = new EventMigration($this->getEm());
        $migration->up();        

        $userEntity = $this->createUser();

        $eventEntity = new eventEntity();

        $eventEntity->setIdUser($userEntity->getId());
        $eventEntity->setName('Congresso');
        $eventEntity->setDescription('Description do congresso');
        $eventEntity->setDate('19/08/2021');
        $eventEntity->setTime('09:00');
        $eventEntity->setPlace('Shopping');        

        $eventModel = new EventModel($this->getEm());
        
        try {
            $eventModel->save($eventEntity);

            $this->assertTrue(true);
        } catch(\Exception $ex) {
            $this->assertTrue(false);
        }            
    }    
}