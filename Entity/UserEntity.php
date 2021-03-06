<?php

namespace Entity;

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
 * @Table(name= "user",
 *    uniqueConstraints={
 *       @UniqueConstraint(name="unico", 
 *            columns={"email"})
 *       }
 * )
 */
class UserEntity extends AbstractEntity {
    /**
     * @Column(name="name", type="string", length=100)
     * @Assert\Length(min = 2, max = 100)
     * @Assert\NotBlank()  
     * @Serializer\Type("string")   
     */
    private $name;
    
    /**
     * @Column(name="email", type="string", length=100)     
     * @Assert\Length(max = 100)
     * @Assert\NotBlank()     
     * @Assert\Email()
     * @Serializer\Type("string")   
     */
    private $email;
    
    /**
     * @Column(name="password", type="string", length=100)
     * @Assert\Length(max = 100)
     * @Assert\NotBlank()          
     * @Serializer\Type("string")   
     * @Serializer\Exclude()
     */
    private $password;
    
    /**
     * @Column(name="bio", type="string", nullable=true)   
     * @Serializer\Type("string")     
     */
    private $bio;
    
    /**
     * @Column(name="profile_picture", type="string", length=255, nullable=true)   
     * @Serializer\Type("string")     
     */    
    private $profilePicture;    
    
    /**
     * @Column(name="city", type="string", length=100, nullable=true)
     * @Assert\Length(max = 100)
     * @Serializer\Type("string")        
     */        
    private $city;
    
    /**
     * @Column(name="state", type="string", length=2, nullable=true)
     * @Assert\Length(max = 2)
     * @Serializer\Type("string")   
     */        
    private $state;

    public function __construct() {
        parent::__construct($this);
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
     * Get the value of email
     */ 
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */ 
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get the value of password
     */ 
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set the value of password
     *
     * @return  self
     */ 
    public function setPassword($password)
    {
        $this->password = password_hash($password, PASSWORD_DEFAULT);        

        return $this;
    }

    /**
     * Get the value of bio
     */ 
    public function getBio()
    {
        return $this->bio;
    }

    /**
     * Set the value of bio
     *
     * @return  self
     */ 
    public function setBio($bio)
    {
        $this->bio = $bio;

        return $this;
    }

    /**
     * Get the value of profilePicture
     */ 
    public function getProfilePicture()
    {
        return $this->profilePicture;
    }

    /**
     * Set the value of profilePicture
     *
     * @return  self
     */ 
    public function setProfilePicture($profilePicture)
    {
        $this->profilePicture = $profilePicture;

        return $this;
    }

    /**
     * Get the value of city
     */ 
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set the value of city
     *
     * @return  self
     */ 
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get the value of state
     */ 
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set the value of state
     *
     * @return  self
     */ 
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }   
    
    public function initializeErrorMessage() {           
        parent::initializeErrorMessage();

        $this->addErrorMessage(UniqueConstraintViolationException::class, 'E-mail já cadastrado');        
    } 

    public function deserialize($json) { 
        $obj = parent::deserialize($json);

        $obj->setPassword($obj->getPassword()); //Encrypts the password

        return $obj;
    }
}