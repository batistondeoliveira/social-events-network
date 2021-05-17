<?php

namespace Classes\Enums;

use Classes\Exceptions\InvalidTypeException;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\ORM\Mapping as ORM;

use Model\FriendshipModel;

class FriendshipTypeEnum {    
    public static function OWNER($em, $idUser, $idUserFriendship) {
        $friendShipModel = new FriendshipModel($em);              
                
        $userFriendship = $friendShipModel->getByIdFriendship(
            $idUser, 
            $idUserFriendship
        );

        if(empty($userFriendship))
            return false;

        $friendShipModel->remove($userFriendship);

        return true;
    }   
    
    public static function FRIENDSHIP($em, $idUser, $idUserFriendship) {
        $friendShipModel = new FriendshipModel($em);              
                
        $userFriendship = $friendShipModel->getByIdFriendship(            
            $idUserFriendship,
            $idUser
        );

        if(empty($userFriendship))
            return false;

        $friendShipModel->remove($userFriendship);

        return true;
    }

    public static function get($value) {                        
        if(empty($value))
            return FriendshipTypeEnum::OWNER;        

        $value = strtoupper($value);

        $class = new \ReflectionClass('Classes\Enums\FriendshipTypeEnum');

        $methods = $class->getMethods();
        $methodName = '';
        
        foreach ($methods as $method) {
            if($method->name === $value) {
                $methodName = $value;
                break;
            }
        }

        if(empty($methodName))
            throw new InvalidTypeException('Conteúdo do campo Tipo de Amizade é inválido: ' . $value);      

        return $class->getMethod(strtoupper($methodName)); 
    } 
}
