<?php

namespace Classes\Exceptions;

use Throwable;

class InvalidTypeException extends \Exception {
    private $error;

    public function setError($error) {
        $this->error = $error;
    }

    public function getError() {
        return $this->error;
    }
}