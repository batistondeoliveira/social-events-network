<?php

namespace tests\Model;

use Entity\InviteFriendshipEntity;
use Entity\UserEntity;

use Model\InviteFriendshipModel;
use Model\UserModel;

use tests\Model\AbstractTestCase;
use tests\Migration\InviteFriendshipMigration;
use tests\Migration\UserMigration;

class InviteFriendshipModelTest extends AbstractTestCase {
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

    public function testSave() { 
        $migrationUser = new UserMigration($this->getEm());
        $migrationUser->up(); 

        $migration = new InviteFriendshipMigration($this->getEm());
        $migration->up();        
            
        try {
            $user1 = $this->createUser('fulano@yahoo.com.br');
            $user2 = $this->createUser('beltrano@yahoo.com.br');            

            $inviteEntity = new InviteFriendshipEntity();
            
            $inviteEntity->setIdUser($user1->getId());
            $inviteEntity->setIdUserFriendship($user2->getId());            

            $inviteModel = new InviteFriendshipModel($this->getEm());

            $inviteModel->save($inviteEntity);

            $this->assertTrue(true);
        } catch(\Exception $ex) {
            $this->assertTrue(false);
        }            
    }    
}