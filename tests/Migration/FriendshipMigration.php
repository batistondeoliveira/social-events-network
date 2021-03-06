<?php

namespace tests\Migration;

use tests\Migration\AbstractMigration;

class FriendshipMigration extends AbstractMigration {
    public function up() {
        $this->addSql("DROP TABLE IF EXISTS friendship");

        $this->addSql("
            CREATE TABLE `friendship` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `id_user` int(11) NOT NULL,
                `id_user_friendship` int(11) NOT NULL,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB;
        ");        
    }
}