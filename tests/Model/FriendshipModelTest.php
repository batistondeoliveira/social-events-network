<?php

namespace tests\Model;

use Entity\FriendshipEntity;
use Entity\UserEntity;

use Model\FriendshipModel;
use Model\UserModel;

use tests\Model\AbstractTestCase;
use tests\Migration\FriendshipMigration;
use tests\Migration\UserMigration;

class FriendshipModelTest extends AbstractTestCase {
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

    private function createFriendship(&$user1, &$user2) {
        $migrationUser = new UserMigration($this->getEm());
        $migrationUser->up(); 

        $migration = new FriendshipMigration($this->getEm());
        $migration->up();        

        $user1 = $this->createUser('fulano@yahoo.com.br');
        $user2 = $this->createUser('beltrano@yahoo.com.br');            

        $friendshipEntity = new FriendshipEntity();
        
        $friendshipEntity->setIdUser($user1->getId());
        $friendshipEntity->setIdUserFriendship($user2->getId());            

        $friendshipModel = new FriendshipModel($this->getEm());

        $friendshipModel->save($friendshipEntity);        
    }

    public function testSave() {                     
        try {
            $this->createFriendship($user1, $user2);    

            $this->assertTrue(true);
        } catch(\Exception $ex) {
            $this->assertTrue(false);
        }            
    }  
    
    public function testList() { 
        $this->createFriendship($user1, $user2); 
        
        $model = new FriendshipModel($this->getEm());

        $this->assertEquals(1, count($model->list($user1->getId())));
    } 

    public function testGetByIdFriendship() {
        $this->createFriendship($user1, $user2);

        $model = new FriendshipModel($this->getEm());
        
        $friendship = $model->getByIdFriendship($user1->getId(), $user2->getId());

        $this->assertNotEmpty($friendship);
    }
}