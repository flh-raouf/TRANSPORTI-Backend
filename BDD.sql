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
-- Table structure for table `camion`
--

DROP TABLE IF EXISTS `camion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camion` (
  `camion_id` varchar(128) NOT NULL,
  `num_carte_grise` bigint DEFAULT NULL,
  `num_control_tech_vehicule` int DEFAULT NULL,
  `date_control_tech_vehicule` varchar(30) DEFAULT NULL,
  `num_control_tech_citerne` int DEFAULT NULL,
  `date_control_tech_citerne` varchar(30) DEFAULT NULL,
  `type_vehicule` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`camion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chaffeur`
--

DROP TABLE IF EXISTS `chaffeur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chaffeur` (
  `chaffeur_id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `num_attestation` bigint DEFAULT NULL,
  `num_brevet_marchendise` bigint DEFAULT NULL,
  `num_brevet_metiere_dangeureuse` bigint DEFAULT NULL,
  `camion_id` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`chaffeur_id`),
  KEY `camion_id` (`camion_id`),
  CONSTRAINT `chaffeur_ibfk_1` FOREIGN KEY (`camion_id`) REFERENCES `camion` (`camion_id`)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2024-06-13  3:58:40
