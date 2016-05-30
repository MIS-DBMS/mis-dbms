# ************************************************************
# Sequel Pro SQL dump
# Version 4529
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: trust-cafe
# Generation Time: 2016-05-26 15:49:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `account` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(15),
  `email` varchar(50) NOT NULL,
  `jobTitle` varchar(20) NOT NULL DEFAULT '',
  `address` varchar(50),
  `birthday` DATE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table customerInterest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customerInterest`;

CREATE TABLE `customerInterest` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `interest` ENUM('Monday不魯','Think Big','政大創立方講座','創業肥皂箱','創業計畫書撰寫','東協相關議題','創業','品酒','簡報設計'),//「Monday不魯」「Think Big」「政大創立方講座」「創業肥皂箱」「創業計畫書撰寫」「東協相關議題」
  `customer_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (customer_id),
  CONSTRAINT `interest_fk1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table organization
# ------------------------------------------------------------

DROP TABLE IF EXISTS `organization`;

CREATE TABLE `organization` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `phone` varchar(15),
  `email` varchar(50) NOT NULL,
  `address` varchar(50),
  `miscellaneous` TEXT ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table event
# ------------------------------------------------------------

DROP TABLE IF EXISTS `event`;

CREATE TABLE `event` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `location` ENUM('B1包場','會議廳','1F包場'),
  `date` DATE,
  `startTime` TIME,
  `endTime` TIME,
  `description` TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Dump of table eventTag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `eventTag`;

CREATE TABLE `eventTag` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `eventId` int(11) unsigned NOT NULL,
  `tag` ENUM('Monday不魯','Think Big','政大創立方講座','創業肥皂箱','創業計畫書撰寫','東協相關議題'),
  PRIMARY KEY (`id`),
  CONSTRAINT `tag_fk1` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table item
# ------------------------------------------------------------

DROP TABLE IF EXISTS `item`;

CREATE TABLE `item` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `date` DATE NOT NULL,
  `description` TEXT,
  `value` int(10) unsigned NOT NULL,
  `customerId` int(11) unsigned NOT NULL,
  `organizationId` int(11) unsigned NOT NULL,
  `eventId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `item_fk1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `item_fk2` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `item_fk3` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table hold
# ------------------------------------------------------------

DROP TABLE IF EXISTS `hold`;

CREATE TABLE `hold` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` ENUM('主辦','協辦','贊助'),
  `organizationId` int(11) unsigned NOT NULL,
  `eventId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `hold_fk1` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `hold_fk2` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Dump of table host
# ------------------------------------------------------------

DROP TABLE IF EXISTS `host`;

CREATE TABLE `host` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int(11) unsigned NOT NULL,
  `eventId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `host_fk1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `host_fk2` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




# Dump of table participate
# ------------------------------------------------------------

DROP TABLE IF EXISTS `participate`;

CREATE TABLE `participate` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int(11) unsigned NOT NULL,
  `eventId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `participate_fk1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `participate_fk2` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
