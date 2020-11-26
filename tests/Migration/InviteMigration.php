<?php

namespace tests\Migration;

use tests\Migration\AbstractMigration;

class InviteMigration extends AbstractMigration {
    public function up() {
        $this->addSql("DROP TABLE IF EXISTS invite");

        $this->addSql("
            CREATE TABLE `invite` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `id_user` int(11) NOT NULL,
                `id_user_friendship` int(11) DEFAULT NULL,
                `type` enum('Friendship','Event') NOT NULL,
                PRIMARY KEY (`id`),
                UNIQUE KEY `unico` (`id_user`,`id_user_friendship`)
            ) ENGINE=InnoDB
        ");        
    }
}