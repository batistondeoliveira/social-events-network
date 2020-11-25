<?php

namespace Classes\Enums;

use Classes\Exceptions\InvalidTypeException;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\ORM\Mapping as ORM;

class ActiveEnum extends Type {
    const __default = self::NO;

    const ENUM_ACTIVE = "enumActive";
    const NO = 'No';
    const YES = 'Yes';

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform) {
        return "ENUM('No', 'Yes')";
    }

    public function convertToPHPValue($value, AbstractPlatform $platform) {
        return $value;
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform) {
        if (!in_array($value, array(self::NAO, self::SIM))) {
            throw new \InvalidArgumentException("Valor do campo [Ativo] está inválido");
        }

        return $value;
    }

    public function getName() {
        return self::ENUM_ACTIVE;
    }

    public function requiresSQLCommentHint(AbstractPlatform $platform) {
        return true;
    }

    public static function isValid($value) {                        
        $class = new \ReflectionClass('Classes\Enums\ActiveEnum');

        $constants = $class->getConstants();
        $constantName = '';
        
        foreach ($constants as $constant) {
            if($constant === $value) {
                $constantName = $value;
                break;
            }
        }

        if(empty($constantName))
            throw new InvalidTypeException('Conteúdo do campo Ativo é inválido: ' . $value);      
            
        return $value;
    } 
}
