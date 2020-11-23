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

    public function createEvent($date) {
        $userEntity = $this->createUser();

        $eventEntity = new eventEntity();

        $eventEntity->setIdUser($userEntity->getId());
        $eventEntity->setName('Congresso');
        $eventEntity->setDescription('Description do congresso');
        $eventEntity->setDate($date);
        $eventEntity->setTime('09:00');
        $eventEntity->setPlace('Shopping');        

        $eventModel = new EventModel($this->getEm());

        $eventModel->save($eventEntity);
    }

    public function testSave() {  
        $migration = new EventMigration($this->getEm());
        $migration->up();        
            
        try {
            $this->createEvent((new \DateTime())->format('d/m/Y'));

            $this->assertTrue(true);
        } catch(\Exception $ex) {
            $this->assertTrue(false);
        }            
    }    

    public function testGetAllActiveEvent() {  
        $migration = new EventMigration($this->getEm());
        $migration->up();        

        for($cont = 0; $cont < 2; $cont++)
            $this->createEvent(date('d/m/Y', strtotime(date('Y-m-d')."-". $cont . " month")));        

        $modelEvent = new EventModel($this->getEm());

        $this->assertEquals(1, count($modelEvent->getAllActiveEvent()));
    }
}