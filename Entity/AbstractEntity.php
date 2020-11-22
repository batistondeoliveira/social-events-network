<?php

namespace Entity;

use Classes\Exceptions\ValidateEntityException;

use Entity\ValidateEntity;

use Doctrine\ORM\Mapping\MappedSuperclass;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\GeneratedValue;

use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\Annotation as Serializer;

use Symfony\Component\Validator\Constraints as Assert;

/** 
 * @MappedSuperclass 
 */
abstract class AbstractEntity extends ValidateEntity {
    /**
     * @Id()
     * @GeneratedValue()
     * @Column(type="integer")
     * @Serializer\Type("integer")
     */
    private $id;                   

    public function __construct($class) {
        parent::__construct($class);
    }

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }    
    
    public function serialize() {
        $serializer = SerializerBuilder::create()->build(); 
        
        return $serializer->toArray($this); 
    }

    public function deserialize($jsonArray) { 
        $objAux = $this;

        $serializer = SerializerBuilder::create()->build();                     

        $obj = $serializer->deserialize(
            json_encode($jsonArray, 0), 
            get_class($this->getClass()), 
            'json'
        );                

        $obj->setErrorMessage($objAux->getErrorMessage());
        $obj->setClass($objAux->getClass());

        return $obj;
    }

    public function initializeErrorMessage() {           
        $this->addErrorMessage(ValidateEntityException::class, 'Campo %s obrigatório!');        
    }
}