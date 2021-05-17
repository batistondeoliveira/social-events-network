<?php

namespace Classes;

class RegisterErrorMessage {
    private $msg;        

    public function add($classeException, $message) {
        $record = new \StdClass;
        $record->ex = $classeException;
        $record->message = $message;

        $this->msg[] = $record;
        return $this;
    }

    public function get() {
        return $this->msg;
    }
}