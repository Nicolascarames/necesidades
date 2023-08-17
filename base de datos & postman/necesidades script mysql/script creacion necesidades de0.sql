CREATE DATABASE  IF NOT EXISTS `necesidades`;
USE `necesidades`;

DROP TABLE IF EXISTS `mensajes_privados`;
DROP TABLE IF EXISTS `likes_servicios`;
DROP TABLE IF EXISTS `likes_comentarios`;
DROP TABLE IF EXISTS `comentarios`;
DROP TABLE IF EXISTS `servicios`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `biografia` mediumtext,
  `avatar` varchar(255) DEFAULT 'null',
  `pwd` varchar(255) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '0',
  `role` varchar(45) DEFAULT 'user',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint DEFAULT '0',
  `act_code` varchar(45) DEFAULT 'null',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

CREATE TABLE `servicios` (
  `idservicios` int unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `descripcion` longtext NOT NULL,
  `fichero` varchar(150) DEFAULT 'null',
  `users_id` int unsigned NOT NULL,
  `finalizado` tinyint DEFAULT '0',
  `fecha` varchar(45) DEFAULT 'null',
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `hashtag1` varchar(45) DEFAULT 'null',
  `hashtag2` varchar(45) DEFAULT 'null',
  `hashtag3` varchar(45) DEFAULT 'null',
  `hashtag4` varchar(45) DEFAULT 'null',
  `hashtag5` varchar(45) DEFAULT 'null',
  PRIMARY KEY (`idservicios`),
  UNIQUE KEY `idservicios_UNIQUE` (`idservicios`),
  KEY `servicios_users_idx` (`users_id`),
  CONSTRAINT `servicios_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `comentarios` (
  `idcomentarios` int unsigned NOT NULL AUTO_INCREMENT,
  `comentario` longtext NOT NULL,
  `fichero_comentario` varchar(150) DEFAULT 'null',
  `users_id` int unsigned NOT NULL,
  `servicios_id` int unsigned NOT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `mejor_comentario` tinyint DEFAULT '0',
  PRIMARY KEY (`idcomentarios`),
  UNIQUE KEY `idcomentarios_UNIQUE` (`idcomentarios`),
  KEY `comentarios_users_idx` (`users_id`),
  KEY `comentarios_servicios_idx` (`servicios_id`),
  CONSTRAINT `comentarios_servicios` FOREIGN KEY (`servicios_id`) REFERENCES `servicios` (`idservicios`),
  CONSTRAINT `comentarios_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `mensajes_privados` (
  `idmensajes_privados` int unsigned NOT NULL AUTO_INCREMENT,
  `mensaje` mediumtext NOT NULL,
  `users_id` int unsigned NOT NULL,
  `to_user` int unsigned NOT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `owner_id` int unsigned NOT NULL,
  PRIMARY KEY (`idmensajes_privados`),
  KEY `mensajesPrivados_users_idx` (`users_id`),
  CONSTRAINT `mensajesPrivados_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `likes_servicios` (
  `idlikes` int unsigned NOT NULL AUTO_INCREMENT,
  `megusta` tinyint DEFAULT '0',
  `servicios_id` int unsigned NOT NULL,
  `users_id` int unsigned NOT NULL,
  PRIMARY KEY (`idlikes`),
  KEY `likesservicios_users_idx` (`users_id`),
  KEY `likesservicios_servicios_idx` (`servicios_id`),
  CONSTRAINT `likesservicios_servicios` FOREIGN KEY (`servicios_id`) REFERENCES `servicios` (`idservicios`),
  CONSTRAINT `likesservicios_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `likes_comentarios` (
  `idlikes` int NOT NULL AUTO_INCREMENT,
  `megusta` tinyint DEFAULT '0',
  `users_id` int unsigned NOT NULL,
  `comentarios_id` int unsigned NOT NULL,
  `servicios_id` int DEFAULT NULL,
  PRIMARY KEY (`idlikes`),
  KEY `likescomentarios_users_idx` (`users_id`),
  KEY `likescomentarios_comentarios_idx` (`comentarios_id`),
  CONSTRAINT `likescomentarios_comentarios` FOREIGN KEY (`comentarios_id`) REFERENCES `comentarios` (`idcomentarios`),
  CONSTRAINT `likescomentarios_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
);