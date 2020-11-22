<?php

namespace Exceptions;

use Throwable;

class ValidateEntityException extends \Exception {
    private $error;

    public function setError($error) {
        $this->error = $error;
    }

    public function getError() {
        return $this->error;
    }
}