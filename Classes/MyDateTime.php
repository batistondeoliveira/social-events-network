<?php

namespace Classes;

class MyDateTime {    
    const DateFormat = 'd/m/Y';    

    public static function dateToTimeStamp($dateTime) {
        $date1 = $dateTime->format('Y-m-d');
        
        return strtotime($date1);        
    }

    public static function data_db($data){
        $data = str_replace('_', '0', $data);
        $regex = (strstr(':',$data)) ? '/^([0-9]{2})\/{1}([0-9]{2})\/{1}([0-9]{4})$/' : '/^([0-9]{2})\/{1}([0-9]{2})\/{1}([0-9]{4})(.*?)$/';
        $replace = (strstr(':',$data)) ? '$3-$2-$1' : '$3-$2-$1$4';
        return preg_replace($regex,$replace,$data);
	}
}