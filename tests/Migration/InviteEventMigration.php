<?php

namespace tests\Migration;

use tests\Migration\AbstractMigration;

class InviteEventMigration extends AbstractMigration {
    public function up() {
        $this->addSql("DROP TABLE IF EXISTS invite_event");

        $this->addSql("
            CREATE TABLE `invite_event` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `id_user` int(11) NOT NULL,
                `id_user_friendship` int(11) NOT NULL,
                `id_event` int(11) NOT NULL,
                PRIMARY KEY (`id`),
                UNIQUE KEY `unico` (`id_user`,`id_user_friendship`,`id_event`)
            ) ENGINE=InnoDB
        ");        
    }
}