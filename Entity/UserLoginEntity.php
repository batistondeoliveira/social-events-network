<?php

namespace Entity;

use Entity\AbstractEntity;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;

/**
 * @Table(name="user_login")
 * @Entity()
 */
class UserLoginEntity extends AbstractEntity {         
    /**
     * @Column(name="id_user", type="integer")
     * @Assert\NotBlank()   
     * @Serializer\Type("integer")   
     */
    private $idUsuario;

    /**
     * @Column(name="token", type="string")
     * @Assert\NotBlank()   
     * @Serializer\Type("string")   
     */
    private $token;

    /**
     * @Column(name="datahora", type="datetime")
     * @Assert\NotBlank()   
     * @Serializer\Type("datetime")   
     */
    private $datahora;

    /**
     * @Column(name="expirar", type="datetime")
     * @Assert\NotBlank()   
     * @Serializer\Type("datetime")   
     */
    private $expirar;


    public function __construct()
    {
        parent::__construct($this);
        
        $this->datahora = new DateTime();
        $this->expirar = (new DateTime())->modify('+ 60 minutes');
    }    

    /**
     * Get the value of idUsuario
     */ 
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }

    /**
     * Set the value of idUsuario
     *
     * @return  self
     */ 
    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;

        return $this;
    }

    /**
     * Get the value of token
     */ 
    public function getToken()
    {
        return $this->token;
    }

    /**
     * Set the value of token
     *
     * @return  self
     */ 
    public function setToken($token)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * Get the value of datahora
     */ 
    public function getDatahora()
    {
        return $this->datahora;
    }

    /**
     * Set the value of datahora
     *
     * @return  self
     */ 
    public function setDatahora($datahora)
    {
        $this->datahora = $datahora;

        return $this;
    }

    /**
     * Get the value of expirar
     */ 
    public function getExpirar()
    {
        return $this->expirar;
    }

    /**
     * Set the value of expirar
     *
     * @return  self
     */ 
    public function setExpirar($expirar)
    {
        $this->expirar = $expirar;

        return $this;
    }
}