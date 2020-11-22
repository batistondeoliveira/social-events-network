<?php

namespace Classes;

use Classes\ValidateMessage;

use Symfony\Component\Validator\Validation;

class Validate {
    private $error = [];
    private $campos = [];

    public function __construct($model, $fields = []) {
        $validar = Validation::createValidatorBuilder()
            ->enableAnnotationMapping()
            ->getValidator();

        $this->fields = $fields;
        $this->error = $validar->validate($model);
    }

    public function validate() {
        return (count($this->error) > 0) ? false : true;
    }

    public function getError() {
        $msgError = [];

        foreach ($this->error as $error) {
            $classRegra = $error->getConstraint();

            $campo = isset($this->fields[$error->getPropertyPath()]) ?
                $this->fields[$error->getPropertyPath()] : $error->getPropertyPath();

            $msgError[] = [$campo => ValidateMessage::getMessage($classRegra)];
        }

        return $msgError;
    }
}