CREATE DATABASE pfechakibdb;

USE pfechakibdb;

DROP TABLE IF EXISTS `accident_table`;
CREATE TABLE `accident_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gravite_accident` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `barage_id` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `barage_id` (`barage_id`),
  CONSTRAINT `accident_table_ibfk_1` FOREIGN KEY (`barage_id`) REFERENCES `barage_table` (`barage_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `barage_table`;
CREATE TABLE `barage_table` (
  `barage_id` varchar(30) NOT NULL,
  `password` varchar(256) DEFAULT NULL,
  `City` varchar(30) DEFAULT NULL,
  `freq_accid` varchar(30) DEFAULT NULL,
  `gravite_accid` varchar(30) DEFAULT NULL,
  `type_route` varchar(30) DEFAULT NULL,
  `meteo` varchar(255) DEFAULT NULL,
  `etat_route` varchar(30) DEFAULT NULL,
  `densite_habitation` varchar(255) DEFAULT NULL,
  `infra_critiques_sites_sensibles` varchar(255) DEFAULT NULL,
  `types_zones_env` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`barage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `camion`;
CREATE TABLE `camion` (
  `camion_id` varchar(128) NOT NULL,
  `num_carte_grise` bigint DEFAULT NULL,
  `num_control_tech_vehicule` int DEFAULT NULL,
  `date_control_tech_vehicule` varchar(30) DEFAULT NULL,
  `num_control_tech_citerne` int DEFAULT NULL,
  `date_control_tech_citerne` varchar(30) DEFAULT NULL,
  `type_vehicule` varchar(255) DEFAULT NULL,
  `entreprise_id` varchar(255) NOT NULL,
  PRIMARY KEY (`camion_id`),
  KEY `entreprise_id` (`entreprise_id`),
  CONSTRAINT `camion_ibfk_1` FOREIGN KEY (`entreprise_id`) REFERENCES `entreprise_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `chauffeur`;
CREATE TABLE `chauffeur` (
  `chaffeur_id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `num_attestation` bigint DEFAULT NULL,
  `num_brevet_marchendise` bigint DEFAULT NULL,
  `num_brevet_metiere_dangeureuse` bigint DEFAULT NULL,
  `camion_id` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`chaffeur_id`),
  KEY `camion_id` (`camion_id`),
  CONSTRAINT `chauffeur_ibfk_1` FOREIGN KEY (`camion_id`) REFERENCES `camion` (`camion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `entreprise_table`;
CREATE TABLE `entreprise_table` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` longblob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `matiere`;
CREATE TABLE `matiere` (
  `matiere_id` int NOT NULL AUTO_INCREMENT,
  `class` varchar(255) DEFAULT NULL,
  `pectorgramme` blob,
  `code_classification` varchar(255) DEFAULT NULL,
  `grp_emballage` varchar(255) DEFAULT NULL,
  `qt_lim_excepte` varchar(255) DEFAULT NULL,
  `code_restriction` varchar(255) DEFAULT NULL,
  `num_auth_produit` blob,
  `inst_emballage` varchar(255) DEFAULT NULL,
  `inst_special` varchar(255) DEFAULT NULL,
  `code_citerne` varchar(255) DEFAULT NULL,
  `camion_id` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`matiere_id`),
  KEY `camion_id` (`camion_id`),
  CONSTRAINT `matiere_ibfk_1` FOREIGN KEY (`camion_id`) REFERENCES `camion` (`camion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `qr_code`;
CREATE TABLE `qr_code` (
  `qrcode_id` int NOT NULL AUTO_INCREMENT,
  `qrcode_img` blob,
  `camion_id` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`qrcode_id`),
  KEY `camion_id` (`camion_id`),
  CONSTRAINT `qr_code_ibfk_1` FOREIGN KEY (`camion_id`) REFERENCES `camion` (`camion_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
