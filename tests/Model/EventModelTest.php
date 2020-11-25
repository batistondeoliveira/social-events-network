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
    private function createUser($user) {                       
        $userModel = new UserModel($this->getEm());

        $userEntity = $userModel->getByEmail($user);
        
        if(!empty($userEntity))
            return $userEntity;

        $userEntity = new UserEntity();

        $userEntity->setName('Eliel');
        $userEntity->setEmail($user);
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

    public function createEvent($date, $user = 'fulano@yahoo.com.br') {
        $userEntity = $this->createUser($user);

        $eventEntity = new EventEntity();

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
        $migrationUser = new UserMigration($this->getEm());
        $migrationUser->up(); 

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
        $migrationUser = new UserMigration($this->getEm());
        $migrationUser->up(); 

        $migration = new EventMigration($this->getEm());
        $migration->up();        
        
        $this->createEvent((new \DateTime())->format('d/m/Y'));

        $modelEvent = new EventModel($this->getEm());

        $this->assertEquals(1, count($modelEvent->getAllActiveEvent(null)));
    }

    public function testGetById() { 
        $migrationUser = new UserMigration($this->getEm());
        $migrationUser->up(); 

        $migration = new EventMigration($this->getEm());
        $migration->up();        
        
        $this->createEvent((new \DateTime())->format('d/m/Y'));

        $modelEvent = new EventModel($this->getEm());

        $this->assertNotEmpty($modelEvent->getById(1));
    }

    public function testGetEventsByEmailUser() {
        $migrationUser = new UserMigration($this->getEm());
        $migrationUser->up(); 
         
        $migration = new EventMigration($this->getEm());
        $migration->up();        
        
        $this->createEvent((new \DateTime())->format('d/m/Y'));
        $this->createEvent((new \DateTime())->format('d/m/Y'), 'beltrano@yahoo.com.br');

        $modelEvent = new EventModel($this->getEm());                

        $this->assertEquals(1, count($modelEvent->getEventsByEmailUser('fulano@yahoo.com.br')));
    }

    public function testPlaceList() {
        $migrationUser = new UserMigration($this->getEm());
        $migrationUser->up(); 
         
        $migration = new EventMigration($this->getEm());
        $migration->up();        
        
        $this->createEvent((new \DateTime())->format('d/m/Y'));
        $this->createEvent((new \DateTime())->format('d/m/Y'), 'beltrano@yahoo.com.br');

        $modelEvent = new EventModel($this->getEm());                
        
        $list = $modelEvent->placeList('Shopping');

        $this->assertEquals(1, count($list));
    }
}