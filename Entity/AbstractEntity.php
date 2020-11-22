<?php

namespace Entity;

use Doctrine\ORM\Mapping as ORM;

use JMS\Serializer\Annotation as Serializer;

use Symfony\Component\Validator\Constraints as Assert;

/** 
 * @ORM\MappedSuperclass 
 */
abstract class AbstractEntity {
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
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
}