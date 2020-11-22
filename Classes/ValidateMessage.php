<?php

namespace Classes;

use Symfony\Component\Validator\Constraint;

class ValidateMessage {
    private static $rules;

    public static function getMessage(Constraint $rules) {
        self::$rules = $rules;
        $rulesParser = explode('\\', get_class($rules));
        $rules = lcfirst(end($rulesParser));

        return self::$rules();
    }

    private static function email() {
        return 'E-mail inválido!';
    }
    
    private static function notBlank() {
        return 'Campo obrigatório!';
    }

    private static function length() {
        if(self::$rules->min > 0 &&  self::$rules->max > 0) {
            return vsprintf('Deve conter de %s a %s caractéres!', [self::$rules->min , self::$rules->max]);
        }

        if(self::$rules->min > 0) {
            return vsprintf('Deve conter no minimo %s caractéres!', [self::$rules->min]);
        }

        return vsprintf('Deve conter no maxímo %s caractéres!' , [self::$rules->max]);
    }
}