<?php

namespace tests\Model;

use Classes\Enums\InviteTypeEnum;

use Entity\InviteEntity;
use Entity\UserEntity;

use Model\InviteModel;
use Model\UserModel;

use tests\Model\AbstractTestCase;
use tests\Migration\InviteMigration;
use tests\Migration\UserMigration;

class InviteModelTest extends AbstractTestCase {
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

        $migration = new InviteMigration($this->getEm());
        $migration->up();        
            
        try {
            $user1 = $this->createUser('fulano@yahoo.com.br');
            $user2 = $this->createUser('beltrano@yahoo.com.br');            

            $inviteEntity = new InviteEntity();
            
            $inviteEntity->setIdUser($user1->getId());
            $inviteEntity->setIdUserFriendship($user2->getId());
            $inviteEntity->setType(InviteTypeEnum::FRIENDSHIP);

            $inviteModel = new InviteModel($this->getEm());

            $inviteModel->save($inviteEntity);

            $this->assertTrue(true);
        } catch(\Exception $ex) {
            $this->assertTrue(false);
        }            
    }    
}