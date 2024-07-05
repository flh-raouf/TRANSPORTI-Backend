-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pfechakibdb
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accident_table`
--

DROP TABLE IF EXISTS `accident_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accident_table` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `gravite_accident` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `accident_date` date NOT NULL,
  `accident_time` time NOT NULL,
  `barage_id` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_accident_barage` (`barage_id`),
  CONSTRAINT `fk_accident_barage` FOREIGN KEY (`barage_id`) REFERENCES `barage_table` (`barage_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `barage_table`
--

DROP TABLE IF EXISTS `barage_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barage_table` (
  `barage_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `camion`
--

DROP TABLE IF EXISTS `camion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camion` (
  `camion_id` varchar(128) NOT NULL,
  `num_carte_grise` bigint DEFAULT NULL,
  `type_camion` varchar(50) NOT NULL,
  `num_ctrl_tech_camion` int NOT NULL,
  `date_ctrl_tech_camion` date NOT NULL,
  `entreprise_id` varchar(255) NOT NULL,
  PRIMARY KEY (`camion_id`),
  KEY `fk_camion_entreprise` (`entreprise_id`),
  CONSTRAINT `fk_camion_entreprise` FOREIGN KEY (`entreprise_id`) REFERENCES `entreprise_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chauffeur`
--

DROP TABLE IF EXISTS `chauffeur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chauffeur` (
  `chaffeur_id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `prenom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `num_attestation` varchar(255) NOT NULL,
  `num_brevet_matiere_dangeureuse` varchar(255) NOT NULL,
  `photo_conducteur` varchar(255) DEFAULT NULL,
  `source` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `destination` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date_heure_sortie` datetime DEFAULT NULL,
  `date_heure_arrive_prevu` datetime NOT NULL,
  `camion_id` varchar(128) NOT NULL,
  PRIMARY KEY (`chaffeur_id`),
  KEY `fk_chauffeur_camion` (`camion_id`),
  CONSTRAINT `fk_chauffeur_camion` FOREIGN KEY (`camion_id`) REFERENCES `camion` (`camion_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `entreprise_table`
--

DROP TABLE IF EXISTS `entreprise_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entreprise_table` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `matiere`
--

DROP TABLE IF EXISTS `matiere`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matiere` (
  `matiere_id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `class` varchar(255) DEFAULT NULL,
  `pictogramme` varchar(255) DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `code_classification` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `quantite` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `grp_emballage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `code_restriction_tunnel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `code_danger` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `num_onu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `num_ctrl_tech_citerne` int NOT NULL,
  `date_ctrl_tech_citerne` date NOT NULL,
  `num_assurance_citerne` int NOT NULL,
  `date_assurance_citerne` date NOT NULL,
  `camion_id` varchar(128) NOT NULL,
  PRIMARY KEY (`matiere_id`),
  KEY `fk_matiere_camion` (`camion_id`),
  CONSTRAINT `fk_matiere_camion` FOREIGN KEY (`camion_id`) REFERENCES `camion` (`camion_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `qr_code`
--

DROP TABLE IF EXISTS `qr_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qr_code` (
  `qrcode_id` int NOT NULL AUTO_INCREMENT,
  `qrcode_img` varchar(255) DEFAULT NULL,
  `camion_id` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`qrcode_id`),
  KEY `fk_qr_code_camion` (`camion_id`),
  CONSTRAINT `fk_qr_code_camion` FOREIGN KEY (`camion_id`) REFERENCES `camion` (`camion_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'pfechakibdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-05 23:28:22
