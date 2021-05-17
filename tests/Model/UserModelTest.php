<?php

namespace tests\Model;

use Entity\UserEntity;

use Model\UserModel;

use tests\Model\AbstractTestCase;
use tests\Migration\UserMigration;

class UserModelTest extends AbstractTestCase {    
    public function prepareUser() {
        $migration = new UserMigration($this->getEm());
        $migration->up(); 

        $userEntity = new UserEntity();

        $userEntity->setName('Eliel');
        $userEntity->setEmail('batistondeoliveira@yahoo.com.br');
        $userEntity->setPassword('123456');
        $userEntity->setBio('Programador PHP');
        $userEntity->setCity('Pocos de Caldas');
        $userEntity->setState('MG');

        $userModel = new UserModel($this->getEm());  
        
        $userModel->save($userEntity);
    }

    public function testSave() {               
        try {
            $this->prepareUser();

            $this->assertTrue(true);
        } catch(\Exception $ex) {
            $this->assertTrue(false);
        }             
    }

    public function testLogin() {                   
        $this->prepareUser();

        $userModel = new UserModel($this->getEm());
                
        $userModel->login(
            '87fdjfduity', 
            'batistondeoliveira@yahoo.com.br', 
            '123456',
            $token
        );

        $this->assertNotEmpty($token);        
    }

    public function testWrongCredentialsLogin() { 
        $this->prepareUser();
                       
        $userModel = new UserModel($this->getEm());
                
        $userModel->login(
            '87fdjfduity', 
            'batistondeoliveira1@yahoo.com.br', //wrong email
            '123457', //wrong password
            $token
        );

        $this->assertEmpty($token);         
    }
}