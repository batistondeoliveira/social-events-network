<?php

namespace Classes;

class MyDateTime {    
    const DateFormat = 'd/m/Y';    

    public static function dateToTimeStamp($dateTime) {
        $date1 = $dateTime->format('Y-m-d');
        
        return strtotime($date1);        
    }
}