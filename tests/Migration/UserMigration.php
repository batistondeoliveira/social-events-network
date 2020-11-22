<?php

namespace tests\Migration;

use tests\Migration\AbstractMigration;

class UserMigration extends AbstractMigration {
    public function up() {
        $this->addSql("DROP TABLE IF EXISTS user");

        $this->addSql("
            CREATE TABLE IF NOT EXISTS `user` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
                `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
                `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
                `bio` varchar(255) COLLATE utf8_unicode_ci,
                `profile_picture` varchar(255) COLLATE utf8_unicode_ci,
                `city` varchar(100) COLLATE utf8_unicode_ci,
                `state` varchar(2) COLLATE utf8_unicode_ci,
                PRIMARY KEY (`id`),
                UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
            ) ENGINE=InnoDB
        ");
    }
}