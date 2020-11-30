<?php

namespace Entity;

use Classes\MyDateTime;
use Classes\Enums\ActiveEnum;

use Entity\AbstractEntity;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;

use JMS\Serializer\Annotation as Serializer;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @Entity()
 * @Table(name= "event")
 */
class EventEntity extends AbstractEntity {
    /**
     * @Column(name="id_user", type="integer")          
     * @Assert\NotBlank()  
     * @Serializer\Exclude()
     * @Serializer\Type("integer")   
     */
    private $idUser;

    /**
     * @Column(name="active", type="string")          
     * @Assert\NotBlank()  
     * @Serializer\Exclude()
     * @Serializer\Type("string")   
     */
    private $active;

    /**
     * @Column(name="name", type="string", length=100, nullable=true)
     * @Assert\Length(max = 100)
     * @Assert\NotBlank()  
     * @Serializer\Type("string")   
     */
    private $name;
    
    /**
     * @Column(name="description", type="string", nullable=true)               
     * @Serializer\Type("string")   
     */
    private $description;
    
    /**
     * @Column(name="date", type="date", nullable=true)
     * @Assert\NotBlank()          
     * @Serializer\Type("string")   
     */
    private $date;
    
    /**
     * @Column(name="time", type="string", nullable=true)   
     * @Serializer\Type("string")     
     */
    private $time;
    
    /**
     * @Column(name="place", type="string", length=255, nullable=true)   
     * @Serializer\Type("string")     
     */    
    private $place;      
    
    private $type; //transient property

    public function __construct() {
        parent::__construct($this);

        $this->active = ActiveEnum::YES;
    }
    
    /**
     * Get the value of idUser
     */ 
    public function getIdUser()
    {
        return $this->idUser;
    }

    /**
     * Set the value of idUser
     *
     * @return  self
     */ 
    public function setIdUser($idUser)
    {
        $this->idUser = $idUser;

        return $this;
    }
    
    /**
     * Get the value of active
     */ 
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set the value of active
     *
     * @return  self
     */ 
    public function setActive($active)
    {
        $this->active = ActiveEnum::isValid($active);

        return $this;
    }

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
        $this->date = \DateTime::createFromFormat(MyDateTime::DateFormat, $date);

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

    /**
     * Get the value of user
     */ 
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set the value of user
     *
     * @return  self
     */ 
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }    

    public function serialize() {
        $this->date = $this->getDate()->format('Y-m-d');

        return parent::serialize();                    
    }

    public function deserialize($json) { 
        $obj = parent::deserialize($json);

        $obj->setDate($json->date);   

        if(empty($obj->getId()))
            $obj->setActive(ActiveEnum::YES);      

        return $obj;
    }    

    /**
     * Get the value of type
     */ 
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set the value of type
     *
     * @return  self
     */ 
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }
}