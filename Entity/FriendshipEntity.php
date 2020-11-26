<?php

namespace Entity;

use Entity\AbstractEntity;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;

use JMS\Serializer\Annotation as Serializer;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @Entity()
 * @Table(name= "friendship")
 */
class FriendshipEntity extends AbstractEntity {         
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

    public function __construct() {
        parent::__construct($this);
    }
        
    public function initializeErrorMessage() {           
        parent::initializeErrorMessage();

        $this->addErrorMessage(UniqueConstraintViolationException::class, 'Vocês já são amigos');        
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
}