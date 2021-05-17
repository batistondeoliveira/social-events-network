<?php

namespace Classes;

use Classes\Exceptions\ValidateEntityException;
use Classes\RegisterErrorMessage;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class ErrorMessage {
    public static function get($message, RegisterErrorMessage $customMessage = null) {
        return ($message instanceof \Exception) 
            ? self::ex($message, $customMessage) 
            : '';
    }

    private static function ex($message, RegisterErrorMessage $customMessage = null) {
        if(!empty($customMessage)) {
            foreach ($customMessage->get() as $item) {
                if($message instanceof $item->ex) {                    
                    if($message  instanceof UniqueConstraintViolationException) {
                        $erro = $item->message;                    

                        return $item->message;
                    }

                    if($message  instanceof ValidateEntityException) {
                        $error = $message->getError()[0];

                        $key = key($error);

                        return $error[$key];
                    } 
                    
                    $erro = $message->getError();                                                                                    
                    $field = key($erro[0]);

                    return vsprintf($item->message, $field);
                }
            }
        }

        if($message  instanceof ValidateEntityException) {
            return $message->getError();
        }        

        if($message  instanceof \Exception) {
            return '';
        }
    }
}