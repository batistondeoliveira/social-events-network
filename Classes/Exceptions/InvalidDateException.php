<?php

namespace Classes\Exceptions;

use Throwable;

class InvalidDateException extends \Exception {
    private $error;

    public function setError($error) {
        $this->error = $error;
    }

    public function getError() {
        return $this->error;
    }
}