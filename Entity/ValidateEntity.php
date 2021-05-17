<?php

namespace Entity;

use Classes\ErrorMessage;
use Classes\RegisterErrorMessage;
use Classes\Validate;
use Classes\Exceptions\ValidateEntityException;

use Doctrine\ORM\Mapping as ORM;

use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\MappedSuperclass
 * @ORM\HasLifecycleCallbacks
 */
abstract class ValidateEntity {     
    /**     
     * @Serializer\Exclude()
     */
    private $errorMessage;

    /**     
     * @Serializer\Exclude()
     */
    private $class;
    
    abstract public function initializeErrorMessage();

    public function __construct($class) {
        $this->errorMessage = new RegisterErrorMessage();
        $this->class = $class;

        $this->initializeErrorMessage();
    }

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate()
     * @throws
     */
    public function validate() {
        $validate = new Validate($this);

        if(!$validate->validate()) {            
            $ex = new ValidateEntityException('');
            $ex->setError($validate->getError());
            throw $ex;
        }
    }

    /**
     * Get the value of mensagemErro
     */ 
    public function getErrorMessage() {
        return $this->errorMessage;
    }

    public function setErrorMessage($errorMessage) {
        $this->errorMessage = $errorMessage;

        return $this;
    }

    public function addErrorMessage($classeException, $message) {
        $this->errorMessage->add($classeException, $message);

        return $this;
    }

    public function getError($ex) {        
        return ErrorMessage::get($ex, $this->getErrorMessage());
    }

    public function setClass($class) {        
        $this->class = $class;
    }

    public function getClass() {        
        return $this->class;
    }    
}