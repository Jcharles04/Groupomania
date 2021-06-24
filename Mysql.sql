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
) ENGINE=InnoDB AUTO_INCREMENT=293 DEFAULT CHARSET=utf8mb3;

/*Data for the table `comments` */

insert  into `comments`(`id`,`User_id`,`CreationDate`,`ImgUrl`,`Text`,`Suppression`,`ReplyTo_id`,`checkedByAdmin`) values 
(22,34,'2021-03-26 13:33:00',NULL,'aaa','2021-04-01 09:31:13',NULL,1),
(57,34,'2021-03-29 15:45:55',NULL,'dezd','2021-04-22 09:31:22',NULL,1),
(83,50,'2021-04-14 11:39:06',NULL,'blabla\r\n','2021-04-22 09:31:29',57,1),
(98,51,'2021-04-21 11:10:49',NULL,'Super!','2021-04-08 09:31:36',NULL,1),
(110,51,'2021-04-29 10:28:59',NULL,'Super!','2021-04-28 09:31:40',141,1),
(139,56,'2021-04-30 11:44:39','Cap-Vert-1.jpg1621504058952.jpg','','2021-04-26 09:31:44',NULL,1),
(140,56,'2021-04-30 11:48:01','paysage-tropical-vacances-palme-ete_1203-5352.jpg1621260857236.jpg','','2021-04-01 09:31:49',NULL,1),
(141,56,'2021-04-30 11:48:46','Cap-Vert-1.jpg1621259141246.jpg','C\'est super !!!','2021-04-01 09:31:52',NULL,1),
(145,56,'2021-05-14 15:00:48','','aaa','2021-05-14 15:03:31',NULL,1),
(146,56,'2021-05-17 10:05:34',NULL,'Blablabla','2021-05-17 10:06:02',141,1),
(147,56,'2021-05-17 10:06:15',NULL,'Blablabla','2021-05-17 10:06:53',141,1),
(148,56,'2021-05-17 10:08:34',NULL,'C\'est magnifique','2021-05-17 12:16:41',141,1),
(149,56,'2021-05-17 12:17:12',NULL,'C\'est magnifique','2021-05-17 12:17:33',141,1),
(150,56,'2021-05-17 12:18:26',NULL,'C\'est magnifique','2021-05-17 12:18:59',141,1),
(151,56,'2021-05-17 12:20:06',NULL,'C\'est magnifique','2021-05-17 12:22:17',141,1),
(152,56,'2021-05-17 13:05:45',NULL,'C\'est magnifique',NULL,141,1),
(153,56,'2021-05-17 13:09:03',NULL,'test 1','2021-05-18 07:57:07',141,1),
(154,56,'2021-05-17 15:03:56','nUqOIBc0.png1621263836014.png','Quand il pleut ta seule semaine de vacance :\'(',NULL,NULL,1),
(155,56,'2021-05-17 15:10:31','','aaa','2021-05-17 15:10:43',NULL,1),
(156,56,'2021-05-17 15:14:38','','aaa','2021-05-17 15:15:04',NULL,1),
(157,56,'2021-05-17 15:14:43','','aaa','2021-05-17 15:15:14',NULL,1),
(158,56,'2021-05-17 15:16:30','2CV-Special-jaune-cedrat-2.jpg1621264574589.jpg','','2021-05-17 15:16:36',NULL,1),
(160,56,'2021-05-18 09:27:27','calanques-de-cassis1.jpg1621330047494.jpg','','2021-05-18 09:27:33',NULL,1),
(163,56,'2021-05-18 10:27:17',NULL,'','2021-05-18 10:28:51',NULL,1),
(164,56,'2021-05-18 10:29:36',NULL,'','2021-05-18 10:30:00',NULL,1),
(165,56,'2021-05-18 10:30:46',NULL,'','2021-05-18 12:54:24',NULL,1),
(166,56,'2021-05-18 12:54:31','calanques-de-cassis1.jpg1621345722494.jpg','','2021-05-19 07:30:46',NULL,1),
(167,56,'2021-05-18 13:48:23',NULL,'C\'est magnifique',NULL,166,1),
(168,56,'2021-05-18 14:05:37','','aaa','2021-05-18 14:14:45',NULL,1),
(169,56,'2021-05-18 14:14:18','','aaa','2021-05-18 14:14:43',NULL,1),
(170,56,'2021-05-18 14:15:56','','aaa','2021-05-18 14:27:20',NULL,1),
(171,56,'2021-05-18 14:27:00','','aaa','2021-05-18 14:27:18',NULL,1),
(172,56,'2021-05-18 14:27:25','','aaa','2021-05-18 14:35:24',NULL,1),
(173,56,'2021-05-18 14:34:56','','aaa','2021-05-18 14:35:26',NULL,1),
(174,56,'2021-05-18 14:35:17','','aaa','2021-05-18 14:35:28',NULL,1),
(175,56,'2021-05-18 14:36:30','','aaa','2021-05-18 14:39:17',NULL,1),
(176,56,'2021-05-18 14:37:44','','aaa','2021-05-18 14:39:12',NULL,1),
(177,56,'2021-05-18 14:38:38','','aaa','2021-05-18 14:39:14',NULL,1),
(178,56,'2021-05-18 14:39:21','','aaa','2021-05-18 14:39:30',NULL,1),
(179,56,'2021-05-18 14:39:40','','aaa','2021-05-18 14:41:16',NULL,1),
(180,56,'2021-05-18 14:40:07','','aaa','2021-05-18 14:41:18',NULL,1),
(181,56,'2021-05-18 14:41:21','','aaa','2021-05-18 14:41:30',NULL,1),
(182,56,'2021-05-18 14:42:31','','aaa','2021-05-18 14:42:40',NULL,1),
(183,56,'2021-05-19 07:38:13','calanques-de-cassis1.jpg1621409893190.jpg','','2021-05-19 15:08:07',NULL,1),
(184,56,'2021-05-19 07:50:44','','aaa','2021-05-19 07:59:17',NULL,1),
(185,56,'2021-05-19 07:54:43','','aaa','2021-05-19 07:58:59',NULL,1),
(186,56,'2021-05-19 07:58:43','','aaa','2021-05-19 07:59:12',NULL,1),
(187,56,'2021-05-19 07:59:26','chaton.jpg1621411166685.jpg','','2021-05-19 08:04:04',NULL,1),
(188,56,'2021-05-19 07:59:55','','aaa','2021-05-19 08:00:12',NULL,1),
(189,56,'2021-05-19 08:04:19','','aaa','2021-05-19 08:06:18',NULL,1),
(190,56,'2021-05-19 08:05:08','','aaa','2021-05-19 08:06:17',NULL,1),
(191,56,'2021-05-19 08:06:24','chaton.jpg1621411584836.jpg','','2021-05-19 09:14:09',NULL,1),
(192,56,'2021-05-19 08:14:59','','aaa','2021-05-19 08:15:34',NULL,1),
(193,56,'2021-05-19 08:15:54','','aaa','2021-05-19 08:18:09',NULL,1),
(194,56,'2021-05-19 08:18:13','','aaa','2021-05-19 08:19:29',NULL,1),
(195,56,'2021-05-19 08:19:06','','aaa','2021-05-19 08:19:27',NULL,1),
(196,56,'2021-05-19 08:20:29','','aaa','2021-05-19 08:20:34',NULL,1),
(197,56,'2021-05-19 08:20:37','','aaa','2021-05-19 08:20:40',NULL,1),
(198,56,'2021-05-19 08:20:42','','aaa','2021-05-19 08:20:44',NULL,1),
(199,56,'2021-05-19 08:20:46','','aaa','2021-05-19 08:20:49',NULL,1),
(200,56,'2021-05-19 08:20:55','','aaa','2021-05-19 08:21:02',NULL,1),
(201,56,'2021-05-19 08:21:19','','aaa','2021-05-19 08:22:38',NULL,1),
(202,56,'2021-05-19 08:22:44','','aaa','2021-05-19 08:23:00',NULL,1),
(203,56,'2021-05-19 08:23:03','','aaa','2021-05-19 08:23:25',NULL,1),
(204,56,'2021-05-19 14:00:11',NULL,'C\'est magnifique',NULL,57,1),
(205,56,'2021-05-19 15:08:49','calanques-de-cassis1.jpg1621436929498.jpg','','2021-05-20 07:42:16',NULL,1),
(206,56,'2021-05-20 07:42:23','calanques-de-cassis1.jpg1621504221882.jpg','','2021-05-20 10:05:48',NULL,1),
(207,56,'2021-05-20 09:53:34',NULL,'C\'est magnifique','2021-05-20 09:56:03',206,1),
(208,56,'2021-05-20 09:54:32',NULL,'C\'est magnifique','2021-05-20 09:55:56',206,1),
(209,56,'2021-05-20 09:54:42',NULL,'C\'est magnifique','2021-05-20 09:55:26',206,1),
(210,56,'2021-05-20 09:56:33',NULL,'C\'est magnifique','2021-05-20 10:04:01',206,1),
(211,56,'2021-05-20 10:03:56',NULL,'C\'est magnifique',NULL,206,1),
(212,56,'2021-05-20 10:06:01','calanques-de-cassis1.jpg1621505161894.jpg','','2021-05-20 10:06:04',NULL,1),
(213,56,'2021-05-20 10:07:14','calanques-de-cassis1.jpg1621505234545.jpg','','2021-05-20 10:10:49',NULL,1),
(214,56,'2021-05-20 10:11:17','calanques-de-cassis1.jpg1621505477094.jpg','','2021-05-20 10:11:19',NULL,1),
(215,56,'2021-05-20 10:11:51','calanques-de-cassis1.jpg1621505511271.jpg','','2021-05-20 10:11:54',NULL,1),
(216,56,'2021-05-20 10:12:22','calanques-de-cassis1.jpg1621505542753.jpg','','2021-05-20 10:12:25',NULL,1),
(217,56,'2021-05-20 10:18:30','calanques-de-cassis1.jpg1621505910579.jpg','',NULL,NULL,1),
(218,56,'2021-05-20 11:19:20','2CV-Special-jaune-cedrat-2.jpg1621509560879.jpg','',NULL,NULL,1),
(219,56,'2021-05-20 11:19:23','2CV-Special-jaune-cedrat-2.jpg1621509563565.jpg','',NULL,NULL,1),
(220,56,'2021-05-20 11:19:29','calanques-de-cassis1.jpg1621509569848.jpg','','2021-05-20 11:48:49',NULL,1),
(221,56,'2021-05-20 11:19:41','Cap-Vert-1.jpg1621509581099.jpg','','2021-05-20 11:48:38',NULL,1),
(222,56,'2021-05-20 11:19:52','chaton.jpg1621509592635.jpg','','2021-05-20 11:47:03',NULL,1),
(223,56,'2021-05-20 11:20:01','nUqOIBc0.png1621509601373.png','','2021-05-20 11:41:55',NULL,1),
(224,56,'2021-05-20 11:20:08','calanques-de-cassis1.jpg1621509608121.jpg','','2021-05-20 11:41:17',NULL,1),
(225,56,'2021-05-20 11:20:10','calanques-de-cassis1.jpg1621509610524.jpg','','2021-05-20 11:40:32',NULL,1),
(226,56,'2021-05-20 11:20:12','calanques-de-cassis1.jpg1621509612437.jpg','','2021-05-20 11:37:49',NULL,1),
(227,56,'2021-05-20 11:20:13','calanques-de-cassis1.jpg1621509613765.jpg','','2021-05-20 11:37:40',NULL,1),
(228,56,'2021-05-20 11:55:39','calanques-de-cassis1.jpg1621511739189.jpg','',NULL,NULL,1),
(229,56,'2021-05-20 11:55:41','calanques-de-cassis1.jpg1621511741672.jpg','',NULL,NULL,1),
(230,56,'2021-05-20 11:55:43','calanques-de-cassis1.jpg1621511743461.jpg','',NULL,NULL,1),
(231,56,'2021-05-20 11:55:44','calanques-de-cassis1.jpg1621511744833.jpg','',NULL,NULL,1),
(232,56,'2021-05-20 11:55:46','calanques-de-cassis1.jpg1621511746345.jpg','',NULL,NULL,1),
(233,56,'2021-05-20 11:55:47','calanques-de-cassis1.jpg1621511747625.jpg','',NULL,NULL,1),
(234,56,'2021-05-20 11:55:49','calanques-de-cassis1.jpg1621511749505.jpg','',NULL,NULL,1),
(235,56,'2021-05-20 12:05:46','','Juste du texte','2021-05-26 09:47:40',NULL,1),
(236,56,'2021-05-26 09:02:10','chaton.jpg1622536989227.jpg','Un peu plus de texte',NULL,NULL,1),
(237,56,'2021-05-26 09:06:27','','aaa','2021-05-26 09:08:11',NULL,1),
(238,56,'2021-05-26 09:07:08','','aaa','2021-05-26 09:08:26',NULL,1),
(239,56,'2021-05-26 09:09:41','','aaa','2021-05-26 09:10:07',NULL,1),
(240,56,'2021-05-26 09:10:29','','aaa','2021-05-26 09:27:10',NULL,1),
(241,56,'2021-05-26 09:21:30','','aaa','2021-05-26 09:27:08',NULL,1),
(242,56,'2021-05-26 09:24:47','','aaa','2021-05-26 09:27:06',NULL,1),
(243,56,'2021-05-26 09:26:05','','aaa','2021-05-26 09:26:55',NULL,1),
(244,56,'2021-05-26 09:26:32','','aaa','2021-05-26 09:27:04',NULL,1),
(245,56,'2021-05-26 09:29:16','','aaaa','2021-05-26 09:43:51',NULL,1),
(246,56,'2021-05-26 09:33:27','','aaa','2021-05-26 09:37:22',NULL,1),
(247,56,'2021-05-26 09:35:28','','aaa','2021-05-26 09:36:42',NULL,1),
(248,56,'2021-05-26 09:44:18','','aaa','2021-05-26 09:44:21',NULL,1),
(249,56,'2021-05-26 09:46:56','','aaa','2021-05-26 09:46:59',NULL,1),
(250,56,'2021-05-26 09:48:04','','Juste du texte','2021-06-01 07:24:09',NULL,1),
(251,56,'2021-05-26 15:17:43','','aaa','2021-05-27 11:50:41',NULL,1),
(252,56,'2021-05-27 11:52:26','','Super!','2021-05-27 11:52:29',NULL,1),
(253,56,'2021-05-27 11:52:57','','Super!','2021-05-27 11:53:00',NULL,1),
(254,56,'2021-05-27 11:54:03','','aaa','2021-05-27 11:54:07',NULL,1),
(255,56,'2021-05-27 11:54:51','','aaa','2021-05-27 11:54:54',NULL,1),
(256,56,'2021-05-27 11:55:42','','aaa','2021-05-27 11:55:45',NULL,1),
(257,56,'2021-05-27 11:56:36','','aaa','2021-05-27 11:56:38',NULL,1),
(258,56,'2021-05-27 12:00:21','','aaa','2021-06-01 13:32:31',261,1),
(259,56,'2021-05-31 08:20:14',NULL,'Ceci est un commentaire',NULL,250,1),
(260,56,'2021-06-01 07:24:18','','Juste du texte','2021-06-01 07:55:18',NULL,1),
(261,56,'2021-06-01 07:55:22','paysage-tropical-vacances-palme-ete_1203-5352.jpg1622623122796.jpg','Juste du texte avec une image',NULL,NULL,1),
(262,56,'2021-06-01 13:18:25',NULL,'C\'est magnifique','2021-06-01 13:23:22',236,1),
(263,56,'2021-06-01 13:32:41',NULL,'C\'est magnifique','2021-06-01 14:26:02',261,1),
(264,56,'2021-06-01 14:26:13',NULL,'C\'est magnifique','2021-06-01 14:28:33',261,1),
(265,56,'2021-06-01 14:26:53',NULL,'C\'est magnifique','2021-06-01 14:28:35',261,1),
(266,56,'2021-06-01 14:26:59',NULL,'C\'est magnifique','2021-06-01 14:28:38',261,1),
(267,56,'2021-06-01 14:27:01',NULL,'C\'est magnifique','2021-06-01 14:28:41',261,1),
(268,56,'2021-06-01 14:27:03',NULL,'C\'est magnifique','2021-06-01 14:28:44',261,1),
(269,56,'2021-06-01 14:27:05',NULL,'C\'est magnifique','2021-06-01 15:04:45',261,1),
(270,56,'2021-06-01 14:27:07',NULL,'C\'est magnifique !','2021-06-01 14:28:21',261,1),
(271,56,'2021-06-01 15:04:53',NULL,'C\'est magnifique','2021-06-02 07:14:10',261,1),
(272,56,'2021-06-01 16:07:34',NULL,'C\'est magnifique','2021-06-01 16:08:06',261,1),
(273,56,'2021-06-01 16:08:25',NULL,'Blablabla','2021-06-01 16:09:33',261,1),
(274,56,'2021-06-02 07:14:21',NULL,'Blablabla','2021-06-02 07:39:18',261,1),
(275,56,'2021-06-02 07:39:28',NULL,'C\'est magnifique','2021-06-02 07:40:17',261,1),
(276,56,'2021-06-02 07:40:58',NULL,'C\'est magnifique','2021-06-02 07:43:36',261,1),
(277,56,'2021-06-02 07:44:15',NULL,'C\'est magnifique','2021-06-02 07:48:31',261,1),
(278,56,'2021-06-02 08:04:15',NULL,'BlablablaBLA','2021-06-02 08:05:27',261,1),
(279,56,'2021-06-02 08:05:48',NULL,'C\'est magnifique','2021-06-02 08:05:52',261,1),
(280,56,'2021-06-02 08:19:56',NULL,'C\'est magnifique','2021-06-02 08:20:00',261,1),
(281,56,'2021-06-02 08:20:50',NULL,'C\'est magnifique','2021-06-02 08:22:21',261,1),
(282,56,'2021-06-02 08:25:27',NULL,'C\'est magnifique','2021-06-02 08:25:39',261,1),
(283,56,'2021-06-02 08:28:58',NULL,'C\'est magnifique !','2021-06-02 08:31:23',261,1),
(284,56,'2021-06-02 13:14:36',NULL,'C\'est magnifique',NULL,261,1),
(285,56,'2021-06-02 14:11:52','2CV-Special-jaune-cedrat-2.jpg1622643112585.jpg','\"; DELETE FROM User','2021-06-02 15:50:30',NULL,1),
(286,56,'2021-06-02 14:12:34','2CV-Special-jaune-cedrat-2.jpg1622643154906.jpg','<script>alert(\'hello\')</script>','2021-06-02 15:50:35',NULL,1),
(287,56,'2021-06-02 14:13:07','2CV-Special-jaune-cedrat-2.jpg1622643187709.jpg','<a href=\"javascript:alert(\'hello\')\">clique</a>','2021-06-02 15:50:39',NULL,1),
(288,56,'2021-06-03 09:24:48',NULL,'Wouah !',NULL,261,NULL),
(289,56,'2021-06-11 09:42:52',NULL,'az','2021-06-11 13:35:12',261,NULL),
(290,56,'2021-06-11 16:28:20','','Juste du texte',NULL,NULL,NULL),
(291,66,'2021-06-24 14:01:45',NULL,'az','2021-06-24 14:09:07',234,NULL),
(292,66,'2021-06-24 14:09:01',NULL,'az','2021-06-24 14:09:04',234,NULL);

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
(57,50),
(57,56),
(139,56),
(140,56),
(141,56),
(148,56),
(151,56),
(152,56),
(153,56),
(154,56),
(205,56),
(258,56),
(261,56),
(263,56),
(269,56),
(271,56),
(274,56),
(278,56);

/*Table structure for table `parameters` */

DROP TABLE IF EXISTS `parameters`;

CREATE TABLE `parameters` (
  `param_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `param_value` json DEFAULT NULL,
  PRIMARY KEY (`param_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `parameters` */

insert  into `parameters`(`param_name`,`param_value`) values 
('security','{\"JWT_SECRET_TOKEN\": \"toto\"}');

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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb3;

/*Data for the table `user` */

insert  into `user`(`id`,`Name`,`FirstName`,`Service`,`Mail`,`PassWord`,`Moderator`,`ModerationDate`,`CreationDate`,`Suppression`) values 
(1,'Toto','To','Commercial','toto@gmail.com','ABCDEF',0,NULL,NULL,NULL),
(34,'aaa','Jean','Comptabilité','aaa@aaa','$2b$10$EBUsURwRalcszMTdxsR0FugxMOWeKi9qMBnEf7G69qmAI5sP/vcPu',0,NULL,'2021-03-23 10:13:22','2021-05-21 09:20:14'),
(43,'Charles','Julien','Comptabilité','j.charles031290@gmail.com','a',0,NULL,'2021-04-01 15:19:02',NULL),
(44,'aaa','Pierre','Administration','tata@yoyo.com','a',0,NULL,'2021-04-01 15:22:23',NULL),
(50,'aaa','Paul','Maintenance','a@a','$2y$10$DnkoihcUdm.hOb9Y2Rw2Je4LWAlvbc9eLpXTtvblSp0V8O7M6Qfc.',0,NULL,'2021-04-01 16:12:24',NULL),
(51,'Charles','Julien','Stagiaire','toto@tata.com','$2y$10$lUbMbjuen86dq7fxGLQbnOGkt0mF25WlWjW5zy0gsE/Jpb17JgdVW',1,'2021-04-23 16:12:34','2021-04-14 14:18:28',NULL),
(52,'GIBAND','Julien','Direction','julien.giband@ahpc-services.com','$2y$10$X8mz.dH4YDH3EuBYicXtFuMTADtOkjISUe8j/UAUeBDuhFuW5MkhG',0,NULL,'2021-04-15 15:12:56','2021-04-20 14:34:44'),
(56,'Charles','Julien','Stagiaire','toto@toto.com','$2b$10$4Sqfor38FGNoF7gTcK2lNePwURJk8yUl/b7xdpd2QGxFRsCQYgvVS',1,'2021-06-03 08:08:13','2021-04-27 07:33:36',NULL),
(64,'Charles','Julien','Informatique','j.charles@groupomania.fr','$2b$10$2kg955vqsFKAyIHf9pLPR.bJZTtjtE4.wt4Iwdu6MLZJTaps2cMXe',0,NULL,'2021-06-23 17:02:13',NULL),
(66,'Dupont','Théo','Ressources Humaines','admin@groupomania.fr','$2b$10$SP9h6NveHvnzUHLICj18yuk.YHpF9m8byAEsufbGEu.oHC8zJY/yq',0,NULL,'2021-06-24 14:00:52',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
