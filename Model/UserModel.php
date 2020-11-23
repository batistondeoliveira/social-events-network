<?php

namespace Model;

use Entity\UserEntity;
use Entity\UserLoginEntity;

use Model\AbstractModel;
use Model\UserLoginModel;

class UserModel extends AbstractModel {
    public function __construct($em) {
        parent::__construct($em, UserEntity::class);
    }

    private function getToken($key, $idUser) {
        $token = array(
            "session" => password_hash($idUser . 'f*u87', PASSWORD_BCRYPT),
            "id" => $idUser,
            "iat" => time(),
            "exp" => time() + (60 * 60)
        );

        return \Firebase\JWT\JWT::encode($token, $key);        
    }

    public function getByEmail($email) {        
        return $this->getRepository()            
            ->findOneBy([                
                'email' => $email
            ]);        
    }

    public function login($key, $email, $password) {
        $userEntity = $this->getByEmail($email);

        if(empty($userEntity))
            return ;

        if(!password_verify($password, $userEntity->getPassword())) 
            return ; 

        $userLoginEntity = new UserLoginEntity();
        
        $userLoginEntity->setToken($this->getToken($key, $userEntity->getId()));
        $userLoginEntity->setIdUser($userEntity->getId());

        $userLoginModel = new UserLoginModel($this->getEm());

        $userLoginModel->save($userLoginEntity);        

        return $userLoginEntity->getToken();                
    }        
}