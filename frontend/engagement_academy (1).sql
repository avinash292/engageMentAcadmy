-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 30, 2024 at 10:42 AM
-- Server version: 8.0.39-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `engagement_academy`
--

-- --------------------------------------------------------

--
-- Table structure for table `call_details`
--

CREATE TABLE `call_details` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `call_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `assistant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `org_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `campaign_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `call_details`
--

INSERT INTO `call_details` (`id`, `name`, `number`, `call_id`, `assistant_id`, `phone_number_id`, `org_id`, `campaign_id`, `created_at`, `updated_at`) VALUES
(1, 'Aditya Sharma', '+918896507952', '00101f86-8b44-4225-a550-43c4cc9f4542', '67d1148e-97df-4c7c-acba-c82a643d120a', '85f33cf2-8033-4b9b-97bf-f5e8e665cd63', '7791abff-61d0-404c-8c86-14bbe011b5b5', 3, '2024-06-06 06:59:47', '2024-06-06 06:59:48'),
(2, 'Sumeena Rakwal', '+919455963581', 'b270d1f9-4477-4217-af91-5a4385ddf066', '67d1148e-97df-4c7c-acba-c82a643d120a', '85f33cf2-8033-4b9b-97bf-f5e8e665cd63', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-06-06 06:59:49', '2024-06-06 06:59:50'),
(3, 'Aditya Sharma', '+918896507952', '17ea770d-53fa-415a-a5d4-48d93d931518', '67d1148e-97df-4c7c-acba-c82a643d120a', '85f33cf2-8033-4b9b-97bf-f5e8e665cd63', '7791abff-61d0-404c-8c86-14bbe011b5b5', 3, '2024-06-07 10:21:14', '2024-06-07 10:21:15'),
(4, 'Sumeena Rakwal', '+919455963581', '5f72503b-e651-4a9b-8384-0d6c3c527294', '67d1148e-97df-4c7c-acba-c82a643d120a', '85f33cf2-8033-4b9b-97bf-f5e8e665cd63', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-06-07 10:21:22', '2024-06-07 10:21:23'),
(5, 'avinash', '+919455963581', '900c1f22-8a83-4ca8-85c2-bfa20cc77407', '0dc32dcb-7f33-4b64-b516-f3a7000482c6', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-06-14 10:24:35', '2024-06-14 10:24:35'),
(6, 'avinash', '+919455963581', '0596e95d-c1aa-4792-9330-a788117f012e', '0dc32dcb-7f33-4b64-b516-f3a7000482c6', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-06-14 11:23:31', '2024-06-14 11:23:32'),
(7, 'avinash', '+919455963581', 'c8aadc39-f815-4e57-9236-d5fe42e7d413', '0dc32dcb-7f33-4b64-b516-f3a7000482c6', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-06-14 11:25:10', '2024-06-14 11:25:11'),
(8, 'avinash', '+919455963581', '84df9f2e-e5fa-46a7-a199-0a9a1141b90f', '0dc32dcb-7f33-4b64-b516-f3a7000482c6', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-06-14 11:26:06', '2024-06-14 11:26:07'),
(9, 'avinash', '+919455963581', 'fe0d7658-aad4-4b7a-ac97-14bd4e3d5fe9', '0dc32dcb-7f33-4b64-b516-f3a7000482c6', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-06-14 11:29:45', '2024-06-14 11:29:45'),
(10, 'avinash pandey', '+919455963581', '61d76235-3ffd-4072-8a4b-93103fc89c3a', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-02 14:42:31', '2024-09-02 14:42:32'),
(11, 'avinash pandey', '+919455963581', '431bd8d1-fd0c-4fa3-b8ee-aed32b0a5875', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-02 14:48:07', '2024-09-02 14:48:08'),
(12, 'Vikas Goyal', '+918437405304', '91666555-26ce-4819-b5c6-a2058755fe92', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-02 14:48:13', '2024-09-02 14:48:14'),
(13, 'avinash pandey', '+919455963581', 'ca5d8157-f3d5-4f4e-acb8-fdc33d2b87bb', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-03 05:44:16', '2024-09-03 05:44:17'),
(14, 'avinash pandey', '+919455963581', 'e5d48cb3-9725-43a8-aeda-c316a7cb8387', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-03 05:46:25', '2024-09-03 05:46:25'),
(15, 'avinash pandey', '+919455963581', '9cf1ba05-cb06-4452-8bd6-cabde06e3b19', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-03 06:00:36', '2024-09-03 06:00:37'),
(16, 'avinash pandey', '+919455963581', '06a17eb8-5089-436c-91f7-c3a61ca51c5e', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-03 10:00:39', '2024-09-03 10:00:40'),
(17, 'Australian 2', '61402229661', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 9, '2024-09-03 10:01:49', '2024-09-03 10:01:49'),
(18, 'Australian 2', '+61402229661', '9dc162e6-4948-457c-af79-1756887e66bd', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:01:54', '2024-09-03 10:01:55'),
(19, 'avinash pandey', '+919455963581', '0064184a-d1cf-414e-81e8-416f2215c389', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-03 10:02:01', '2024-09-03 10:02:02'),
(20, 'Vikas Goyal', '+918437405304', '2f24994f-3063-485b-93a0-cf1d337aecf3', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:02:07', '2024-09-03 10:02:08'),
(21, 'Australian 2', '61402229661', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 9, '2024-09-03 10:06:03', '2024-09-03 10:06:03'),
(22, 'Australian 2', '+61402229661', '6033454f-92ba-4b93-996c-28358d103776', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:06:08', '2024-09-03 10:06:09'),
(23, 'avinash pandey', '+919455963581', 'f87c1bfc-488b-4231-84b6-ccf44f24244b', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-03 10:06:15', '2024-09-03 10:06:16'),
(24, 'Vikas Goyal', '+918437405304', 'b2411973-720a-40d3-80d2-85583026104a', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:06:21', '2024-09-03 10:06:22'),
(25, 'Australian 2', '61402229661', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 9, '2024-09-03 10:29:35', '2024-09-03 10:29:35'),
(26, 'avinash pandey', '+919455963581', '38db28ff-9785-4603-aaa1-c1dfd449e810', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-03 10:29:40', '2024-09-03 10:29:41'),
(27, 'Australian 2', '61402229661', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 9, '2024-09-03 10:33:44', '2024-09-03 10:33:44'),
(28, 'avinash pandey', '+919455963581', '977a57d5-1784-4a27-8796-6a6d12d91b3a', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-03 10:33:49', '2024-09-03 10:33:50'),
(29, 'Patricia D. Martinez', '647 271 1675', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 10, '2024-09-03 10:48:17', '2024-09-03 10:48:17'),
(30, 'Vikas', '+918437405304', 'b9c2e1ba-3267-471e-81ea-1f3028079b0c', '50d1f04f-899d-46bc-97c4-d1017af0a30f', '85f33cf2-8033-4b9b-97bf-f5e8e665cd63', '7791abff-61d0-404c-8c86-14bbe011b5b5', 10, '2024-09-03 10:48:23', '2024-09-03 10:48:24'),
(31, 'Australian 2', '61402229661', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 9, '2024-09-04 12:28:00', '2024-09-04 12:28:00'),
(32, 'avinash pandey', '+919455963581', 'f2edfccc-09e0-4df6-975c-b550bc3ceb86', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 13, '2024-09-04 12:28:05', '2024-09-04 12:28:06');

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` int NOT NULL,
  `campaign_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `caller_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `calls_per_minute` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `campaign_status` tinyint(1) DEFAULT NULL,
  `daily_end_time` datetime DEFAULT NULL,
  `daily_start_time` datetime DEFAULT NULL,
  `days_of_week` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `dnc_list` tinyint(1) DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `internal_notes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `selected_contact_lists` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_lists_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `selected_user_list` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_user_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `time_zone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vapi_agent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `campaign_name`, `caller_id`, `calls_per_minute`, `campaign_status`, `daily_end_time`, `daily_start_time`, `days_of_week`, `dnc_list`, `end_date`, `internal_notes`, `selected_contact_lists`, `contact_lists_id`, `selected_user_list`, `contact_user_id`, `start_date`, `time_zone`, `vapi_agent`, `created_at`, `updated_at`) VALUES
(11, 'test', '{\"id\":\"7cefed1e-d623-419d-b986-63341811527e\",\"name\":\"+14158557949\"}', '', 0, '2024-07-12 17:35:00', '2024-07-12 08:30:00', '\"[\\\"Mon\\\",\\\"Tue\\\",\\\"Wed\\\",\\\"Thu\\\",\\\"Fri\\\",\\\"Sat\\\",\\\"Sun\\\"]\"', 0, '2024-07-12 18:30:00', 'testing', '{\"id\":9,\"name\":\"testing 1\"}', '9', '{\"id\":\"10\",\"name\":\"devtestavinash pandey\"}', '10', '2024-07-11 18:30:00', '{\"friendlyName\":\"Africa/Malabo (UTC+01:00)\",\"longTimezones\":\"Africa/Malabo\"}', '{\"id\":\"50d1f04f-899d-46bc-97c4-d1017af0a30f\",\"name\":\"240522 susan - 2\"}', '2024-07-12 11:59:16', '2024-07-12 11:59:16'),
(12, 'TEST 121', '{\"id\":\"85f33cf2-8033-4b9b-97bf-f5e8e665cd63\",\"name\":\"+16468600663\"}', '', 0, '2024-08-09 22:00:00', '2024-08-09 13:00:00', '\"[\\\"Mon\\\",\\\"Tue\\\",\\\"Wed\\\",\\\"Thu\\\",\\\"Fri\\\",\\\"Sat\\\",\\\"Sun\\\"]\"', 0, '2024-08-09 06:00:00', 'TEST', '{\"id\":10,\"name\":\"TEST\"}', '10', '{\"id\":\"29\",\"name\":\"Carolyne Rattle TEST\"}', '29', '2024-08-09 06:00:00', '{\"friendlyName\":\"US/Mountain (UTC-06:00)\",\"longTimezones\":\"US/Mountain\"}', '{\"id\":\"57873eee-bf0d-4f0b-843f-eb0f026ea317\",\"name\":\"240522 susan new\"}', '2024-08-09 17:42:44', '2024-08-09 17:42:44'),
(13, 'New testing campaign', '{\"id\":\"85f33cf2-8033-4b9b-97bf-f5e8e665cd63\",\"name\":\"+16468600663\"}', '20', 1, '2024-09-02 17:25:00', '2024-09-02 06:30:00', '\"[\\\"Mon\\\",\\\"Tue\\\",\\\"Wed\\\",\\\"Thu\\\",\\\"Fri\\\",\\\"Sat\\\",\\\"Sun\\\"]\"', 1, '2025-02-27 18:30:00', 'Testing purpose', '{\"id\":8,\"name\":\"rakwal test 1\"}', '8', '{\"id\":\"25\",\"name\":\"Rakwal Client\"}', '25', '2024-12-23 18:30:00', '{\"friendlyName\":\"Asia/Kolkata (UTC+05:30)\",\"longTimezones\":\"Asia/Kolkata\"}', '{\"id\":\"806fd459-64aa-4f61-a4b4-0f2a7ba20c1c\",\"name\":\"New Assistant\"}', '2024-09-02 14:41:04', '2024-12-30 10:30:41');

-- --------------------------------------------------------

--
-- Table structure for table `contact_lists`
--

CREATE TABLE `contact_lists` (
  `contact_list_id` int NOT NULL,
  `list_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `leads` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_lists`
--

INSERT INTO `contact_lists` (`contact_list_id`, `list_name`, `description`, `userid`, `leads`, `created_at`, `updated_at`) VALUES
(4, 'last test', 'trsfasf', 11, '\"[]\"', '2024-06-01 08:05:01', '2024-06-01 08:05:01'),
(8, 'rakwal test 1', 'testing', 25, '\"[163]\"', '2024-07-12 11:51:06', '2024-07-12 11:51:06'),
(9, 'testing 1', 'testing.', 10, '\"[140]\"', '2024-07-12 11:57:50', '2024-07-12 11:57:50'),
(10, 'TEST', 'TEST', 29, '\"[143]\"', '2024-08-09 17:40:14', '2024-08-09 17:40:14');

-- --------------------------------------------------------

--
-- Table structure for table `phonenumbers`
--

CREATE TABLE `phonenumbers` (
  `id` int NOT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `country` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_list_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ghl_contact_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phonenumbers`
--

INSERT INTO `phonenumbers` (`id`, `name`, `phone`, `email`, `status`, `userid`, `country`, `contact_list_id`, `ghl_contact_id`, `created_at`, `updated_at`) VALUES
(138, 'Test', '+125454873', 'test@gmail.com', 'wrong Number', 25, NULL, NULL, NULL, '2024-07-12 11:49:23', '2024-07-12 11:49:23'),
(139, 'test1', '+2165465121321', 'test1@gmail.com', 'wrong Number', 25, NULL, NULL, NULL, '2024-07-12 11:50:09', '2024-07-12 11:50:09'),
(140, 'test1', '+215465413216321', NULL, 'wrong Number', 10, NULL, '9', NULL, '2024-07-12 11:57:02', '2024-07-12 11:57:02'),
(142, 'Lead Aug 7', '+919874563210', 'leadaug@yopmail.com', 'mobile', 25, 'IN', NULL, NULL, '2024-08-07 03:42:57', '2024-08-07 03:42:57'),
(143, 'WEISBERGER,MICH', '+13053360604', 'carolyne@247talkai.com', 'mobile', 29, 'US', '10', NULL, '2024-08-09 17:39:52', '2024-08-09 17:39:52'),
(144, 'Canadian 1', '+16476710412', 'testing@gmail.com', 'null', 30, 'CA', '', NULL, '2024-08-19 05:48:41', '2024-08-19 05:48:41'),
(145, 'Canadian 2', '+16478389038', 'testing@gmail.com', 'null', 30, 'CA', '', NULL, '2024-08-19 05:48:41', '2024-08-19 05:48:41'),
(146, 'Canadian 3', '+14379893234', 'testing@gmail.com', 'null', 30, 'CA', '', NULL, '2024-08-19 05:48:41', '2024-08-19 05:48:41'),
(147, 'Australian 1', '+6140222966', 'testing@gmail.com', 'wrong Number', 30, NULL, '', NULL, '2024-08-19 05:48:41', '2024-08-19 05:48:41'),
(148, 'JEFF PULVINO', '+19163088232', 'testing@gmail.com', 'mobile', 30, 'US', '', NULL, '2024-08-19 05:48:41', '2024-08-19 05:48:41'),
(149, 'MALCOLM BROOKS', '+15082870626', NULL, 'mobile', 30, 'US', '', NULL, '2024-08-19 05:48:41', '2024-08-19 05:48:41'),
(150, 'Australian 2', '+61402229661', NULL, 'mobile', 30, 'AU', '', NULL, '2024-08-19 05:48:41', '2024-08-19 05:48:41'),
(151, 'Vikas', '+918437405304', NULL, 'mobile', 30, 'IN', '', NULL, '2024-08-19 05:48:42', '2024-08-19 05:48:42'),
(152, 'SR', '+918146061433', NULL, 'mobile', 30, 'IN', '', NULL, '2024-08-19 05:48:42', '2024-08-19 05:48:42'),
(153, 'Carolyne', '+3053360604', 'cazrattle@gmail.comm', 'wrong Number', 31, NULL, NULL, NULL, '2024-08-20 17:26:44', '2024-08-20 17:26:44'),
(154, 'Carolyne', '+3055555555', 'cazrattle@gmail.com', 'wrong Number', 32, NULL, NULL, NULL, '2024-08-20 17:33:00', '2024-08-20 17:33:00'),
(155, 'Vikas', '16476710423', 'testing10@gmail.com', 'null', 32, 'CA', '', NULL, '2024-08-22 04:30:32', '2024-08-22 04:30:32'),
(156, 'Meena', '14379893243', 'testing30@gmail.com', 'null', 32, 'CA', '', NULL, '2024-08-22 04:30:32', '2024-08-22 04:30:32'),
(157, 'Sumeena', '16478389083', 'testing20@gmail.com', 'null', 32, 'CA', '', NULL, '2024-08-22 04:30:32', '2024-08-22 04:30:32'),
(158, 'MW', '6140222999', 'testing60@gmail.com', 'wrong Number', 32, NULL, '', NULL, '2024-08-22 04:30:32', '2024-08-22 04:30:32'),
(159, 'PEEK,BRIAN', '15082870662', 'testing40@gmail.com', 'mobile', 32, 'US', '', NULL, '2024-08-22 04:30:32', '2024-08-22 04:30:32'),
(160, 'BABYGIRL G', '19163088223', 'testing50@gmail.com', 'mobile', 32, 'US', '', NULL, '2024-08-22 04:30:32', '2024-08-22 04:30:32'),
(161, 'MW', '6140262999', NULL, 'wrong Number', 32, NULL, '', NULL, '2024-08-22 12:35:46', '2024-08-22 12:35:46'),
(162, 'TEST', '+3053360600', 'anava.home57@gmail.com', 'wrong Number', 33, NULL, NULL, NULL, '2024-08-26 17:40:19', '2024-08-26 17:40:19'),
(163, 'avinash', '+919455963581', 'admin@gmail.com', 'mobile', 25, 'IN', '8', NULL, '2024-09-02 14:37:33', '2024-09-02 14:37:33'),
(164, 'Nancy B. Hernandez', '027 2352 273', NULL, 'wrong Number', 35, NULL, '', NULL, '2024-09-05 13:26:30', '2024-09-05 13:26:30'),
(165, 'Mary S. Hernandez', '026 3334 032', 'MarySHernandez@armyspy.com', 'wrong Number', 35, NULL, '', NULL, '2024-09-05 13:26:30', '2024-09-05 13:26:30'),
(166, 'Patricia D. Martinez', '647 271 1675', 'PatriciaDMartinez@jourrapide.com', 'null', 35, 'CA', '', NULL, '2024-09-05 13:26:30', '2024-09-05 13:26:30'),
(167, 'MARC RICHARD', '774 276 1003', 'JohnAAnderson@teleworm.us', 'mobile', 35, 'US', '', NULL, '2024-09-05 13:26:30', '2024-09-05 13:26:30'),
(168, 'Alan A. Lopez', '302 235 7299', 'AlanALopez@armyspy.com', 'mobile', 35, 'US', '', NULL, '2024-09-05 13:26:30', '2024-09-05 13:26:30'),
(169, 'DO,THOI', '720 862 7683', 'CharlotteLDye@teleworm.us', 'mobile', 35, 'US', '', NULL, '2024-09-05 13:26:30', '2024-09-05 13:26:30');

-- --------------------------------------------------------

--
-- Table structure for table `userLogs`
--

CREATE TABLE `userLogs` (
  `id` int NOT NULL,
  `user_type` varchar(120) NOT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_action` varchar(120) DEFAULT NULL,
  `user_action_type` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `source` varchar(20) DEFAULT NULL,
  `total_contact` varchar(50) DEFAULT NULL,
  `uploaded_contact` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `userLogs`
--

INSERT INTO `userLogs` (`id`, `user_type`, `user_id`, `user_name`, `user_action`, `user_action_type`, `name`, `source`, `total_contact`, `uploaded_contact`, `createdAt`, `updatedAt`) VALUES
(1, 'superadmin', '25', 'Rakwal Client', 'Form Contact upload', 'Create Contact', 'Test', 'Form', '1', '1', '2024-07-12 11:49:23', '2024-07-12 11:49:23'),
(2, 'superadmin', '25', 'Rakwal Client', 'Form Contact upload', 'Create Contact', 'test1', 'Form', '1', '1', '2024-07-12 11:50:09', '2024-07-12 11:50:09'),
(3, 'admin', '10', 'devtestavinash pandey', 'Form Contact upload', 'Create Contact', 'test1', 'Form', '1', '1', '2024-07-12 11:57:02', '2024-07-12 11:57:02'),
(4, 'admin', '25', 'Rakwal Client', 'Form Contact upload', 'Create Contact', 'testing', 'Form', '1', '1', '2024-07-17 09:53:00', '2024-07-17 09:53:00'),
(5, 'admin', '25', 'Rakwal Client', 'Form Contact upload', 'Create Contact', 'Lead Aug 7', 'Form', '1', '1', '2024-08-07 03:42:57', '2024-08-07 03:42:57'),
(6, 'superadmin', '29', 'Carolyne Rattle TEST', 'Form Contact upload', 'Create Contact', 'Carolyne', 'Form', '1', '1', '2024-08-09 17:39:52', '2024-08-09 17:39:52'),
(7, 'superadmin', '30', 'Carolyne TEST 3', 'CSV Contact upload', 'Create Contact', 'sample (2).csv', 'CSV', '9', '9', '2024-08-19 05:48:42', '2024-08-19 05:48:42'),
(8, 'superadmin', '31', 'Carolyne Rattle TEST2', 'Form Contact upload', 'Create Contact', 'Carolyne', 'Form', '1', '1', '2024-08-20 17:26:44', '2024-08-20 17:26:44'),
(9, 'superadmin', '32', 'CAz Ttest', 'Form Contact upload', 'Create Contact', 'Carolyne', 'Form', '1', '1', '2024-08-20 17:33:00', '2024-08-20 17:33:00'),
(10, 'superadmin', '32', 'CAz Ttest', 'CSV Contact upload', 'Create Contact', 'valid sample contact upload.csv', 'CSV', '6', '6', '2024-08-22 04:30:32', '2024-08-22 04:30:32'),
(11, 'superadmin', '32', 'CAz Ttest', 'CSV Contact upload', 'Create Contact', 'valid sample contact upload (1).csv', 'CSV', '6', '1', '2024-08-22 12:35:46', '2024-08-22 12:35:46'),
(12, 'superadmin', '32', 'CAz Ttest', 'CSV Contact upload', 'Create Contact', 'valid sample contact upload (1).csv', 'CSV', '6', '0', '2024-08-22 12:35:58', '2024-08-22 12:35:58'),
(13, 'superadmin', '32', 'CAz Ttest', 'CSV Contact upload', 'Create Contact', 'valid sample contact upload.csv', 'CSV', '6', '0', '2024-08-22 12:38:40', '2024-08-22 12:38:40'),
(14, 'superadmin', '32', 'CAz Ttest', 'CSV Contact upload', 'Create Contact', 'valid sample contact upload.csv', 'CSV', '6', '0', '2024-08-22 12:38:49', '2024-08-22 12:38:49'),
(15, 'superadmin', '33', 'TEST 1 TEST 1', 'Form Contact upload', 'Create Contact', 'TEST', 'Form', '1', '1', '2024-08-26 17:40:19', '2024-08-26 17:40:19'),
(16, 'superadmin', '34', 'TEST 4 TEST 4', 'CSV Contact upload', 'Create Contact', '1Off Market Expired Listing Gainesville Nov 30.csv', 'CSV', '91', '0', '2024-08-30 13:47:27', '2024-08-30 13:47:27'),
(17, 'superadmin', '34', 'TEST 4 TEST 4', 'CSV Contact upload', 'Create Contact', 'Vacent  Tampa Nov 15 SK.csv', 'CSV', '1524', '0', '2024-08-30 13:49:10', '2024-08-30 13:49:10'),
(18, 'superadmin', '34', 'TEST 4 TEST 4', 'CSV Contact upload', 'Create Contact', 'sample (1).csv', 'CSV', '9', '0', '2024-08-30 13:53:35', '2024-08-30 13:53:35'),
(19, 'superadmin', '34', 'TEST 4 TEST 4', 'CSV Contact upload', 'Create Contact', 'Sample - Sheet1.csv', 'CSV', '3', '0', '2024-08-30 14:00:06', '2024-08-30 14:00:06'),
(20, 'superadmin', '10', 'devtestavinash pandey', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '0', '2024-09-02 05:00:00', '2024-09-02 05:00:00'),
(21, 'superadmin', '10', 'devtestavinash pandey', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '0', '2024-09-02 05:15:50', '2024-09-02 05:15:50'),
(22, 'superadmin', '25', 'Rakwal Client', 'Form Contact upload', 'Create Contact', 'avinash', 'Form', '1', '1', '2024-09-02 14:37:33', '2024-09-02 14:37:33'),
(23, 'superadmin', '35', 'test 8 test 8', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '6', '2024-09-05 13:26:30', '2024-09-05 13:26:30');

-- --------------------------------------------------------

--
-- Table structure for table `userlogs`
--

CREATE TABLE `userlogs` (
  `id` int NOT NULL,
  `user_type` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_action` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_action_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `source` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `total_contact` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `uploaded_contact` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userlogs`
--

INSERT INTO `userlogs` (`id`, `user_type`, `user_id`, `user_name`, `user_action`, `user_action_type`, `name`, `source`, `total_contact`, `uploaded_contact`, `createdAt`, `updatedAt`) VALUES
(2, 'admin', '11', 'Test User', 'CSV upload', 'Create Contact', 'sample (8).csv', 'CSV', '9', '2', '2024-07-05 07:17:45', '2024-07-05 07:17:45'),
(3, 'admin', '11', 'Test User', 'Contact upload', 'Create Contact', 'avinash testing', 'Form', '1', '1', '2024-07-05 07:41:53', '2024-07-05 07:41:53'),
(5, 'admin', '11', 'Test User', 'Form Contact upload', 'Create Contact', 'testing', 'Form', '1', '1', '2024-07-05 09:18:05', '2024-07-05 09:18:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(120) NOT NULL,
  `last_name` varchar(120) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `source` varchar(20) DEFAULT NULL COMMENT 'From where user have registered',
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `admin_id` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `profile_image` varchar(255) DEFAULT NULL,
  `ghlApiKey` longtext,
  `syncLead` tinyint(1) NOT NULL DEFAULT '0',
  `vapiEnabled` tinyint(1) NOT NULL,
  `vapiApiKey` longtext,
  `twilioEnabled` tinyint(1) NOT NULL,
  `twilioSID` longtext,
  `twilioSecreteKey` longtext,
  `internalNotes` longtext,
  `forgot_pass_hash` varchar(255) DEFAULT NULL,
  `forgot_pass_date` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '''0'' for NOT DELETED and ''1'' for DELETED',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `password`, `email`, `mobile`, `source`, `role`, `admin_id`, `profile_image`, `ghlApiKey`, `syncLead`, `vapiEnabled`, `vapiApiKey`, `twilioEnabled`, `twilioSID`, `twilioSecreteKey`, `internalNotes`, `forgot_pass_hash`, `forgot_pass_date`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Avinash', 'pandey', '$2b$10$QnnPuZW7nQPjFIFqn0ByqeNIvtmOUsz1FrCRBcUKcUSdrwdrGNwJ6', 'admin@gmail.com', '9455963581', NULL, 'admin', '[]', 'upload_340823d0e7778b92e3cc8288389fc6cb.jpg', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2021-02-01 00:00:00', '2024-12-23 10:47:37'),
(3, 'David', 'Test', '$2b$10$eMTF5gHiLD6zgtG5dQtvuOWhA/j5B6Xn2lCVEecUejobY6CmAApFS', 'devod0485@gmail.com', '9876543210', 'google', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, 'Zu1mL4MJgv22BxPmT8fvrkKRC1J6y6s93grCncbL', '2022-01-21 04:58:45', 0, '2021-02-05 10:44:24', '2024-12-23 10:47:37'),
(4, 'Dev', 'Odz', '$2b$10$qdnc73HJDr2YN2j1IV7oruCerbHsle5j6/b5vgV6ejA2zCMfg7nM2', 'devodz@yopmail.com', NULL, 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, 'g2o2X9WTym00t5704172h9OwDs31I6UkTV5xv1sc', '2024-04-25 12:46:45', 0, '2022-04-07 04:44:35', '2024-12-23 10:47:37'),
(7, 'dev2', 'kumar2', '$2b$10$qdnc73HJDr2YN2j1IV7oruCerbHsle5j6/b5vgV6ejA2zCMfg7nM2', 'devod0485ss@gmail.com', NULL, 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-04-24 04:45:04', '2024-12-23 10:47:37'),
(10, 'devtestavinash', 'pandey', '$2b$10$9XNNYlleRdKVSMc54qVYuuxO3BwBZPeocEJ.CRJZ7i8mimDAyg9ki', 'Avinash_Pandey@odzservices.com', '9455963581', 'email', 'user', '[\"22\"]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, 'Ojr2S5LC2soKbA10EUM5tdEbUqBOA3bJLl6z6P5X', '2024-05-24 15:57:28', 0, '2024-05-06 10:09:43', '2024-12-23 10:47:37'),
(11, 'Test', 'User', '$2b$10$yGlobIqzFTDJB7RkRt6nAOIqNda/MYlmm7kv/9SwyHXnoms6Cemva', 'avi488@gmail.com', '9455963581', 'email', 'user', '[\"1\",\"22\"]', NULL, 'ddfgsdfdhbsdghdsghdg', 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-05-24 13:48:41', '2024-12-23 10:47:37'),
(15, 'Super', 'Admin', '$2b$10$QnnPuZW7nQPjFIFqn0ByqeNIvtmOUsz1FrCRBcUKcUSdrwdrGNwJ6', 'superAdmin@gmail.com', '9455963581', NULL, 'superadmin', '[]', 'upload_340823d0e7778b92e3cc8288389fc6cb.jpg', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2021-02-01 00:00:00', '2024-12-23 10:47:37'),
(22, 'admin2', 'lastname2', '$2b$10$oOvdDiDeRLzG1WSo7WqmluzH6I/LoLnqWrpQAEc1.0qzW.pmmgS1O', 'admin2lastname2@gmail.com', '123456789', 'email', 'admin', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-07-11 08:10:39', '2024-12-23 10:47:37'),
(23, 'Testy', 'Testy 12345678 tt', '$2b$10$FOhK4YnHcGYwnxb7xoPaY..c2YrTGMWLuQj1X2oCMa6gHDkmj9Q1S', 'mike@gmail.com', '6462501221', 'email', 'admin', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-07-11 11:25:10', '2024-12-23 10:47:37'),
(24, 'Adminjuly11', 'July11', '$2b$10$trHVKXOmsYsDaRNkJ2wgoOjt1whz4cbn500245qS18agaND1IEsbe', 'adminjuly11@yopmail.com', '5057350238', 'email', 'admin', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-07-11 11:36:52', '2024-12-23 10:47:37'),
(25, 'Rakwal', 'Client', '$2b$10$GRVSmXCoUHzOHFHOX.jyOeAT8PWrh4W8Etv7yK9WirQxIOWTufQby', 'rakwalclient@yopmail.com', '123456789', 'email', 'user', '[\"1\",\"22\"]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-07-11 12:01:13', '2024-12-23 10:47:37'),
(26, 'Rakwal', 'Team', '$2b$10$quX2RIjhGoq8WdIcI6yHe.6YX914voDjKYpQgK7bXtyc/Kn8ZzR92', 'rakwalteam@yopmail.com', '9876543210', 'email', 'admin', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-07-11 12:01:41', '2024-12-23 10:47:37'),
(27, 'mikey test', 'mikey test', '$2b$10$aWp8hyFmBPbByDaiVm25Au94EjTBiILD2DVoRJJ7j.5O5li44KkNu', 'abc@gmail.com', '1231231234', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-07-18 13:14:29', '2024-12-23 10:47:37'),
(28, 'July19', 'Client', '$2b$10$i9ePX3PM/6mbUG4sJzi3B.N2pWj6lF4wkOFA8zERER4lRvkGoEcH.', 'clientjuly19@yopmail.com', '9876543210', 'email', 'user', '[]', NULL, 'asd', 1, 1, 'asd', 1, 'asd', 'asd', '', NULL, NULL, 0, '2024-07-19 09:24:01', '2024-12-23 10:47:37'),
(29, 'Carolyne', 'Rattle TEST', '$2b$10$Qa8dyXH8mC2D6mnKIokE4.xGbAZmP/sK8yJTrS7b2Z18LB.le1rHC', 'carolyne@247talkai.com', '3053360604', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-08-09 16:17:25', '2024-12-23 10:47:37'),
(30, 'Carolyne', 'TEST 3', '$2b$10$m5tjfq1twQGxyDuYfkJIo.WpTrEptniy7B8iCXm/BGxGXmXyt3r3u', 'ca.zrattle@gmail.com', '3053360604', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 1, '2024-08-14 19:14:41', '2024-12-23 10:47:37'),
(31, 'Carolyne', 'Rattle TEST2', '$2b$10$1QUThj6Tyy67tqnnjqppTuhsPoPGgpTnOqJSRlMfHmiNWSnPNK3HS', 'cazrattle@gmail.com', '3053360604', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-08-20 17:23:01', '2024-12-23 10:47:37'),
(32, 'CAz', 'Ttest', '$2b$10$ZUlueUftIerEDO7wA3vm6.68o4ljtDSzgouju/3ZFlj0g66iazzCC', 'caz.rattle@gmail.com', '3053360604', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-08-20 17:31:17', '2024-12-23 10:47:37'),
(33, 'TEST 1', 'TEST 1', '$2b$10$S9Z7D3iUrBZvdYKLY1rEIe8B7Ux8RGU5PRnxYZgoccLRXAtkWbJxi', 'esth.er@247talkai.com', '3053360604', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-08-26 17:19:39', '2024-12-23 10:47:37'),
(34, 'TEST 4', 'TEST 4', '$2b$10$T2gjqsKwDYP2pb1JcldUweroLTPS0BerZlkkwe6/27dmatPHnX09y', 'c.a.zrattle@gmail.com', '305336004', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-08-30 13:44:35', '2024-12-23 10:47:37'),
(35, 'test 8', 'test 8', '$2b$10$G2USsA0nYIo3XqgPis0W0.6V0yQsRA0g9lDx0r/eIWvbvnU8vYFq.', 'carolyne@gmail.com', '3033360606', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-09-05 13:25:46', '2024-12-23 10:47:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `call_details`
--
ALTER TABLE `call_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_lists`
--
ALTER TABLE `contact_lists`
  ADD PRIMARY KEY (`contact_list_id`);

--
-- Indexes for table `phonenumbers`
--
ALTER TABLE `phonenumbers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userLogs`
--
ALTER TABLE `userLogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userlogs`
--
ALTER TABLE `userlogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `call_details`
--
ALTER TABLE `call_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `contact_lists`
--
ALTER TABLE `contact_lists`
  MODIFY `contact_list_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `phonenumbers`
--
ALTER TABLE `phonenumbers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `userLogs`
--
ALTER TABLE `userLogs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `userlogs`
--
ALTER TABLE `userlogs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
