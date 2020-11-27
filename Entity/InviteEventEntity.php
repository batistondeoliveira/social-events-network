<?php

namespace Entity;

use Classes\Enums\StatusEventEnum;
use Entity\AbstractEntity;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\UniqueConstraint;

use JMS\Serializer\Annotation as Serializer;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @Entity()
 * @Table(name= "invite_event")
 */
class InviteEventEntity extends AbstractEntity {         
    /**
     * @Column(name="id_user", type="integer")     
     * @Assert\NotBlank()   
     * @Serializer\Type("integer")        
     */    
    private $idUser;
    
    /**
     * @Column(name="id_user_friendship", type="integer")     
     * @Assert\NotBlank()   
     * @Serializer\Type("integer")        
     */    
    private $idUserFriendship;    

    /**
     * @Column(name="id_event", type="integer")          
     * @Serializer\Type("integer")        
     */    
    private $idEvent;    
    
    /**
     * @Column(name="status", type="string")
     * @Serializer\Type("string") 
     * @Assert\NotBlank()  
     * @Serializer\Exclude()       
     */    
    private $status;    

    public function __construct() {
        parent::__construct($this);

        $this->status = StatusEventEnum::AGUARDANDO_CONFIRMACAO;
    }
        
    public function initializeErrorMessage() {           
        parent::initializeErrorMessage();

        $this->addErrorMessage(UniqueConstraintViolationException::class, 'Convite já enviado para esse amigo');        
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
     * Get the value of idUserFriendship
     */ 
    public function getIdUserFriendship()
    {
        return $this->idUserFriendship;
    }

    /**
     * Set the value of idUserFriendship
     *
     * @return  self
     */ 
    public function setIdUserFriendship($idUserFriendship)
    {
        $this->idUserFriendship = $idUserFriendship;

        return $this;
    }    

    /**
     * Get the value of idEvent
     */ 
    public function getIdEvent()
    {
        return $this->idEvent;
    }

    /**
     * Set the value of idEvent
     *
     * @return  self
     */ 
    public function setIdEvent($idEvent)
    {
        $this->idEvent = $idEvent;

        return $this;
    }  

    /**
     * Get the value of status
     */ 
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set the value of status
     *
     * @return  self
     */ 
    public function setStatus($status)
    {
        $this->status = StatusEventEnum::isValid($status);

        return $this;
    }
}