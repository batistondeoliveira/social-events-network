<?php

namespace Classes\Enums;

use Classes\Exceptions\InvalidTypeException;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\ORM\Mapping as ORM;

class InviteTypeEnum extends Type {
    const __default = self::FRIENDSHIP;

    const ENUM_INVITE = "enumInvite";
    const FRIENDSHIP = 'Friendship';
    const EVENT = 'Event';

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform) {
        return "ENUM('Friendship', 'Event')";
    }

    public function convertToPHPValue($value, AbstractPlatform $platform) {
        return $value;
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform) {
        if (!in_array($value, array(self::Friendship, self::Event))) {
            throw new \InvalidArgumentException("Valor do campo [Tipo de Convite] está inválido");
        }

        return $value;
    }

    public function getName() {
        return self::ENUM_INVITE;
    }

    public function requiresSQLCommentHint(AbstractPlatform $platform) {
        return true;
    }

    public static function isValid($value) {                        
        $class = new \ReflectionClass('Classes\Enums\InviteTypeEnum');

        $constants = $class->getConstants();
        $constantName = '';
        
        foreach ($constants as $constant) {
            if($constant === $value) {
                $constantName = $value;
                break;
            }
        }

        if(empty($constantName))
            throw new InvalidTypeException('Conteúdo do campo Tipo de Convite é inválido: ' . $value);      
            
        return $value;
    } 
}
