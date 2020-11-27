<?php

namespace Classes\Enums;

use Classes\Exceptions\InvalidTypeException;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\ORM\Mapping as ORM;

class StatusEventEnum extends Type {
    const __default = self::NO;

    const ENUM_STATUS_EVENTO = "enumStatusEvent";
    const AGUARDANDO_CONFIRMACAO = 'Aguardando Confirmacao';
    const CONFIRMADO = 'Confirmado';
    const REJEITADO = 'Rejeitado';

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform) {
        return "ENUM('Aguardando Confirmacao', 'Confirmado', 'Rejeitado')";
    }

    public function convertToPHPValue($value, AbstractPlatform $platform) {
        return $value;
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform) {
        if (!in_array($value, array(self::AGUARDANDO_CONFIRMACAO, self::CONFIRMADO, self::REJEITADO))) {
            throw new \InvalidArgumentException("Valor do campo [Status do Evento] está inválido");
        }

        return $value;
    }

    public function getName() {
        return self::ENUM_STATUS_EVENTO;
    }

    public function requiresSQLCommentHint(AbstractPlatform $platform) {
        return true;
    }

    public static function isValid($value) {                        
        $class = new \ReflectionClass('Classes\Enums\StatusEventEnum');

        $constants = $class->getConstants();
        $constantName = '';

        $value = strtoupper(str_replace(' ', '_', $value));
        
        foreach ($constants as $constant) {
            if($constant === $value) {
                $constantName = $value;
                break;
            }
        }

        if(empty($constantName))
            throw new InvalidTypeException('Conteúdo do campo Status do Evento é inválido: ' . $value);      
            
        return $value;
    } 
}
