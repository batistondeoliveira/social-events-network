CREATE DATABASE social_event_network;

/*Table structure for table `event` */

CREATE TABLE `event` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NOT NULL,
  `active` ENUM('No','Yes') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Yes',
  `name` VARCHAR(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` VARCHAR(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `time` TIME DEFAULT NULL,
  `place` VARCHAR(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB;

/*Table structure for table `friendship` */

CREATE TABLE `friendship` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NOT NULL,
  `id_user_friendship` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB;

/*Table structure for table `invite_event` */

CREATE TABLE `invite_event` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NOT NULL,
  `id_user_friendship` INT(11) NOT NULL,
  `id_event` INT(11) NOT NULL,
  `status` ENUM('Wait','Confirmed','Rejected') NOT NULL DEFAULT 'Wait',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unico` (`id_user`,`id_user_friendship`,`id_event`)
) ENGINE=INNODB;

/*Table structure for table `invite_friendship` */

CREATE TABLE `invite_friendship` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NOT NULL,
  `id_user_friendship` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unico` (`id_user`,`id_user_friendship`)
) ENGINE=INNODB;

/*Table structure for table `user` */

CREATE TABLE `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` VARCHAR(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` VARCHAR(100) COLLATE utf8_unicode_ci NOT NULL,
  `bio` VARCHAR(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profile_picture` VARCHAR(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` VARCHAR(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` VARCHAR(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unico` (`email`)
) ENGINE=INNODB;

/*Table structure for table `user_login` */

CREATE TABLE `user_login` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NOT NULL,
  `token` VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
  `datahora` DATETIME NOT NULL,
  `expirar` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB;