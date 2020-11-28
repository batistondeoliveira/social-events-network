<?php

namespace Classes\Enums;

use Classes\Exceptions\InvalidTypeException;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\ORM\Mapping as ORM;

class StatusEventEnum extends Type {
    const __default = self::WAIT;

    const ENUM_STATUS_EVENT = "enumStatusEvent";
    const WAIT = 'Wait';
    const CONFIRMED = 'Confirmed';
    const REJECTED = 'Rejected';

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform) {
        return "ENUM('Wait', 'Confirmed', 'Rejected')";
    }

    public function convertToPHPValue($value, AbstractPlatform $platform) {
        return $value;
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform) {
        if (!in_array($value, array(self::WAIT, self::CONFIRMED, self::REJECTED))) {
            throw new \InvalidArgumentException("Valor do campo [Status do Evento] está inválido");
        }

        return $value;
    }

    public function getName() {
        return self::ENUM_STATUS_EVENT;
    }

    public function requiresSQLCommentHint(AbstractPlatform $platform) {
        return true;
    }

    public static function isValid($value) {                        
        $class = new \ReflectionClass('Classes\Enums\StatusEventEnum');

        $constants = $class->getConstants();
        $constantName = '';        
        
        foreach ($constants as $constant) {
            if(strtoupper($constant) === strtoupper($value)) {
                $constantName = $value;
                break;
            }
        }

        if(empty($constantName))
            throw new InvalidTypeException('Conteúdo do campo Status do Evento é inválido: ' . $value);      
            
        return $value;
    } 
}
