<?php

namespace tests\Model;

use Entity\UserEntity;

use Model\UserModel;

use tests\Model\AbstractTestCase;
use tests\Migration\UserMigration;

class UserModelTest extends AbstractTestCase {
    public function setUp() { 
        parent::setUp();        

        $migration = new UserMigration($this->getEm());
        $migration->up();        
    }

    public function testSave() {                
        $userEntity = new UserEntity();

        $userEntity->setName('Eliel');
        $userEntity->setEmail('batistondeoliveira@yahoo.com.br');
        $userEntity->setPassword('123456');
        $userEntity->setBio('Programador PHP');
        $userEntity->setCity('Pocos de Caldas');
        $userEntity->setState('MG');

        $userModel = new UserModel($this->getEm());
        
        try {
            $userModel->save($userEntity);

            $this->assertTrue(true);
        } catch(\Exception $ex) {
            $this->assertTrue(false);
        }            
    }
}