-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 31, 2024 at 11:22 AM
-- Server version: 8.0.39-0ubuntu0.22.04.1
-- PHP Version: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `number` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `call_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `assistant_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `org_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `campaign_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `call_details`
--

INSERT INTO `call_details` (`id`, `name`, `number`, `call_id`, `assistant_id`, `phone_number_id`, `org_id`, `campaign_id`, `created_at`, `updated_at`) VALUES
(1, 'Aditya Sharma', '+918896507952', '00101f86-8b44-4225-a550-43c4cc9f4542', '67d1148e-97df-4c7c-acba-c82a643d120a', '85f33cf2-8033-4b9b-97bf-f5e8e665cd63', '7791abff-61d0-404c-8c86-14bbe011b5b5', 3, '2024-06-06 06:59:47', '2024-06-06 06:59:48'),
(2, 'Sumeena Rakwal', '+919455963581', 'b270d1f9-4477-4217-af91-5a4385ddf066', '67d1148e-97df-4c7c-acba-c82a643d120a', '85f33cf2-8033-4b9b-97bf-f5e8e665cd63', '7791abff-61d0-404c-8c86-14bbe011b5b5', 3, '2024-06-06 06:59:49', '2024-06-06 06:59:50'),
(3, 'Aditya Sharma', '+918896507952', '17ea770d-53fa-415a-a5d4-48d93d931518', '67d1148e-97df-4c7c-acba-c82a643d120a', '85f33cf2-8033-4b9b-97bf-f5e8e665cd63', '7791abff-61d0-404c-8c86-14bbe011b5b5', 3, '2024-06-07 10:21:14', '2024-06-07 10:21:15'),
(4, 'Sumeena Rakwal', '+919455963581', '5f72503b-e651-4a9b-8384-0d6c3c527294', '67d1148e-97df-4c7c-acba-c82a643d120a', '85f33cf2-8033-4b9b-97bf-f5e8e665cd63', '7791abff-61d0-404c-8c86-14bbe011b5b5', 3, '2024-06-07 10:21:22', '2024-06-07 10:21:23'),
(5, 'avinash', '+919455963581', '900c1f22-8a83-4ca8-85c2-bfa20cc77407', '0dc32dcb-7f33-4b64-b516-f3a7000482c6', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 1, '2024-06-14 10:24:35', '2024-06-14 10:24:35'),
(6, 'avinash', '+919455963581', '0596e95d-c1aa-4792-9330-a788117f012e', '0dc32dcb-7f33-4b64-b516-f3a7000482c6', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 1, '2024-06-14 11:23:31', '2024-06-14 11:23:32'),
(7, 'avinash', '+919455963581', 'c8aadc39-f815-4e57-9236-d5fe42e7d413', '0dc32dcb-7f33-4b64-b516-f3a7000482c6', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 1, '2024-06-14 11:25:10', '2024-06-14 11:25:11'),
(8, 'avinash', '+919455963581', '84df9f2e-e5fa-46a7-a199-0a9a1141b90f', '0dc32dcb-7f33-4b64-b516-f3a7000482c6', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 1, '2024-06-14 11:26:06', '2024-06-14 11:26:07'),
(9, 'avinash', '+919455963581', 'fe0d7658-aad4-4b7a-ac97-14bd4e3d5fe9', '0dc32dcb-7f33-4b64-b516-f3a7000482c6', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 1, '2024-06-14 11:29:45', '2024-06-14 11:29:45'),
(10, 'avinash pandey', '+919455963581', '61d76235-3ffd-4072-8a4b-93103fc89c3a', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-02 14:42:31', '2024-09-02 14:42:32'),
(11, 'avinash pandey', '+919455963581', '431bd8d1-fd0c-4fa3-b8ee-aed32b0a5875', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-02 14:48:07', '2024-09-02 14:48:08'),
(12, 'Vikas Goyal', '+918437405304', '91666555-26ce-4819-b5c6-a2058755fe92', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-02 14:48:13', '2024-09-02 14:48:14'),
(13, 'avinash pandey', '+919455963581', 'ca5d8157-f3d5-4f4e-acb8-fdc33d2b87bb', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 05:44:16', '2024-09-03 05:44:17'),
(14, 'avinash pandey', '+919455963581', 'e5d48cb3-9725-43a8-aeda-c316a7cb8387', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 05:46:25', '2024-09-03 05:46:25'),
(15, 'avinash pandey', '+919455963581', '9cf1ba05-cb06-4452-8bd6-cabde06e3b19', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 06:00:36', '2024-09-03 06:00:37'),
(16, 'avinash pandey', '+919455963581', '06a17eb8-5089-436c-91f7-c3a61ca51c5e', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:00:39', '2024-09-03 10:00:40'),
(17, 'Australian 2', '61402229661', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 9, '2024-09-03 10:01:49', '2024-09-03 10:01:49'),
(18, 'Australian 2', '+61402229661', '9dc162e6-4948-457c-af79-1756887e66bd', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:01:54', '2024-09-03 10:01:55'),
(19, 'avinash pandey', '+919455963581', '0064184a-d1cf-414e-81e8-416f2215c389', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:02:01', '2024-09-03 10:02:02'),
(20, 'Vikas Goyal', '+918437405304', '2f24994f-3063-485b-93a0-cf1d337aecf3', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:02:07', '2024-09-03 10:02:08'),
(21, 'Australian 2', '61402229661', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 9, '2024-09-03 10:06:03', '2024-09-03 10:06:03'),
(22, 'Australian 2', '+61402229661', '6033454f-92ba-4b93-996c-28358d103776', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:06:08', '2024-09-03 10:06:09'),
(23, 'avinash pandey', '+919455963581', 'f87c1bfc-488b-4231-84b6-ccf44f24244b', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:06:15', '2024-09-03 10:06:16'),
(24, 'Vikas Goyal', '+918437405304', 'b2411973-720a-40d3-80d2-85583026104a', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:06:21', '2024-09-03 10:06:22'),
(25, 'Australian 2', '61402229661', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 9, '2024-09-03 10:29:35', '2024-09-03 10:29:35'),
(26, 'avinash pandey', '+919455963581', '38db28ff-9785-4603-aaa1-c1dfd449e810', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:29:40', '2024-09-03 10:29:41'),
(27, 'Australian 2', '61402229661', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 9, '2024-09-03 10:33:44', '2024-09-03 10:33:44'),
(28, 'avinash pandey', '+919455963581', '977a57d5-1784-4a27-8796-6a6d12d91b3a', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-03 10:33:49', '2024-09-03 10:33:50'),
(29, 'Patricia D. Martinez', '647 271 1675', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 10, '2024-09-03 10:48:17', '2024-09-03 10:48:17'),
(30, 'Vikas', '+918437405304', 'b9c2e1ba-3267-471e-81ea-1f3028079b0c', '50d1f04f-899d-46bc-97c4-d1017af0a30f', '85f33cf2-8033-4b9b-97bf-f5e8e665cd63', '7791abff-61d0-404c-8c86-14bbe011b5b5', 10, '2024-09-03 10:48:23', '2024-09-03 10:48:24'),
(31, 'Australian 2', '61402229661', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 9, '2024-09-04 12:28:00', '2024-09-04 12:28:00'),
(32, 'avinash pandey', '+919455963581', 'f2edfccc-09e0-4df6-975c-b550bc3ceb86', '037356a5-8c54-42cb-8303-35901d305d2b', '7cefed1e-d623-419d-b986-63341811527e', '7791abff-61d0-404c-8c86-14bbe011b5b5', 9, '2024-09-04 12:28:05', '2024-09-04 12:28:06'),
(33, 'Patricia D. Martinez', '647 271 1675', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 10, '2024-12-30 11:53:34', '2024-12-30 11:53:34'),
(34, 'Vikas', '+918437405304', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 10, '2024-12-30 11:53:41', '2024-12-30 11:53:41'),
(35, 'Patricia D. Martinez', '647 271 1675', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 10, '2024-12-30 11:54:21', '2024-12-30 11:54:21'),
(36, 'Vikas', '+918437405304', 'invalid number', 'invalid number', 'invalid number', 'invalid number', 10, '2024-12-30 11:54:28', '2024-12-30 11:54:28');

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` int NOT NULL,
  `campaign_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `caller_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `calls_per_minute` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `campaign_status` tinyint(1) DEFAULT NULL,
  `campaign_running_status` tinyint DEFAULT '0',
  `daily_end_time` timestamp NULL DEFAULT NULL,
  `daily_start_time` timestamp NULL DEFAULT NULL,
  `days_of_week` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `dnc_list` tinyint(1) DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `internal_notes` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `selected_contact_lists` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_lists_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `selected_user_list` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_user_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `time_zone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vapi_agent` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `campaign_name`, `caller_id`, `calls_per_minute`, `campaign_status`, `campaign_running_status`, `daily_end_time`, `daily_start_time`, `days_of_week`, `dnc_list`, `end_date`, `internal_notes`, `selected_contact_lists`, `contact_lists_id`, `selected_user_list`, `contact_user_id`, `start_date`, `time_zone`, `vapi_agent`, `created_at`, `updated_at`) VALUES
(7, 'other 3 campaign', '{\"id\":\"85f33cf2-8033-4b9b-97bf-f5e8e665cd63\",\"name\":\"+16468600663\"}', '45', 0, 0, '2024-09-03 11:00:00', '2024-09-03 13:00:00', '\"[\\\"Mon\\\",\\\"Tue\\\",\\\"Wed\\\",\\\"Thu\\\",\\\"Fri\\\",\\\"Sat\\\",\\\"Sun\\\"]\"', 0, '2024-09-29 18:30:00', 'testing', '{\"id\":7,\"name\":\"new Contact list\"}', '7', '{\"id\":2,\"name\":\"Test Updated\"}', '2', '2024-06-01 18:30:00', '{\"friendlyName\":\"Africa/Accra (UTC+00:00)\",\"longTimezones\":\"Africa/Accra\"}', '{\"id\":\"0dc32dcb-7f33-4b64-b516-f3a7000482c6\",\"name\":\"240522 susan new (Copy)\"}', '2024-07-03 05:42:25', '2024-07-09 03:37:36'),
(8, 'avinashcampaign', '{\"id\":\"7cefed1e-d623-419d-b986-63341811527e\",\"name\":\"+14158557949\"}', '56', 0, 0, '2024-09-03 12:00:00', '2024-09-03 13:00:00', '\"[\\\"Mon\\\",\\\"Tue\\\",\\\"Wed\\\",\\\"Thu\\\",\\\"Fri\\\",\\\"Sat\\\",\\\"Sun\\\"]\"', 0, '2024-09-29 18:30:00', 'testing', '{\"id\":2,\"name\":\"testing2\"}', '2', '{\"id\":2,\"name\":\"Test Updated\"}', '2', '2024-07-03 18:30:00', '{\"friendlyName\":\"Africa/Abidjan (UTC+00:00)\",\"longTimezones\":\"Africa/Abidjan\"}', '{\"id\":\"0dc32dcb-7f33-4b64-b516-f3a7000482c6\",\"name\":\"240522 susan new (Copy)\"}', '2024-07-04 11:18:09', '2024-07-09 03:37:26'),
(9, 'Indian Leads', '{\"id\":\"7cefed1e-d623-419d-b986-63341811527e\",\"name\":\"+14158557949\"}', '12', 0, 0, '2024-09-03 18:00:00', '2024-09-03 01:10:00', '\"[\\\"Mon\\\",\\\"Tue\\\",\\\"Wed\\\",\\\"Thu\\\",\\\"Fri\\\",\\\"Sat\\\",\\\"Sun\\\"]\"', 0, '2024-12-30 18:30:00', 'testing', '{\"id\":5,\"name\":\"wrong Number\"}', '5', '{\"id\":12,\"name\":\"avinash pandey\"}', '12', '2024-09-01 18:30:00', '{\"friendlyName\":\"Asia/Kolkata (UTC+05:30)\",\"longTimezones\":\"Asia/Kolkata\"}', '{\"id\":\"037356a5-8c54-42cb-8303-35901d305d2b\",\"name\":\"240522 susan - 1\"}', '2024-07-06 03:56:28', '2024-09-04 12:28:11'),
(10, 'contact 4 campaign', '{\"id\":\"85f33cf2-8033-4b9b-97bf-f5e8e665cd63\",\"name\":\"+16468600663\"}', '', 0, 0, '2024-09-03 15:30:00', '2024-09-03 03:30:00', '\"[\\\"Mon\\\",\\\"Wed\\\",\\\"Fri\\\"]\"', 0, '2024-09-10 18:30:00', 'these are for internal notes', '{\"id\":23,\"name\":\"contact list 04\"}', '23', '{\"id\":\"24\",\"name\":\"test client 04\"}', '24', '2024-09-09 18:30:00', '{\"friendlyName\":\"Asia/Dubai (UTC+04:00)\",\"longTimezones\":\"Asia/Dubai\"}', '{\"id\":\"50d1f04f-899d-46bc-97c4-d1017af0a30f\",\"name\":\"240522 susan - 2\"}', '2024-09-03 10:46:41', '2024-12-30 11:54:33');

-- --------------------------------------------------------

--
-- Table structure for table `contact_lists`
--

CREATE TABLE `contact_lists` (
  `contact_list_id` int NOT NULL,
  `list_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `leads` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ;

--
-- Dumping data for table `contact_lists`
--

INSERT INTO `contact_lists` (`contact_list_id`, `list_name`, `description`, `userid`, `leads`, `created_at`, `updated_at`) VALUES
(2, 'testing2', 'testing', 2, '\"[20]\"', '2024-05-31 05:59:10', '2024-05-31 05:59:10'),
(4, 'last test', 'trsfasf', 11, '\"[65,135]\"', '2024-06-01 08:05:01', '2024-06-01 08:05:01'),
(5, 'wrong Number', 'twilio response wrong Number', 12, '\"[222,73]\"', '2024-06-12 06:21:28', '2024-06-12 06:21:28'),
(7, 'new Contact list', 'new testing list', 2, '\"[24,25]\"', '2024-07-06 07:40:06', '2024-07-06 07:40:06'),
(11, 'Cold Outbound Leads', 'TEST', 14, '\"[]\"', '2024-08-30 14:04:48', '2024-08-30 14:04:48'),
(12, 'without contact', 'withour contact creacted contact list\n', 12, '\"[]\"', '2024-09-02 05:57:53', '2024-09-02 05:57:53'),
(13, 'Contact List Sept 2', 'Contact List Created on Sept 2', 22, '\"[]\"', '2024-09-02 08:35:53', '2024-09-02 08:35:53'),
(22, 'contact list for client 03', 'ergrthr', 23, '\"[216,220,219,221]\"', '2024-09-02 11:41:39', '2024-09-02 11:41:39'),
(23, 'contact list 04', 'contact listing', 24, '\"[215,224]\"', '2024-09-02 11:43:37', '2024-09-02 11:43:37'),
(24, 'contact listing ##2', 'contact listing ##2', 24, '\"[210,211,212,213]\"', '2024-09-02 11:44:20', '2024-09-02 11:44:20'),
(25, 'TEST for level 6', 'This is a test ', 25, '\"[225,229,226,228,227,230]\"', '2024-09-04 13:52:32', '2024-09-04 13:52:32');

-- --------------------------------------------------------

--
-- Table structure for table `phonenumbers`
--

CREATE TABLE `phonenumbers` (
  `id` int NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `country` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_list_id` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ghl_contact_id` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phonenumbers`
--

INSERT INTO `phonenumbers` (`id`, `name`, `phone`, `email`, `status`, `userid`, `country`, `contact_list_id`, `ghl_contact_id`, `created_at`, `updated_at`) VALUES
(1, 'Aditya Sharma', '+918896507952', 'AdityaSharma@gmail.com', 'landline', NULL, 'US', NULL, 'If0hOEFSJq2u5NI9UKgB', '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(7, 'Himanshu Jaiswal', '8054507399', NULL, 'mobile', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(16, 'Manisha Sharma', '8629898710', NULL, 'null', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(17, 'Jasvir', '9465637062', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(19, 'Lakhvir Singh', '9988835138', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(20, 'Kuldeep Singh', '7888509960', NULL, 'null', NULL, NULL, '2', NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(24, 'Nivedita Singh ', '7261970372', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(25, 'Shilpa Rani', '9530594200', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(26, 'Rajni', '8195916098', NULL, 'null', NULL, 'CA', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(27, 'Harish Verma', '9023669732', NULL, 'null', NULL, 'CA', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(28, 'Ganesh Kumar', '8847321820', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(29, 'Dilpreet Kaur', '9988456329', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(30, 'Somesh Kumar Dwivedi', '8881810185', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(33, 'Rasham Kumar', '9990822753', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(34, 'BLUE CROSS BLUE', '8437367027', NULL, 'landline', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(35, 'Milan Kumar ', '8699973926', NULL, 'null', NULL, 'KN', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(36, 'Meena Kumari', '9867316353', NULL, 'null', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(37, 'Shubhangi Ramkete', '7499607449', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(38, 'Rahul Singh ', '8800134395', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(39, 'Tara Chand ', '8949129818', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(40, 'Manishwar Singh', '9520430303', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(41, 'Asmita ', '9819696234', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(42, 'Abhishek Pundir', '9759678974', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(43, 'Nisha Thakur', '9041994547', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(44, 'Anuj Kumar', '9041475887', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(45, 'Lovepreet Singh ', '99144 03241', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(46, 'Anmol Singh', '8168564841', NULL, 'mobile', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(47, 'Mandeep Kaur', '8968879511', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(48, 'Gourav Singh Sambyal', '9876856545', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(49, 'TOLL FREE CALL', '8558968106', NULL, 'tollFree', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(50, 'Gourav Kumar', '9992843683', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(51, 'Sunil Sharma', '9463787673', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(52, 'Vaibhav Garg', '9034420657', NULL, 'Answering machine', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(53, 'TOLL FREE CALL', '8556079361', NULL, 'tollFree', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(54, 'Chandra Shekhar', '9719840017', NULL, 'null', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(55, 'Ravi Dogra ', '8629076268', NULL, 'null', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(56, 'JOHN PASCO', '8606850230', NULL, 'mobile', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(57, 'LANXESS CHARLES', '8437405304', NULL, 'Answering machine', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(58, 'Riya Rani', '8054268584', NULL, 'Answering machine', NULL, 'US', NULL, NULL, '2024-05-24 13:15:31', '2024-05-24 13:15:31'),
(59, 'Gaurav Kapil', '9418775623', NULL, 'Answering machine', NULL, 'US', NULL, NULL, '2024-05-24 13:15:32', '2024-05-24 13:15:32'),
(60, 'Manjeet Singh', '9781187700', NULL, 'null', NULL, NULL, NULL, NULL, '2024-05-24 13:15:32', '2024-05-24 13:15:32'),
(61, 'Amit Verma', '919000000000', NULL, 'wrong Number', NULL, NULL, NULL, NULL, '2024-05-24 14:04:20', '2024-05-24 14:04:20'),
(65, 'Lead Name', '9.11235E+11', NULL, 'wrong Number', 11, NULL, '4', NULL, '2024-05-28 05:06:07', '2024-05-28 05:06:07'),
(67, 'MALCOLM BROOKS', '15082870626', 'testing@gmail.com', 'mobile', 12, 'US', NULL, NULL, '2024-06-06 12:20:52', '2024-06-06 12:20:52'),
(68, 'Canadian 1', '16476710412', 'testing@gmail.com', 'null', 12, 'CA', NULL, NULL, '2024-06-06 12:20:52', '2024-06-06 12:20:52'),
(69, 'Canadian 2', '16478389038', 'testing@gmail.com', 'null', 12, 'CA', NULL, NULL, '2024-06-06 12:20:52', '2024-06-06 12:20:52'),
(71, 'JEFF PULVINO', '19163088232', 'testing@gmail.com', 'mobile', 12, 'US', NULL, NULL, '2024-06-06 12:20:52', '2024-06-06 12:20:52'),
(72, 'Australian 1', '61432860048', 'testing@gmail.com', 'wrong Number', 12, NULL, NULL, NULL, '2024-06-06 12:20:52', '2024-06-06 12:20:52'),
(73, 'Australian 2', '61402229661', 'testing@gmail.com', 'wrong Number', 12, NULL, '5', NULL, '2024-06-06 12:20:52', '2024-06-06 12:20:52'),
(74, 'Canadian 3', '14379893234', 'testing@gmail.com', 'null', 12, 'CA', NULL, NULL, '2024-06-06 12:20:52', '2024-06-06 12:20:52'),
(79, 'Indian 1', '9.18437E+11', NULL, 'wrong Number', 14, NULL, NULL, NULL, '2024-06-06 13:02:37', '2024-06-06 13:02:37'),
(80, 'Indian 1', '9.18437E+11', NULL, 'wrong Number', 14, NULL, NULL, NULL, '2024-06-06 13:02:37', '2024-06-06 13:02:37'),
(103, 'adasd', '+544587588458', NULL, 'wrong Number', NULL, 'AR', NULL, NULL, '2024-06-11 05:36:37', '2024-06-11 05:36:37'),
(105, 'WebhookForBitrix24', '+2985214786325', 'Avinash_Pandey@odzservices.com', 'wrong Number', 12, NULL, NULL, NULL, '2024-06-12 10:10:20', '2024-06-12 10:10:20'),
(121, 'invalidlead222', '+4126478962', 'invalidlead222@gmail.com', 'wrong Number', 12, NULL, NULL, NULL, '2024-06-14 10:34:25', '2024-06-14 10:34:25'),
(132, 'Indian 1', '918437405304', NULL, 'wrong Number', 11, NULL, '', NULL, '2024-07-05 07:17:45', '2024-07-05 07:17:45'),
(133, 'Indian 1', '918437405304', NULL, 'wrong Number', 11, NULL, '', NULL, '2024-07-05 07:17:45', '2024-07-05 07:17:45'),
(135, 'avinash testing', '+9194558745896', 'avinashtest@gmail.com', 'wrong Number', 11, 'IN', '4', NULL, '2024-07-05 07:41:52', '2024-07-05 07:41:52'),
(136, 'indian contact', '+919458693258', 'indiancontact', 'mobile', 14, 'IN', NULL, NULL, '2024-07-05 07:46:17', '2024-07-05 07:46:17'),
(137, 'testing', '+919455871236', 'admin@gmail.com', 'mobile', 11, 'IN', NULL, NULL, '2024-07-05 09:18:05', '2024-07-05 09:18:05'),
(138, 'testing', '+919455963586', NULL, 'mobile', 12, 'IN', NULL, NULL, '2024-08-19 04:01:47', '2024-08-19 04:01:47'),
(140, 'BABYGIRL G', '19163088223', 'testing50@gmail.com', 'mobile', 11, 'US', '', NULL, '2024-08-22 10:54:29', '2024-08-22 10:54:29'),
(141, 'PEEK,BRIAN', '15082870662', 'testing40@gmail.com', 'mobile', 11, 'US', NULL, NULL, '2024-08-22 10:54:29', '2024-08-22 10:54:29'),
(142, 'Vikas', '16476710423', 'testing10@gmail.com', 'null', 11, 'CA', '', NULL, '2024-08-22 10:54:29', '2024-08-22 10:54:29'),
(143, 'Meena', '14379893243', 'testing30@gmail.com', 'null', 11, 'CA', '', NULL, '2024-08-22 10:54:30', '2024-08-22 10:54:30'),
(144, 'Sumeena', '16478389083', 'testing20@gmail.com', 'null', 11, 'CA', '', NULL, '2024-08-22 10:54:30', '2024-08-22 10:54:30'),
(146, 'MW', '6140262999', 'testing60@gmail.com', 'wrong Number', 11, NULL, '', NULL, '2024-08-22 11:17:52', '2024-08-22 11:17:52'),
(147, 'JEFF PULVINO', '+19163088232', NULL, 'mobile', 14, 'US', '', NULL, '2024-09-02 05:35:34', '2024-09-02 05:35:34'),
(148, 'Australian 1', '+6140222966', NULL, 'wrong Number', 14, NULL, '', NULL, '2024-09-02 05:35:34', '2024-09-02 05:35:34'),
(149, 'Canadian 2', '+16478389038', NULL, 'null', 14, 'CA', '', NULL, '2024-09-02 05:35:34', '2024-09-02 05:35:34'),
(150, 'Canadian 1', '+16476710412', NULL, 'null', 14, 'CA', '', NULL, '2024-09-02 05:35:34', '2024-09-02 05:35:34'),
(151, 'SR', '+918146061433', NULL, 'mobile', 14, 'IN', '', NULL, '2024-09-02 05:35:34', '2024-09-02 05:35:34'),
(152, 'Canadian 3', '+14379893234', NULL, 'null', 14, 'CA', '', NULL, '2024-09-02 05:35:34', '2024-09-02 05:35:34'),
(153, 'Australian 2', '+61402229661', NULL, 'mobile', 14, 'AU', '', NULL, '2024-09-02 05:35:34', '2024-09-02 05:35:34'),
(154, 'MALCOLM BROOKS', '+15082870626', NULL, 'mobile', 14, 'US', '', NULL, '2024-09-02 05:35:34', '2024-09-02 05:35:34'),
(156, 'Canadian 2', '+16478389038', NULL, 'null', 12, 'CA', '', NULL, '2024-09-02 05:55:42', '2024-09-02 05:55:42'),
(157, 'Canadian 1', '+16476710412', NULL, 'null', 12, 'CA', '', NULL, '2024-09-02 05:55:42', '2024-09-02 05:55:42'),
(158, 'Australian 1', '+6140222966', NULL, 'wrong Number', 12, NULL, '', NULL, '2024-09-02 05:55:42', '2024-09-02 05:55:42'),
(159, 'JEFF PULVINO', '+19163088232', NULL, 'mobile', 12, 'US', '', NULL, '2024-09-02 05:55:42', '2024-09-02 05:55:42'),
(160, 'MALCOLM BROOKS', '+15082870626', NULL, 'mobile', 12, 'US', '', NULL, '2024-09-02 05:55:42', '2024-09-02 05:55:42'),
(162, 'SR', '+918146061433', NULL, 'mobile', 12, 'IN', '', NULL, '2024-09-02 05:55:42', '2024-09-02 05:55:42'),
(163, 'Canadian 3', '+14379893234', NULL, 'null', 12, 'CA', '', NULL, '2024-09-02 05:55:42', '2024-09-02 05:55:42'),
(164, 'Australian 2', '+61402229661', NULL, 'mobile', 12, 'AU', NULL, NULL, '2024-09-02 05:55:42', '2024-09-02 05:55:42'),
(210, 'Nancy B. Hernandez', '027 2352 273', 'testing@gmail.com', 'wrong Number', 24, NULL, '24', NULL, '2024-09-02 11:29:33', '2024-09-02 11:29:33'),
(211, 'DO,THOI', '720 862 7683', 'CharlotteLDye@teleworm.us', 'mobile', 24, 'US', '24', NULL, '2024-09-02 11:29:33', '2024-09-02 11:29:33'),
(212, 'Alan A. Lopez', '302 235 7299', 'AlanALopez@armyspy.com', 'mobile', 24, 'US', '24', NULL, '2024-09-02 11:29:33', '2024-09-02 11:29:33'),
(213, 'Mary S. Hernandez', '026 3334 032', 'MarySHernandez@armyspy.com', 'wrong Number', 24, NULL, '24', NULL, '2024-09-02 11:32:28', '2024-09-02 11:32:28'),
(215, 'Patricia D. Martinez', '647 271 1675', 'PatriciaDMartinez@jourrapide.com', 'null', 24, 'CA', '23', NULL, '2024-09-02 11:38:08', '2024-09-02 11:38:08'),
(216, 'Patricia D. Martinez', '647 271 1675', 'PatriciaDMartinez@jourrapide.com', 'null', 23, 'CA', '22', NULL, '2024-09-02 11:41:51', '2024-09-02 11:41:51'),
(217, 'MARC RICHARD', '774 276 1003', 'JohnAAnderson@teleworm.us', 'mobile', 23, 'US', NULL, NULL, '2024-09-02 11:41:51', '2024-09-02 11:41:51'),
(218, 'Nancy B. Hernandez', '027 2352 273', 'testing@gmail.com', 'wrong Number', 23, NULL, NULL, NULL, '2024-09-02 11:41:51', '2024-09-02 11:41:51'),
(219, 'Alan A. Lopez', '302 235 7299', 'AlanALopez@armyspy.com', 'mobile', 23, 'US', '22', NULL, '2024-09-02 11:41:51', '2024-09-02 11:41:51'),
(220, 'Mary S. Hernandez', '026 3334 032', 'MarySHernandez@armyspy.com', 'wrong Number', 23, NULL, '22', NULL, '2024-09-02 11:41:51', '2024-09-02 11:41:51'),
(221, 'DO,THOI', '720 862 7683', 'CharlotteLDye@teleworm.us', 'mobile', 23, 'US', '22', NULL, '2024-09-02 11:41:51', '2024-09-02 11:41:51'),
(222, 'avinash pandey', '+919455963581', 'admin@gmail.com', 'mobile', 12, 'IN', '5', NULL, '2024-09-02 13:13:13', '2024-09-02 13:13:13'),
(223, 'Vikas Goyal', '+918437405304', 'admin@gmail.com', 'mobile', 12, 'IN', NULL, NULL, '2024-09-02 14:47:53', '2024-09-02 14:47:53'),
(224, 'Vikas', '+918437405304', 'vikas@demo.com', 'mobile', 24, 'IN', '23', NULL, '2024-09-03 10:47:19', '2024-09-03 10:47:19'),
(225, 'Nancy B. Hernandez', '027 2352 273', 'testing@gmail.com', 'wrong Number', 25, NULL, '25', NULL, '2024-09-05 09:23:47', '2024-09-05 09:23:47'),
(226, 'Alan A. Lopez', '302 235 7299', 'AlanALopez@armyspy.com', 'mobile', 25, 'US', '25', NULL, '2024-09-05 09:23:47', '2024-09-05 09:23:47'),
(227, 'Patricia D. Martinez', '647 271 1675', 'PatriciaDMartinez@jourrapide.com', 'null', 25, 'CA', '25', NULL, '2024-09-05 09:23:48', '2024-09-05 09:23:48'),
(228, 'Mary S. Hernandez', '026 3334 032', 'MarySHernandez@armyspy.com', 'wrong Number', 25, NULL, '25', NULL, '2024-09-05 09:23:48', '2024-09-05 09:23:48'),
(229, 'DO,THOI', '720 862 7683', 'CharlotteLDye@teleworm.us', 'mobile', 25, 'US', '25', NULL, '2024-09-05 09:23:48', '2024-09-05 09:23:48'),
(230, 'MARC RICHARD', '774 276 1003', 'JohnAAnderson@teleworm.us', 'mobile', 25, 'US', '25', NULL, '2024-09-05 09:23:48', '2024-09-05 09:23:48');

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
(1, 'superadmin', '12', 'avinash pandey', 'Form Contact upload', 'Create Contact', 'testing', 'Form', '1', '1', '2024-08-19 04:01:49', '2024-08-19 04:01:49'),
(2, 'superadmin', '11', 'Test User', 'CSV Contact upload', 'Create Contact', 'valid sample contact upload (1).csv', 'CSV', '6', '6', '2024-08-22 10:54:33', '2024-08-22 10:54:33'),
(3, 'superadmin', '11', 'Test User', 'CSV Contact upload', 'Create Contact', 'valid sample contact upload (1).csv', 'CSV', '6', '1', '2024-08-22 10:59:57', '2024-08-22 10:59:57'),
(4, 'superadmin', '11', 'Test User', 'CSV Contact upload', 'Create Contact', 'valid sample contact upload (1).csv', 'CSV', '6', '1', '2024-08-22 11:17:53', '2024-08-22 11:17:53'),
(5, 'superadmin', '11', 'Test User', 'CSV Contact upload', 'Create Contact', 'valid sample contact upload (1).csv', 'CSV', '6', '0', '2024-08-22 11:25:59', '2024-08-22 11:25:59'),
(6, 'admin', '14', 'avinash test', 'CSV Contact upload', 'Create Contact', 'Sample - Sheet1.csv', 'CSV', '3', '0', '2024-08-30 14:05:47', '2024-08-30 14:05:47'),
(7, 'superadmin', '14', 'avinash test', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '8', '2024-09-02 05:35:34', '2024-09-02 05:35:34'),
(8, 'superadmin', '14', 'avinash test', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '0', '2024-09-02 05:36:15', '2024-09-02 05:36:15'),
(9, 'superadmin', '14', 'avinash test', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '0', '2024-09-02 05:39:29', '2024-09-02 05:39:29'),
(10, 'superadmin', '14', 'avinash test', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '1', '2024-09-02 05:46:57', '2024-09-02 05:46:57'),
(11, 'superadmin', '14', 'avinash test', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '0', '2024-09-02 05:47:07', '2024-09-02 05:47:07'),
(12, 'superadmin', '14', 'avinash test', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '0', '2024-09-02 05:47:14', '2024-09-02 05:47:14'),
(13, 'superadmin', '14', 'avinash test', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '0', '2024-09-02 05:55:24', '2024-09-02 05:55:24'),
(14, 'superadmin', '12', 'avinash pandey', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '9', '2024-09-02 05:55:42', '2024-09-02 05:55:42'),
(15, 'superadmin', '12', 'avinash pandey', 'CSV Contact upload', 'Create Contact', 'sample (17).csv', 'CSV', '9', '0', '2024-09-02 05:56:28', '2024-09-02 05:56:28'),
(16, 'superadmin', '22', 'testing client02', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '6', '2024-09-02 08:36:21', '2024-09-02 08:36:21'),
(17, 'superadmin', '23', 'testing client03', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '6', '2024-09-02 08:37:56', '2024-09-02 08:37:56'),
(18, 'superadmin', '23', 'testing client03', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '0', '2024-09-02 08:38:51', '2024-09-02 08:38:51'),
(19, 'superadmin', '23', 'testing client03', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '6', '2024-09-02 10:25:31', '2024-09-02 10:25:31'),
(20, 'superadmin', '23', 'testing client03', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '0', '2024-09-02 10:29:55', '2024-09-02 10:29:55'),
(21, 'superadmin', '22', 'testing client02', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '6', '2024-09-02 10:33:16', '2024-09-02 10:33:16'),
(22, 'superadmin', '24', 'test client 04', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '6', '2024-09-02 10:38:03', '2024-09-02 10:38:03'),
(23, 'superadmin', '24', 'test client 04', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '3', '2024-09-02 10:57:15', '2024-09-02 10:57:15'),
(24, 'superadmin', '24', 'test client 04', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '6', '2024-09-02 11:00:14', '2024-09-02 11:00:14'),
(25, 'superadmin', '23', 'testing client03', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '6', '2024-09-02 11:06:17', '2024-09-02 11:06:17'),
(26, 'superadmin', '24', 'test client 04', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '3', '2024-09-02 11:29:34', '2024-09-02 11:29:34'),
(27, 'superadmin', '24', 'test client 04', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '1', '2024-09-02 11:32:29', '2024-09-02 11:32:29'),
(28, 'superadmin', '24', 'test client 04', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '1', '2024-09-02 11:36:23', '2024-09-02 11:36:23'),
(29, 'superadmin', '24', 'test client 04', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '1', '2024-09-02 11:38:08', '2024-09-02 11:38:08'),
(30, 'superadmin', '23', 'testing client03', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '6', '2024-09-02 11:41:51', '2024-09-02 11:41:51'),
(31, 'superadmin', '12', 'avinash pandey', 'Form Contact upload', 'Create Contact', 'avinash pandey', 'Form', '1', '1', '2024-09-02 13:13:13', '2024-09-02 13:13:13'),
(32, 'superadmin', '12', 'avinash pandey', 'Form Contact upload', 'Create Contact', 'Vikas Goyal', 'Form', '1', '1', '2024-09-02 14:47:53', '2024-09-02 14:47:53'),
(33, 'superadmin', '24', 'test client 04', 'Form Contact upload', 'Create Contact', 'Vikas', 'Form', '1', '1', '2024-09-03 10:47:19', '2024-09-03 10:47:19'),
(34, 'superadmin', '25', 'TEST 6 Test 6', 'CSV Contact upload', 'Create Contact', 'Sample - Sheet1.csv', 'CSV', '3', '0', '2024-09-04 13:52:59', '2024-09-04 13:52:59'),
(35, 'superadmin', '25', 'TEST 6 Test 6', 'CSV Contact upload', 'Create Contact', 'Sample - Sheet1.csv', 'CSV', '3', '0', '2024-09-04 13:53:39', '2024-09-04 13:53:39'),
(36, 'superadmin', '25', 'TEST 6 Test 6', 'CSV Contact upload', 'Create Contact', 'Sample - Sheet1.csv', 'CSV', '3', '0', '2024-09-04 13:54:20', '2024-09-04 13:54:20'),
(37, 'superadmin', '25', 'TEST 6 Test 6', 'CSV Contact upload', 'Create Contact', 'Contacts Upload - CSV.csv', 'CSV', '6', '6', '2024-09-05 09:23:48', '2024-09-05 09:23:48');

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
  `admin_id` longtext,
  `profile_image` varchar(255) DEFAULT NULL,
  `ghlApiKey` longtext,
  `syncLead` tinyint(1) NOT NULL DEFAULT '0',
  `vapiEnabled` tinyint(1) NOT NULL DEFAULT '0',
  `vapiApiKey` longtext,
  `twilioEnabled` tinyint(1) NOT NULL DEFAULT '0',
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
(1, 'Avinash', 'pandey', '$2b$10$QnnPuZW7nQPjFIFqn0ByqeNIvtmOUsz1FrCRBcUKcUSdrwdrGNwJ6', 'admin@gmail.com', '9455963581', NULL, 'admin', '[]', 'upload_340823d0e7778b92e3cc8288389fc6cb.jpg', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2021-02-01 00:00:00', '2024-07-16 10:13:49'),
(2, 'Test', 'Updated', '$2b$10$QnnPuZW7nQPjFIFqn0ByqeNIvtmOUsz1FrCRBcUKcUSdrwdrGNwJ6', 'test@gmail.com', '9876543211', 'email', 'admin', '[]', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IjQ4cWVCUlFCRTlDUkl5RkJxaUt5IiwidmVyc2lvbiI6MSwiaWF0IjoxNzEzNTQ1MjIzODc0LCJzdWIiOiJRN2gxTVVES2VtOVA1TU83c3pldiJ9.YWDZNS5qO0s2L-5Ef0xbWmJbhKhTLfKWFcpCxg6UwVY', 0, 0, NULL, 0, NULL, NULL, NULL, 'szlGxBTZ46fs17O0K09RTFe44unRY6eDEwcmuwKs', '2022-10-03 03:40:12', 0, '2021-02-05 10:35:18', '2024-07-16 10:13:49'),
(3, 'David', 'Test', '$2b$10$eMTF5gHiLD6zgtG5dQtvuOWhA/j5B6Xn2lCVEecUejobY6CmAApFS', 'devod0485@gmail.com', '9876543210', 'google', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, 'Zu1mL4MJgv22BxPmT8fvrkKRC1J6y6s93grCncbL', '2022-01-21 04:58:45', 0, '2021-02-05 10:44:24', '2024-07-16 10:13:49'),
(4, 'Dev', 'Odz', '$2b$10$qdnc73HJDr2YN2j1IV7oruCerbHsle5j6/b5vgV6ejA2zCMfg7nM2', 'devodz@yopmail.com', NULL, 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, 'g2o2X9WTym00t5704172h9OwDs31I6UkTV5xv1sc', '2024-04-25 12:46:45', 0, '2022-04-07 04:44:35', '2024-07-16 10:13:49'),
(5, 'John', 'Corner', '$2b$10$zcEGzcJ9vYNoZhqcsNCC4ehDswVzyzXtF/vDAlmJTtZGOzX9zdT.K', 'johncorner@yopmail.com', NULL, 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2022-07-09 04:19:32', '2024-07-16 10:13:50'),
(6, 'dev 122', 'kumar11', '$2b$10$yHQXpCskOVg4rFjQZkEqoeiO6phONCWfQ4YPxcsSB5Eoc5fP4IrFS', 'devod0485s@gmail.com', '1212121221', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-04-17 06:02:29', '2024-07-16 10:13:50'),
(7, 'dev2', 'kumar2', '$2b$10$qdnc73HJDr2YN2j1IV7oruCerbHsle5j6/b5vgV6ejA2zCMfg7nM2', 'devod0485ss@gmail.com', NULL, 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-04-24 04:45:04', '2024-07-16 10:13:50'),
(10, 'devtestavinash', 'pandey', '$2b$10$9XNNYlleRdKVSMc54qVYuuxO3BwBZPeocEJ.CRJZ7i8mimDAyg9ki', 'Avinash_Pandey@odzservices.com', '9455963581', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, 'Ojr2S5LC2soKbA10EUM5tdEbUqBOA3bJLl6z6P5X', '2024-05-24 15:57:28', 0, '2024-05-06 10:09:43', '2024-07-16 10:13:50'),
(11, 'Test', 'User', '$2b$10$yGlobIqzFTDJB7RkRt6nAOIqNda/MYlmm7kv/9SwyHXnoms6Cemva', 'avi488@gmail.com', '9455963581', 'email', 'user', '[\"1\"]', NULL, '', 0, 0, '', 0, '', '', '', NULL, NULL, 0, '2024-05-24 13:48:41', '2024-07-19 03:48:54'),
(12, 'avinash', 'pandey', '$2b$10$tkYKfcb/da.0JIvf6nk0IuisAZ9tC/2IIxMKIJtHyI6DNZ8EalBJe', 'abcd1234@gmail.com', '9876543210', 'email', 'user', '[\"1\",\"2\"]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-06-03 12:29:38', '2024-07-16 10:13:50'),
(14, 'avinash', 'test', '$2b$10$Vmdw1I7hUKXyx0IVfQLdS.R4o81Uxxn0f2pDReJeG.KAzE1uQ.PhO', 'devtest6785@gmail.com', '9876543210', 'email', 'user', '[\"1\",\"2\"]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-06-04 10:42:49', '2024-07-16 10:13:51'),
(15, 'Super', 'Admin', '$2b$10$QnnPuZW7nQPjFIFqn0ByqeNIvtmOUsz1FrCRBcUKcUSdrwdrGNwJ6', 'superAdmin@gmail.com', '9455963581', NULL, 'superadmin', '[]', 'upload_340823d0e7778b92e3cc8288389fc6cb.jpg', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2021-02-01 00:00:00', '2024-07-16 10:13:51'),
(21, 'Anava', 'Home', '$2b$10$nnnOR2u7WpoKi5cJ1fMjk.hV85gEQ1eH/WXSoC15VCth4ZVxD7JRa', 'anavahome57@gmail.com', '5613500529', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-08-14 17:12:26', '2024-08-14 17:12:26'),
(22, 'testing', 'client02', '$2b$10$Jlq9lXNsB6pq7uqM5kTu2eEYoVUIa.9APpNGG1DDwGdfzvOOlLl7.', 'testingclient02@gmail.com', '5057350238', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 1, '2024-09-02 08:28:39', '2024-09-02 10:34:46'),
(23, 'testing', 'client03', '$2b$10$LDGbkJhMaZIgjXTuDbe5Ru7gLgPRleKm7qUl2/b.KUKoDCPL9I5pq', 'testingclient03@gmail.com', '5057350238', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-09-02 08:37:24', '2024-09-02 08:37:24'),
(24, 'test', 'client 04', '$2b$10$QSz66aJb/8yolmHXCRPhx.muWGeRSl8DSrQHUWH0Foa4B8Xxq3PtW', 'testingclient04@gmail.com', '5057350238', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-09-02 10:37:47', '2024-09-02 10:37:47'),
(25, 'TEST 6', 'Test 6', '$2b$10$kM.cuiRUA1lHUmeVd9wFrOLJfyWKx6vNgX3y8c/0uQ.jK5.E9g1Oq', 'c.a.z.rattle@gmail.com', '3055556565', 'email', 'user', '[]', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, 0, '2024-09-04 13:52:13', '2024-09-04 13:52:13');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_lists`
--
ALTER TABLE `contact_lists`
  MODIFY `contact_list_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phonenumbers`
--
ALTER TABLE `phonenumbers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT for table `userLogs`
--
ALTER TABLE `userLogs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
