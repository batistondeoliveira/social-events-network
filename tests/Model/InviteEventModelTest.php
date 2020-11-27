<?php

namespace tests\Model;

use Entity\InviteEventEntity;
use Entity\UserEntity;
use Entity\EventEntity;

use Model\InviteEventModel;
use Model\UserModel;
use Model\EventModel;

use tests\Model\AbstractTestCase;
use tests\Migration\InviteEventMigration;
use tests\Migration\UserMigration;

class InviteEventModelTest extends AbstractTestCase {
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

        return $eventEntity;
    }

    public function testSave() { 
        $migrationUser = new UserMigration($this->getEm());
        $migrationUser->up(); 

        $migration = new InviteEventMigration($this->getEm());
        $migration->up();        
            
        try {
            $user1 = $this->createUser('fulano@yahoo.com.br');
            $user2 = $this->createUser('beltrano@yahoo.com.br');            

            $event = $this->createEvent((new \DateTime())->format('d/m/Y'));

            $inviteEntity = new InviteEventEntity();
            
            $inviteEntity->setIdUser($user1->getId());
            $inviteEntity->setIdUserFriendship($user2->getId()); 
            $inviteEntity->setIdEvent($event->getId());           

            $inviteModel = new InviteEventModel($this->getEm());

            $inviteModel->save($inviteEntity);

            $this->assertTrue(true);
        } catch(\Exception $ex) {
            $this->assertTrue(false);
        }            
    }    
}