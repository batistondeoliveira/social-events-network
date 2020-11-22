<?php

namespace Entity;

use Entity\AbstractEntity;

use Doctrine\ORM\Mapping as ORM;

use JMS\Serializer\Annotation as Serializer;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\Table(name= "event")
 */
class EventEntity extends AbstractEntity {
    /**
     * @ORM\Column(name="name", type="string", length=100)
     * @Assert\Length(max = 100)
     * @Assert\NotBlank()  
     * @Serializer\Type("string")   
     */
    private $name;
    
    /**
     * @ORM\Column(name="description", type="string")               
     * @Serializer\Type("string")   
     */
    private $description;
    
    /**
     * @ORM\Column(name="date", type="date")
     * @Assert\NotBlank()          
     * @Serializer\Type("date")   
     */
    private $date;
    
    /**
     * @ORM\Column(name="time", type="time")   
     * @Serializer\Type("time")     
     */
    private $time;
    
    /**
     * @ORM\Column(name="place", type="string", length=255)   
     * @Serializer\Type("string")     
     */    
    private $place;            

    /**
     * Get the value of name
     */ 
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of description
     */ 
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set the value of description
     *
     * @return  self
     */ 
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get the value of date
     */ 
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set the value of date
     *
     * @return  self
     */ 
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get the value of time
     */ 
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set the value of time
     *
     * @return  self
     */ 
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get the value of place
     */ 
    public function getPlace()
    {
        return $this->place;
    }

    /**
     * Set the value of place
     *
     * @return  self
     */ 
    public function setPlace($place)
    {
        $this->place = $place;

        return $this;
    }
}