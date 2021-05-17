<?php

namespace tests\Migration;

abstract class AbstractMigration {
    private $em;

    public function __construct(\Doctrine\ORM\EntityManager $em) {
        $this->em = $em;        
    }

    final public function addSql($sql) {
        $this->em->getConnection()->exec($sql);        
    }

    abstract public function up();
}