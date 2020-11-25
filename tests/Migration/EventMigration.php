<?php

namespace tests\Migration;

use tests\Migration\AbstractMigration;

class EventMigration extends AbstractMigration {
    public function up() {
        $this->addSql("DROP TABLE IF EXISTS event");

        $this->addSql("
            CREATE TABLE `event` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `id_user` int(11) NOT NULL,
                `active` enum('No', 'Yes') default 'Yes', 
                `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
                `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
                `date` date DEFAULT NULL,
                `time` time DEFAULT NULL,
                `place` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB;
        ");        
    }
}