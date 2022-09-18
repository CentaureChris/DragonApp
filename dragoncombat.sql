-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : dim. 18 sep. 2022 à 20:50
-- Version du serveur :  5.7.34
-- Version de PHP : 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dragoncombat`
--

-- --------------------------------------------------------

--
-- Structure de la table `avatar`
--

CREATE TABLE `avatar` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `avatar`
--

INSERT INTO `avatar` (`id`, `image`) VALUES
(1, 'dragonChinois.jpeg'),
(2, 'dragonelectrique.png'),
(3, 'dragonNoir.jpeg'),
(4, 'dragonRouge.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `dragon`
--

CREATE TABLE `dragon` (
  `id` int(25) NOT NULL,
  `avatar` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `level` int(25) NOT NULL,
  `attack` int(25) NOT NULL,
  `defense` int(25) NOT NULL,
  `slip` int(25) NOT NULL,
  `rider` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `dragon`
--

INSERT INTO `dragon` (`id`, `avatar`, `name`, `level`, `attack`, `defense`, `slip`, `rider`) VALUES
(1, 2, 'Caraxes', 1, 5, 12, 4, 1),
(2, 1, 'Drogon', 2, 20, 20, 4, 1),
(5, 4, 'Vyserion', 1, 3, 2, 1, 8),
(9, 1, 'test', 1, 3, 2, 1, 8),
(10, 3, 'new Dragon', 1, 3, 2, 1, 9),
(11, 1, 'raegon', 1, 3, 2, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `dragon_id` int(11) NOT NULL,
  `object_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `equipment`
--

INSERT INTO `equipment` (`id`, `dragon_id`, `object_id`) VALUES
(5, 2, 2),
(6, 5, 1),
(8, 2, 4),
(43, 1, 3),
(44, 1, 1),
(45, 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `object`
--

CREATE TABLE `object` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `attack` int(11) NOT NULL,
  `defense` int(11) NOT NULL,
  `slip` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `object`
--

INSERT INTO `object` (`id`, `name`, `image`, `type`, `attack`, `defense`, `slip`) VALUES
(1, 'Destiny Armor ', 'destinyarmor.webp', 'armor', 2, 4, 0),
(2, 'Iron claws', 'claws.webp', 'attack', 5, 1, 1),
(3, 'Strong Fire', 'fireball.jpeg', 'attack', 4, 0, 1),
(4, 'Lightning Armor ', 'lightningarmor.webp', 'armor', 1, 5, 0);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `login`, `password`) VALUES
(1, 'chris', 'pass'),
(8, 'user', 'password'),
(9, 'user2', 'password');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avatar`
--
ALTER TABLE `avatar`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `dragon`
--
ALTER TABLE `dragon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rider` (`rider`),
  ADD KEY `fk_avatar` (`avatar`);

--
-- Index pour la table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_dragon2object` (`dragon_id`),
  ADD KEY `fk_object2dragon` (`object_id`);

--
-- Index pour la table `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avatar`
--
ALTER TABLE `avatar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `dragon`
--
ALTER TABLE `dragon`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `object`
--
ALTER TABLE `object`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `dragon`
--
ALTER TABLE `dragon`
  ADD CONSTRAINT `fk_avatar` FOREIGN KEY (`avatar`) REFERENCES `avatar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rider` FOREIGN KEY (`rider`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `fk_dragon2object` FOREIGN KEY (`dragon_id`) REFERENCES `dragon` (`id`),
  ADD CONSTRAINT `fk_object2dragon` FOREIGN KEY (`object_id`) REFERENCES `object` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
