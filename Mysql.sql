/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 8.0.24 : Database - groupomania
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `groupomania`;

/*Table structure for table `comments` */

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `User_id` int DEFAULT NULL,
  `CreationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `ImgUrl` longtext,
  `Text` varchar(250) DEFAULT NULL,
  `Suppression` datetime DEFAULT NULL,
  `ReplyTo_id` int DEFAULT NULL,
  `checkedByAdmin` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Commentaire_User_idx` (`User_id`),
  KEY `fk_Commentaire_Commentaire1_idx` (`ReplyTo_id`),
  CONSTRAINT `fk_Commentaire_Commentaire1` FOREIGN KEY (`ReplyTo_id`) REFERENCES `comments` (`id`),
  CONSTRAINT `fk_Commentaire_User` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=315 DEFAULT CHARSET=utf8mb3;

/*Data for the table `comments` */

insert  into `comments`(`id`,`User_id`,`CreationDate`,`ImgUrl`,`Text`,`Suppression`,`ReplyTo_id`,`checkedByAdmin`) values 
(217,56,'2021-05-20 10:18:30','calanques-de-cassis1.jpg1621505910579.jpg','',NULL,NULL,1),
(218,56,'2021-05-20 11:19:20','2CV-Special-jaune-cedrat-2.jpg1621509560879.jpg','',NULL,NULL,1),
(219,56,'2021-05-20 11:19:23','2CV-Special-jaune-cedrat-2.jpg1621509563565.jpg','',NULL,NULL,1),
(228,56,'2021-05-20 11:55:39','calanques-de-cassis1.jpg1621511739189.jpg','',NULL,NULL,1),
(229,56,'2021-05-20 11:55:41','calanques-de-cassis1.jpg1621511741672.jpg','',NULL,NULL,1),
(230,56,'2021-05-20 11:55:43','calanques-de-cassis1.jpg1621511743461.jpg','',NULL,NULL,1),
(231,56,'2021-05-20 11:55:44','calanques-de-cassis1.jpg1621511744833.jpg','',NULL,NULL,1),
(232,56,'2021-05-20 11:55:46','calanques-de-cassis1.jpg1621511746345.jpg','',NULL,NULL,1),
(233,56,'2021-05-20 11:55:47','calanques-de-cassis1.jpg1621511747625.jpg','',NULL,NULL,1),
(234,56,'2021-05-20 11:55:49','calanques-de-cassis1.jpg1621511749505.jpg','',NULL,NULL,1),
(236,56,'2021-05-26 09:02:10','chaton.jpg1622536989227.jpg','Un peu plus de texte',NULL,NULL,1),
(261,56,'2021-06-01 07:55:22','paysage-tropical-vacances-palme-ete_1203-5352.jpg1622623122796.jpg','Juste du texte avec une image',NULL,NULL,1),
(284,56,'2021-06-02 13:14:36',NULL,'C\'est magnifique',NULL,261,1),
(288,56,'2021-06-03 09:24:48',NULL,'Wouah !',NULL,261,1),
(289,56,'2021-06-11 09:42:52',NULL,'az','2021-06-11 13:35:12',261,1),
(290,56,'2021-06-11 16:28:20','','Juste du texte',NULL,NULL,1),
(291,66,'2021-06-24 14:01:45',NULL,'az','2021-06-24 14:09:07',234,1),
(292,66,'2021-06-24 14:09:01',NULL,'az','2021-06-24 14:09:04',234,1),
(293,66,'2021-06-24 14:25:10','Beaugosse.png1624544710359.png','Pas mal ce petit reportage','2021-06-27 08:05:26',NULL,1),
(294,67,'2021-06-26 15:56:35','','ok','2021-06-27 08:05:22',NULL,1),
(295,68,'2021-06-27 06:26:26','images.jpg1624775216361.jpg','Commentaire modifié','2021-06-27 06:27:52',NULL,1),
(296,68,'2021-06-27 06:27:36',NULL,'azerty','2021-06-27 06:27:45',295,1),
(297,68,'2021-06-27 06:28:27','téléchargement_(2).jpg1624775307050.jpg','Commentaire','2021-06-27 08:04:48',NULL,1),
(299,66,'2021-06-27 07:30:34',NULL,'commentaire ','2021-06-27 07:30:56',NULL,NULL),
(300,66,'2021-06-27 07:31:16',NULL,'az','2021-06-27 07:31:23',297,NULL),
(301,66,'2021-06-27 08:11:52',NULL,'az','2021-06-27 08:12:06',290,NULL),
(302,66,'2021-06-27 08:12:36','inspiration-voyage.jpg1624781556596.jpg','commentaire 1','2021-06-27 09:01:03',NULL,NULL),
(303,66,'2021-06-27 08:59:26',NULL,'aze','2021-06-27 08:59:44',302,NULL),
(304,66,'2021-06-27 08:59:57','inspiration-voyage.jpg1624784397719.jpg','commentaire ','2021-06-27 09:00:59',NULL,NULL),
(305,66,'2021-06-27 09:00:04','inspiration-voyage.jpg1624784404821.jpg','commentaire','2021-06-27 09:00:55',NULL,NULL),
(306,66,'2021-06-27 09:00:17','inspiration-voyage.jpg1624784450357.jpg','commentaire simple','2021-06-27 09:07:40',NULL,NULL),
(307,66,'2021-06-27 09:06:13','inspiration-voyage.jpg1624784811205.jpg','commentaire 1','2021-06-27 09:07:44',NULL,NULL),
(308,66,'2021-06-27 09:07:01',NULL,'az','2021-06-27 09:07:06',307,NULL),
(309,69,'2021-06-27 10:15:17',NULL,'az','2021-06-27 10:15:22',229,NULL),
(310,69,'2021-06-27 10:15:38',NULL,'Commentaire',NULL,NULL,NULL),
(311,66,'2021-06-28 15:18:23','inspiration-voyage.jpg1624894226504.jpg','Un dernier commentaire pour la route !',NULL,NULL,NULL),
(312,70,'2021-06-28 15:40:47','','Test ',NULL,NULL,NULL),
(313,70,'2021-06-28 15:41:49','avion.jpg1624894909816.jpg','',NULL,NULL,NULL),
(314,70,'2021-06-28 15:42:41','Voyage_voyage.jpg1624894961147.jpg','Et un dernier',NULL,NULL,NULL);

/*Table structure for table `like_number` */

DROP TABLE IF EXISTS `like_number`;

CREATE TABLE `like_number` (
  `ComId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`ComId`,`UserId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `like_number_ibfk_1` FOREIGN KEY (`ComId`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `like_number_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `like_number` */

insert  into `like_number`(`ComId`,`UserId`) values 
(261,56),
(297,66),
(302,66),
(307,66),
(308,66),
(261,68),
(295,68),
(229,69),
(309,69),
(261,70);

/*Table structure for table `parameters` */

DROP TABLE IF EXISTS `parameters`;

CREATE TABLE `parameters` (
  `param_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `param_value` json DEFAULT NULL,
  PRIMARY KEY (`param_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `parameters` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `Service` varchar(45) DEFAULT NULL,
  `Mail` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `PassWord` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Moderator` tinyint DEFAULT '0',
  `ModerationDate` datetime DEFAULT NULL,
  `CreationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `Suppression` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb3;

/*Data for the table `user` */

insert  into `user`(`id`,`Name`,`FirstName`,`Service`,`Mail`,`PassWord`,`Moderator`,`ModerationDate`,`CreationDate`,`Suppression`) values 
(56,'Charles','Julien','Stagiaire','toto@groupomania.fr','$2b$10$2kg955vqsFKAyIHf9pLPR.bJZTtjtE4.wt4Iwdu6MLZJTaps2cMXe',1,'2021-06-03 08:08:13','2021-04-27 07:33:36',NULL),
(64,'Charles','Julien','Informatique','j.charles@groupomania.fr','$2b$10$2kg955vqsFKAyIHf9pLPR.bJZTtjtE4.wt4Iwdu6MLZJTaps2cMXe',0,NULL,'2021-06-23 17:02:13',NULL),
(66,'Dupont','Théo','Administration','admin@groupomania.fr','$2b$10$SP9h6NveHvnzUHLICj18yuk.YHpF9m8byAEsufbGEu.oHC8zJY/yq',1,'2021-06-27 06:30:54','2021-06-24 14:00:52',NULL),
(67,'lambda','lambda','Commercial','tata@groupomania.fr','$2b$10$GsuMZL038VnC5IuQIdp2oO4ZDiZRHB2zbfJ/RiaqahA1GJw8zu7lO',0,NULL,'2021-06-26 15:56:09','2021-06-26 15:56:43'),
(68,'Charles','Julien','Commercial','azerty@groupomania.fr','$2b$10$0PX/Rhw8rgGmoLLiqfpw0.s69nSd0cyfY9zjwS/v6.1UZacCfuBEu',0,NULL,'2021-06-27 06:24:57','2021-06-27 06:30:38'),
(69,'Charles','Julien','Ressources Humaines','test@groupomania.fr','$2b$10$tCrQQbQpp7Nj8jAQjWPQKuSy3ICgy4w5j9jY6QklbZr8qwDl.Ei5u',0,NULL,'2021-06-27 10:14:09',NULL),
(70,'Bouchard','Gérard','Comptabilité','g.bouchard@groupomania.fr','$2b$10$FAzYZ0V0vWN5FLJdySqG3.lx4rEvAu/sBkjMSgeerzM.8/1EL5.Di',0,NULL,'2021-06-28 15:40:06',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
