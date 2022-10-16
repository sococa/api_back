-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 18 mai 2022 à 14:29
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `desmettre-maxime-canin`
--

-- --------------------------------------------------------

--
-- Structure de la table `customer_feedback`
--

DROP TABLE IF EXISTS `customer_feedback`;
CREATE TABLE IF NOT EXISTS `customer_feedback` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `note` int(1) NOT NULL,
  `dog_name` varchar(25) NOT NULL,
  `user_phone` varchar(25) NOT NULL,
  `user_firstname` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dog_name` (`dog_name`),
  KEY `user_email` (`user_phone`),
  KEY `user_firstname` (`user_firstname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `customer_feedback`
--

INSERT INTO `customer_feedback` (`id`, `comment`, `note`, `dog_name`, `user_phone`, `user_firstname`) VALUES
(4, 'Maximé es un bueno educador. Notré cono de chien es métamorfosado', 4, 'polluxito', '0603174244', 'Pedro');

-- --------------------------------------------------------

--
-- Structure de la table `dogs`
--

DROP TABLE IF EXISTS `dogs`;
CREATE TABLE IF NOT EXISTS `dogs` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `dog_name` varchar(25) NOT NULL,
  `photo` varchar(25) NOT NULL DEFAULT 'dogProfile.jpg',
  `race` varchar(25) NOT NULL,
  `is_educated` bit(1) NOT NULL DEFAULT b'0',
  `user_phone` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_email` (`user_phone`),
  KEY `name` (`dog_name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `dogs`
--

INSERT INTO `dogs` (`id`, `dog_name`, `photo`, `race`, `is_educated`, `user_phone`) VALUES
(21, 'Polluxito', 'polluxito.jpg', 'Caniche', b'1', '0603174244');

-- --------------------------------------------------------

--
-- Structure de la table `dog sitting`
--

DROP TABLE IF EXISTS `dog sitting`;
CREATE TABLE IF NOT EXISTS `dog sitting` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `dog_id` int(10) NOT NULL,
  `dog_name` varchar(25) NOT NULL,
  `user_phone` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `educations`
--

DROP TABLE IF EXISTS `educations`;
CREATE TABLE IF NOT EXISTS `educations` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `problem_description` text NOT NULL,
  `solutions` text NOT NULL,
  `date` date DEFAULT NULL,
  `duration` varchar(10) DEFAULT NULL,
  `dog_name` varchar(25) NOT NULL DEFAULT 'Chien non enregistré',
  `user_phone` varchar(25) NOT NULL DEFAULT 'Chien non enregistré',
  `customer_feedback_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dog_name` (`dog_name`),
  KEY `user_phone` (`user_phone`),
  KEY `customer_feedback_id` (`customer_feedback_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `educations`
--

INSERT INTO `educations` (`id`, `problem_description`, `solutions`, `date`, `duration`, `dog_name`, `user_phone`, `customer_feedback_id`) VALUES
(6, 'Un chien agressif', 'Je l\'ai tapé pendant 4 heures', '2022-05-03', '4h00', 'polluxito', '0603174244', NULL),
(7, 'Un chien dépressif', 'Je lui ai donné de l\'amour pendant 8 heures', '2022-05-03', '8h00', 'polluxito', '0603174244', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `tips`
--

DROP TABLE IF EXISTS `tips`;
CREATE TABLE IF NOT EXISTS `tips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tips`
--

INSERT INTO `tips` (`id`, `title`, `content`) VALUES
(1, 'un premier conseil', 'un second conseil un second conseil un second conseil un second conseil un second conseil un second conseil un second conseil un second conseil un second conseil un second conseil un second conseil un second conseil');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  `email` varchar(250) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `password` text NOT NULL,
  `creation_timestamp` datetime DEFAULT NULL,
  `connexion_timestamp` datetime DEFAULT NULL,
  `key_id` varchar(90) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `phone` (`phone`),
  KEY `first_name` (`first_name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `role`, `email`, `phone`, `password`, `creation_timestamp`, `connexion_timestamp`, `key_id`) VALUES
(4, 'Pedro', 'Carlito', 'user', 'pedro@gmail.com', '0603174244', '$2b$10$ZwXHR1XqaztqSJAwqu/cNuUam0wXwIR5i8NYwLrOLstvXUQmhiJm2', '2022-05-03 11:25:46', '2022-05-03 11:25:46', ''),
(5, 'Jean', 'Lassalle', 'user', 'Jeannot@gmail.com', '0606060606', '$2b$10$VDdKWNjLAMqABI.J2QCjtOJ1OEIe2qPMXEieBh.GT/iK2GmYK3T4S', '2022-05-06 10:26:52', '2022-05-06 10:26:52', ''),
(7, 'Jacques', 'Attali', 'user', 'jacky@gmail.com', '6666666666', '$2b$10$huJFbxxLAcwkWfwqe.EO1OzinLx7xMaheMgnlddr2Jm3mS/H9tYpm', '2022-05-06 13:13:28', '2022-05-06 13:13:28', ''),
(9, 'Robert', 'Faurisson', 'user', 'shoah@gmail.com', '0606000000', '$2b$10$iLFaNnzcOqUIWqJO8Jvtn.wVFtquVktK0lppkPH3A2BYGPaSg8Z1C', '2022-05-06 17:45:18', '2022-05-06 17:45:18', 'XPwfAlQeqxHDSwTAFQrivwQzz3wvhO'),
(10, 'troudu', 'cul', 'user', 'tdc@gmail.com', '0611223344', '$2b$10$QOlgTMzsl9x.it64MVNA4evQPKTXhTt4dWBl7YclLz16rS7Zo4FyS', '2022-05-06 18:37:09', '2022-05-06 18:37:09', 'DxRoiFzmLa6veCPKEvCSNmWvd0MH7G'),
(11, 'Kim', 'Kardashian', 'user', 'kimi@gmail.com', '0600000000', '$2b$10$E.95sG04ULrkfVAoYO3yAO7mv7VoIBvgU7VKIOeQITmrmEJrcxwZG', '2022-05-07 11:18:48', '2022-05-07 11:18:48', 'cHB1YkBS4sgBNpmT2Wgs9AeY4BJc2q'),
(17, 'Jean-Michel', 'Trogneux', 'user', 'realman@gmail.com', '0611223344', '$2b$10$pUMFJPQeD8ZbmWHuVNSyIeGTlIzAJRuQr0PtiF/C0fEDlY4L5b7zq', '2022-05-11 10:59:58', '2022-05-11 10:59:58', 'w3DVieDBl8JCekkFgjd8ABEMzj5YxD'),
(18, 'Pierre', 'Carlier', 'user', 'tduc@gmail.com', '0611223344', '$2b$10$rO0M94lPK7T58t1nFIexeuc2hARx/qA676713G9q8L.xXTH8fEALK', '2022-05-11 11:01:20', '2022-05-11 11:01:20', 'TQ8KduicXmyJmEUjntbLTq0j3BXdZl'),
(21, 'Ippo', 'Makunouchi', 'user', 'ippo@gmail.com', '0603174143', '$2b$10$w7AYag/eL/zzloCjnXbTrOOdgYYnR/bG.2QUHytpYs96vrlYx.w8W', '2022-05-11 11:11:42', '2022-05-11 11:11:42', 'sKJUlLDPPAYsOAHKb325JjKFyyBBp8'),
(22, 'Pierre', 'Carliero', 'user', 'carler-pierre@laposte.net', '0603174143', '$2b$10$Nf2j5CCTvnh.Dg9k0kKLre1dvCAPtRaaiS.TEpMD7OFFXwR01OWhK', '2022-05-11 14:36:52', '2022-05-11 14:36:52', 'boGleACS3kDdUe1723Rltv6i2yDKon'),
(24, 'Pierre', 'Carlier', 'admin', 'pierrocarlier@gmail.com', '0603174143', '$2b$10$F4UleRD5c0V3H8q.H5wzAOue2BUPQplNfMtgqywJNAKa.1AX8Tv76', '2022-05-12 13:31:57', '2022-05-12 13:31:57', 'KzYWeTsZlkBFu0GkKt1yJGr6iC52we'),
(25, 'Pierre', 'Carlier', 'user', 'carlier-pierre@laposte.net', '0603174143', '$2b$10$EeHrjenRI7d7UBk28OyZEeHyPHfrJkO5YZ2fcOWahnNVm/3KxU8tO', '2022-05-16 16:14:28', '2022-05-16 16:14:28', 'QBWebPwJIiyKzZe2VtckxSvgzEzGTy'),
(26, 'Pierre', 'Carlier', 'user', 'lol@laposte.net', '0603174143', '$2b$10$wJ92Tb77UZqVWswBxsk1B.B0fjWpEd7bFjGaPaWwdy25TmPsuEfOK', '2022-05-16 16:14:56', '2022-05-16 16:14:56', 'LRd2HVpfvNRRSvKgUbNyc1eikWQSuq'),
(27, 'jonnhy', 'cadillac', 'user', 'cadillac@gmail.com', '0601020304', '$2b$10$FPgNnMeDXpHA67hL2MXEiuWRPjAVZ/6XVjcgsQ6l.6Y6NaSZG/CbG', '2022-05-17 12:19:06', '2022-05-17 12:19:06', 'tPDCCYz4yRbvY7wmuj6DfNqJ3lU6q8');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `customer_feedback`
--
ALTER TABLE `customer_feedback`
  ADD CONSTRAINT `customer_feedback_ibfk_1` FOREIGN KEY (`dog_name`) REFERENCES `dogs` (`dog_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_feedback_ibfk_2` FOREIGN KEY (`user_phone`) REFERENCES `users` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_feedback_ibfk_3` FOREIGN KEY (`user_firstname`) REFERENCES `users` (`first_name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `dogs`
--
ALTER TABLE `dogs`
  ADD CONSTRAINT `dogs_ibfk_1` FOREIGN KEY (`user_phone`) REFERENCES `users` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `educations`
--
ALTER TABLE `educations`
  ADD CONSTRAINT `educations_ibfk_1` FOREIGN KEY (`dog_name`) REFERENCES `dogs` (`dog_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `educations_ibfk_2` FOREIGN KEY (`user_phone`) REFERENCES `users` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `educations_ibfk_3` FOREIGN KEY (`customer_feedback_id`) REFERENCES `customer_feedback` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
