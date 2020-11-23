<?php

namespace Classes;

class MyDateTime {    
    public static function convertStrToDate($date) {                    
        if(strstr($date, '/')) 
            $date = \DateTime::createFromFormat('d/m/Y', $date)->format('Y-m-d');         

        return new \DateTime($date);         
    }
}