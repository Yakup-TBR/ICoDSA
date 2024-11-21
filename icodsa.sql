-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 21 Nov 2024 pada 10.52
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `icodsa`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `abouts`
--

CREATE TABLE `abouts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `about_img` varchar(255) DEFAULT NULL,
  `about_desc` text DEFAULT NULL,
  `event_dd` varchar(255) DEFAULT NULL,
  `event_mmyy` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `abouts`
--

INSERT INTO `abouts` (`id`, `about_img`, `about_desc`, `event_dd`, `event_mmyy`, `created_at`, `updated_at`) VALUES
(1, 'aboutImg/FeWsNfmp6g4o82nhDc96Q1wyvD8lKIK7k6OFpkP9.jpg', 'The rapid evolution of contemporary computing technology has propelled individuals to generate an unprecedented volume of data, characterized by both its size and diversity—a phenomenon unparalleled in the annals of computing history. This surge in data has sparked a compelling need for effective processing and analysis, captivating the attention of researchers who endeavor to propose innovative solutions. In response to this burgeoning interest, the 7th International Conference on Data Science and Its Applications (ICoDSA)', '12-143', 'Nov, 20262', NULL, '2024-11-19 00:38:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `address`
--

CREATE TABLE `address` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `place` text DEFAULT NULL,
  `address_additional_info` text DEFAULT NULL,
  `google_map_link` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `address`
--

INSERT INTO `address` (`id`, `place`, `address_additional_info`, `google_map_link`, `created_at`, `updated_at`) VALUES
(1, 'Venue: Aston Kuta Hotel & Residence', 'Contacts : icodsa@telkomuniversity.ac.id\ncommdis.telkomuniversity.ac.id/icodsa/2025', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15841.007308494252!2d107.6333703!3d-6.979583999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e90a668fe391%3A0xe9196014c45f91dc!2sSMA%20Telkom%20Bandung!5e0!3m2!1sid!2sid!4v1731249189796!5m2!1sid!2sid', NULL, '2024-11-10 13:33:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `article`
--

CREATE TABLE `article` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `article_img` varchar(255) DEFAULT NULL,
  `article_title` varchar(255) DEFAULT NULL,
  `article_description` text DEFAULT NULL,
  `article_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `article`
--

INSERT INTO `article` (`id`, `article_img`, `article_title`, `article_description`, `article_link`, `created_at`, `updated_at`) VALUES
(8, '/storage/uploads/54fceb0c-e52e-49ab-8864-f7e2dc5411af.jpg', 'Tes', 'Article About Icodsa', 'https://laravel.com/docs/11.x/migrations', '2024-11-07 04:29:52', '2024-11-07 08:03:37'),
(9, '/storage/uploads/e6e7102a-95c4-49d9-b458-73642cbaacd2.jpg', 'updatebali.com', 'Conference ICoDSA, Ajang Men Deliver Ilmu Pengetahuan Konsisten Digelar Hingga Tahun Ini', 'https://stackoverflow.com/questions/2771171/control-the-dashed-border-stroke-length-and-distance-between-strokes', '2024-11-07 04:30:16', '2024-11-07 16:34:46'),
(12, '/storage/uploads/16ce18ac-1a63-481f-8970-11702ddfff7e.jpg', 'Tes 2', 'Conference ICoDSA, Ajang Men Deliver Ilmu Pengetahuan Konsisten Digelar Hingga Tahun Ini', 'https://stackoverflow.com/questions/2771171/control-the-dashed-border-stroke-length-and-distance-between-strokes', '2024-11-19 12:00:10', '2024-11-19 12:00:10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `author_information`
--

CREATE TABLE `author_information` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `author_subtitle` varchar(255) DEFAULT NULL,
  `author_text` text DEFAULT NULL,
  `author_button_text` varchar(255) DEFAULT NULL,
  `author_button_link` varchar(255) DEFAULT NULL,
  `author_add` enum('subtitle','text','button') NOT NULL DEFAULT 'subtitle',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `author_information`
--

INSERT INTO `author_information` (`id`, `author_subtitle`, `author_text`, `author_button_text`, `author_button_link`, `author_add`, `created_at`, `updated_at`) VALUES
(1, 'Paper Submission', NULL, NULL, NULL, 'subtitle', '2024-10-23 04:31:08', '2024-10-23 04:31:08'),
(2, NULL, 'Prospective authors are invited to submit full papers of 4-6 pages (including tables, figures and references) in standard IEEE double-column format. Please submit your paper via https://edas.info/newPaper.php?c=32055. New users are required to register with EDAS before paper submission. Each full registration for the conference will cover one paper.', NULL, NULL, 'text', '2024-10-23 04:31:16', '2024-10-23 04:31:16'),
(8, 'Preparation of Contributions', NULL, NULL, NULL, 'subtitle', '2024-10-23 04:41:57', '2024-10-23 04:41:57'),
(10, NULL, 'NOTE:\nPlease note that we use a double-blind review process, so authors’ names and affiliations should not be written in the paper. This is necessary to ensure fairness in the review process.', NULL, NULL, 'text', '2024-10-23 04:42:13', '2024-10-23 04:42:13'),
(14, NULL, NULL, 'Ke Youtube!', 'https://www.youtube.com/watch?v=Rdh-RdqX2vU&t=1302s', 'button', '2024-10-27 09:56:30', '2024-10-27 09:56:30'),
(20, NULL, NULL, 'maps', 'https://www.google.com/maps/place/SMA+Telkom+Bandung/@-6.979584,107.6333703,15z/data=!4m6!3m5!1s0x2e68e90a668fe391:0xe9196014c45f91dc!8m2!3d-6.9736013!4d107.6260584!16s%2Fg%2F11rqkllw95?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D', 'button', '2024-11-10 07:09:08', '2024-11-10 07:09:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `copyright`
--

CREATE TABLE `copyright` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `copyright_text` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `copyright`
--

INSERT INTO `copyright` (`id`, `copyright_text`, `created_at`, `updated_at`) VALUES
(1, 'ICoDSA 2024', '2024-11-07 06:48:27', '2024-11-19 11:38:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `documentation_img`
--

CREATE TABLE `documentation_img` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `documentation_img` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `documentation_img`
--

INSERT INTO `documentation_img` (`id`, `documentation_img`, `created_at`, `updated_at`) VALUES
(3, '/storage/uploads/1751ae40-29b3-4108-a714-c9fe13901cb1.jpg', '2024-11-07 03:42:25', '2024-11-07 03:42:25'),
(4, '/storage/uploads/f9eca6bd-baa8-455a-9f9d-b7dc8de6f24d.jpg', '2024-11-07 03:42:35', '2024-11-07 03:42:35'),
(5, '/storage/uploads/5d759a53-2ab4-4a15-a33f-2a9f947b14f0.jpg', '2024-11-07 04:11:56', '2024-11-07 04:11:56'),
(6, '/storage/uploads/90db3f82-e621-4169-a981-204df9f8f6bc.jpg', '2024-11-07 04:15:31', '2024-11-07 04:15:31'),
(7, '/storage/uploads/19640374-bdae-4eba-8f71-bab26831abcd.jpg', '2024-11-07 04:36:04', '2024-11-07 04:36:04'),
(9, '/storage/uploads/b5205af2-7ae6-4847-bf55-5a97932e6bf6.jpg', '2024-11-07 15:21:08', '2024-11-07 15:21:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `documentation_link`
--

CREATE TABLE `documentation_link` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `documentation_cloud` varchar(255) DEFAULT NULL,
  `video_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `documentation_link`
--

INSERT INTO `documentation_link` (`id`, `documentation_cloud`, `video_link`, `created_at`, `updated_at`) VALUES
(1, 'https://laravel.com/docs/6.x/migrations', 'https://www.youtube.com/embed/2KnuZaqjvo4?si=IG858hGLqLr1OrXs', NULL, '2024-11-13 04:41:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `homes`
--

CREATE TABLE `homes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `place_date` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `home_bg` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `homes`
--

INSERT INTO `homes` (`id`, `title`, `place_date`, `description`, `home_bg`, `created_at`, `updated_at`) VALUES
(1, 'ICoDSA 2027', 'Bali, July 10-11, 2025', 'The 7th International Conference on Data Science The7thInternational Conference on Data Science and  ts Application', 'backgrounds/68uDrWyXwYHMSZ7B2qguLZ1ARAExMyeSIjamoWRA.jpg', NULL, '2024-11-19 00:39:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `home_button_link`
--

CREATE TABLE `home_button_link` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `submit_here_link` text DEFAULT NULL,
  `presentation_schedule_link` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `home_button_link`
--

INSERT INTO `home_button_link` (`id`, `submit_here_link`, `presentation_schedule_link`, `created_at`, `updated_at`) VALUES
(1, 'https://laravel.com/docs/7.x/migrations', 'https://getbootstrap.com/docs/5.3/components/modal/#how-it-works', '2024-11-07 07:08:57', '2024-11-07 12:23:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `home_host_logos`
--

CREATE TABLE `home_host_logos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `host_logo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `home_host_logos`
--

INSERT INTO `home_host_logos` (`id`, `host_logo`, `created_at`, `updated_at`) VALUES
(19, 'host_logos/e8pa6byvyImlKrBrMPscnFGUJAiWAMhs3dQkO4ka.png', '2024-11-07 06:13:46', '2024-11-07 06:13:46'),
(23, 'host_logos/VkW7oygjS29ohvx5hSNWdWXauVnjvrjtZwwT1iZa.png', '2024-11-10 23:35:36', '2024-11-10 23:35:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `important_date`
--

CREATE TABLE `important_date` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `activity` varchar(255) DEFAULT NULL,
  `activity_icon` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `important_date`
--

INSERT INTO `important_date` (`id`, `activity`, `activity_icon`, `event_date`, `created_at`, `updated_at`) VALUES
(1, 'Upload Paper', '/storage/uploads/684f8974-fcae-4c31-9f3c-dad99955c182.png', '2024-10-15', '2024-10-27 09:58:22', '2024-10-27 09:58:22'),
(9, 'Upload Paper 2', '/storage/uploads/37fd1102-9483-453f-a87b-918d04d5e75c.png', '2024-11-12', '2024-11-19 04:39:45', '2024-11-19 04:39:45'),
(10, 'Upload Paper 3', '/storage/uploads/6cbfd7e3-a4b2-4bfb-adad-4f68a4028fb1.png', '2024-10-31', '2024-11-19 04:39:58', '2024-11-19 04:39:58'),
(11, 'Upload Paper 4', '/storage/uploads/b717c0ba-acf7-4d9c-a4bc-2d7b5a184f6c.png', '2024-10-31', '2024-11-19 11:57:01', '2024-11-19 11:57:01'),
(12, 'Upload Paper 4', '/storage/uploads/fc7b4a1f-fa88-4a75-8972-f1e85e48550b.png', '2024-11-17', '2024-11-19 11:57:09', '2024-11-19 11:57:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `important_date_bg`
--

CREATE TABLE `important_date_bg` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `important_date_bg` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `important_date_bg`
--

INSERT INTO `important_date_bg` (`id`, `important_date_bg`, `created_at`, `updated_at`) VALUES
(1, 'backgrounds/5B5mkEzCttUmUSl15CoFrpJIyQcvt9jpRGESALzg.jpg', '2024-10-31 03:52:14', '2024-11-07 16:25:32');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(14, '0001_01_01_000000_create_users_table', 1),
(15, '0001_01_01_000001_create_cache_table', 1),
(16, '2024_10_06_105711_create_posts_table', 1),
(17, '2024_10_06_105830_create_personal_access_tokens_table', 1),
(18, '2024_10_06_185535_create_homes_table', 1),
(19, '2024_10_06_205221_create_abouts_table', 1),
(20, '2024_10_06_211339_create_speakers_table', 1),
(21, '2024_10_08_230332_create_home_host_logos_table', 1),
(22, '2024_10_13_083845_create_tutorials_table', 1),
(23, '2024_10_13_130809_create_important_date_table', 1),
(24, '2024_10_13_144227_create_important_date_bg_table', 1),
(25, '2024_10_13_163352_create_topics_table', 1),
(26, '2024_10_23_025655_create_author_information_table', 1),
(27, '2024_10_23_132828_create_registration_table', 2),
(28, '2024_10_31_143106_create_program_committees_table', 3),
(29, '2024_10_31_143124_create_reviewers_table', 3),
(30, '2024_10_31_201047_create_pricing_table', 4),
(31, '2024_11_06_102825_create_personal_access_tokens_table', 5),
(32, '2024_11_06_090334_create_personal_access_tokens_table', 6),
(33, '2024_11_06_202649_create_payment_methods_table', 7),
(34, '2024_11_07_075248_create_article_table', 8),
(35, '2024_11_07_075258_create_speakers_table', 9),
(36, '2024_11_07_103646_create_documentation_img_table', 10),
(37, '2024_11_07_103658_create_documentation_link_table', 10),
(38, '2024_11_07_104902_create_documentation_link_table', 11),
(39, '2024_11_07_114139_create_documentation_img_table', 12),
(40, '2024_11_07_124157_create_address_table', 13),
(41, '2024_11_07_124629_create_address_table', 14),
(42, '2024_11_07_134431_create_address_table', 15),
(43, '2024_11_07_140033_create_sponsored_by_table', 16),
(44, '2024_11_07_141953_create_supported_by_table', 17),
(45, '2024_11_07_143958_create_copyright_table', 18),
(46, '2024_11_07_145548_create_home_button_link_table', 19);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_details` text DEFAULT NULL,
  `payment_additional_info` text DEFAULT NULL,
  `method_or_info` enum('method','info') NOT NULL DEFAULT 'method',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `payment_method`, `payment_details`, `payment_additional_info`, `method_or_info`, `created_at`, `updated_at`) VALUES
(3, '1) Virtual Account', 'Virtual Account Number: 8321066202400006 \nAccount Holder Name: Telkom University \nBank Name: Bank Negara Indonesia (BNI) \nBank Branch: Perintis Kemerdekaan \n*Use BNI Mobile Apps or BNI ATM only', NULL, 'method', '2024-11-06 13:07:52', '2024-11-06 13:40:45'),
(4, '2) Bank Transfer', 'Bank Name : Bank Mandiri \nSwift Code : BMRIIDJA \nBeneficiary name/Recipient name : Universitas Telkom\nBeneficiary Bank Account No : 1310095019917 \nBranch: Bank Mandiri KCP Bandung Martadinata Bank\nAddress : Jl. R.E. Martadinata No.103. Kota Bandung, Jawa Barat Indonesia 40115 \nCity: Bandung \nCountry: Indonesia', NULL, 'method', '2024-11-06 13:08:08', '2024-11-06 13:40:14'),
(5, '3) PayPal', 'Please follow these steps: \n\n1.Log in to your PayPal account.\n2. Send the payment to harry.gunawan.putu@gmail.com.\n3.Enter the amount corresponding to the conference fee, including the full registration fee plus a 5% PayPal currency conversion fee.\n4. Include your paper ID information in the payment note.\nAfter completing the payment, please send your payment confirmation along with your full name and registration number to icodsa@telkomuniversity.ac.id.', NULL, 'method', '2024-11-06 13:08:29', '2024-11-06 13:08:29'),
(6, NULL, NULL, 'Additional Information for International Transfer: \nContact: icodsa@telkomuniversity.ac.id \n\nPlease be noted that to be indexed by IEEE, the paper must be presented at the conference.', 'info', '2024-11-06 13:08:55', '2024-11-06 13:28:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(42, 'App\\Models\\User', 1, 'ICoDSA', 'b2b9f1e6297384ee74860e7bd6a306095d701ef4dc48ba0b146f8e0184bb57af', '[\"*\"]', NULL, NULL, '2024-11-19 00:37:04', '2024-11-19 00:37:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pricing`
--

CREATE TABLE `pricing` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `price_label` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `price_idr` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pricing`
--

INSERT INTO `pricing` (`id`, `price_label`, `price`, `price_idr`, `created_at`, `updated_at`) VALUES
(4, 'Author (Non-Member)', 400, '(6000K IDR)', '2024-11-01 18:47:27', '2024-11-07 14:39:44'),
(5, 'Author (Member)', 500, '(90000K IDR)', '2024-11-06 13:01:46', '2024-11-07 14:40:28'),
(6, 'Member', 22, '30000', '2024-11-10 06:24:50', '2024-11-13 04:40:55'),
(7, 'Author (Member)', 400, '(500000 IDR)', '2024-11-19 11:58:35', '2024-11-19 11:58:35'),
(8, 'Author (Member)', 49, '(10000 IDR)', '2024-11-19 11:59:31', '2024-11-19 11:59:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `program_committees`
--

CREATE TABLE `program_committees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `committee_position` varchar(255) DEFAULT NULL,
  `committee_members` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `program_committees`
--

INSERT INTO `program_committees` (`id`, `committee_position`, `committee_members`, `created_at`, `updated_at`) VALUES
(4, 'Steering Committee:', 'Prof. Dr. Adiwijaya (Telkom University, Indonesia) \nProf. Datuk Ts. Dr. Ahmad Fauzi Bin Ismail (UniversitiTeknologi Malaysia, Malaysia)', '2024-10-31 09:03:54', '2024-11-19 11:39:48'),
(5, 'General Chair:', 'Assoc. Prof. Dr. Putu Harry Gunawan (Telkom University, Indonesia)', '2024-10-31 09:04:03', '2024-10-31 09:04:03'),
(6, 'Technical Program Committee Chair:', 'Dr. Hilal Hudan Nuha, S.T., M.T. (Telkom University, Indonesia) \nDr. Fuad Abdul Galeel A. G. (Universiti Teknologi Malaysia, Malaysia) \nProf. Dr. I.K.G. Bendesa, M.A.D.E (Universitas Bali Internasional, Indonesia) \nDr. I Ketut Tunas, M.Si. (Universitas Bali Internasional, Indonesia) \nGde Palguna Reganata, S.Si., M.Si. (Universitas Bali Internasional, Indonesi)', '2024-10-31 09:04:15', '2024-11-10 13:28:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `registration`
--

CREATE TABLE `registration` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `registration_subtitle` varchar(255) DEFAULT NULL,
  `registration_text` text DEFAULT NULL,
  `registration_button_text` varchar(255) DEFAULT NULL,
  `registration_button_link` varchar(255) DEFAULT NULL,
  `registration_add` enum('subtitle','text','button') NOT NULL DEFAULT 'subtitle',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `registration`
--

INSERT INTO `registration` (`id`, `registration_subtitle`, `registration_text`, `registration_button_text`, `registration_button_link`, `registration_add`, `created_at`, `updated_at`) VALUES
(4, 'PDF Express', NULL, NULL, NULL, 'subtitle', '2024-10-31 06:09:57', '2024-10-31 06:09:57'),
(8, NULL, 'Prospective authors are invited to submit full papers of 4-6 pages (including tables, figures and references) in standard IEEE double-column format. Please submit your paper via https://edas.info/newPaper.php?c=32055. New users are required to register with EDAS before paper submission. Each full registration for the conference will cover one paper.', NULL, NULL, 'text', '2024-10-31 06:22:22', '2024-10-31 06:22:22'),
(10, NULL, NULL, 'Submit here!', 'https://news.detik.com/', 'button', '2024-10-31 06:23:22', '2024-10-31 06:23:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `reviewers`
--

CREATE TABLE `reviewers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reviewer_name` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `reviewers`
--

INSERT INTO `reviewers` (`id`, `reviewer_name`, `created_at`, `updated_at`) VALUES
(1, 'Prof. Dr. Ali Selamat (Malaysia-Japan International Institute Of Technology, MY)', '2024-11-19 10:42:05', '2024-11-19 10:42:05'),
(2, 'Prof. Dr. Arif Muntasa, (University Of Trunojoyo, Indonesia)', '2024-11-19 10:42:05', '2024-11-19 10:42:05'),
(3, 'Prof. Dr. Haueisen (Universitat Ilmenau, Germany)', '2024-11-19 10:42:05', '2024-11-19 10:42:05'),
(4, 'Prof. Dr. Mohd Shahrizal Bin Sunar (Universiti Teknologi Malaysia, Malaysia)', '2024-11-19 10:42:05', '2024-11-19 10:42:05'),
(5, 'Prof. Dr. Muhammad Suzuri Hitam, (Universiti Malaysia Terengganu, My)', '2024-11-19 10:42:05', '2024-11-19 10:42:05'),
(6, 'Prof. Dr. Oshita (Kyushu Institute Of Technology, Japan)', '2024-11-19 10:42:05', '2024-11-19 10:42:05'),
(7, 'Prof. Dr. Sri Redjeki Pudjaprasetya, (Bandung Institute Of Technology, Indonesia)', '2024-11-19 10:42:05', '2024-11-19 10:42:05'),
(8, 'Prof. Dr. Tong Boon Tang (Universiti Teknologi Petronas, Malaysia)', '2024-11-19 10:42:05', '2024-11-19 10:42:05');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0McwJAoZU2kWRAILzhEVJNYEkrsq82NENuP4Zqaw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMFpWa1hIdDhCVE9yNmJQWHRSRWF0U3loVDZaemRBZ296RllraFhWVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730373605),
('1ivq6LXXCoiJGKTd2RJODYwXaIIiTqaCaLHwlDri', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNHhRUmZ0azZTNUNrbEhueUJ6MERNVkJOVVdHWTI4bGtLVUxjTXcwRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731273691),
('3tq5mOWn0kDXmNaBrUw4ze2sIKaweIDmU2bCQs22', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaUEzWTJNOHdDVzB4Wm1oOHI3eTduZFJnSERPWU13V2VJT1dSZ1VQTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731136308),
('4SvSC9cvfLfBsvYfBZhfUlo8SBNhfRL0KXrQTwka', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV1ZUeXhwVXo1MWoxVlR1WmpWQTJwS0E1VVhKeU5QQlNQWUMxMzE1TCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730457206),
('81ipUvO3IoyOGwtWhaR21bc6g1orMiQKXXAcepAk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWVBXc3g3S2pBakU3WDdJNVhtWVh2QWZhVzBMOTN1SG1NTmhrMzhnNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731235339),
('9UK5PO23h8EE6LoWOxNQcmNX5jHsMap35a7OkDdw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicnlQNFZQS3NPVWRNVWRIQjZ4MGN4eVhJaU5ESU5OR3MzUnE2a3Y5MyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730965619),
('AU84zY2RGevD4ujO88LK03PNM1Zu1kL7RwBGfWjh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ2RyUUJTQUhqb3dLWTVESEE4V1FkV0xrSE8wQmJuN1VkdUxXY3RmQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731003312),
('DN7WKJZCKOoqDKeLFyQMU7L5sN9rmdeb08FzZSLV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMk9MS3FEdXE3eFZKclM3elFXZXE3YU96NDR0ZDZUMXoyd05idEhvTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730922349),
('ET3Se7PRCwS28wb8kicWiUWRUaUASG9QKoXl1REq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT1FyUUF1V05UYmNIN2tjSjFuM1MyRlRFNk9XaHphOWlhVVoyME9IWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730982444),
('JYTkOtTEhCSu1wwlcTj9Qby8UrPxAKHCyKuN7Ygo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNFJkSnhLeUR5NHBUalN6b2dSaXJEbE56TWpYekU5Z2hvODlJNjFQRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731034548),
('MgLCcEwUYtgJWzAIjquj0vST7GpcoO3WIczSbeuk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUWNiUVhnMmY2RGw0akk0MksyazZCWmZqdEdlT0pxMzhnTFVKemFBVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730291292),
('MHxXOTGzmSufh6guNNAyXbs0na95beKO79gt7uNe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2RFNElkNmkyT0VjR3J4a3ZRQlE3T2dhdm9hdDJVajJjOVNEVTVWeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731248050),
('ouNmeja0AWJgMLNfRck9sBn3rqEKA0PIDtC400Mj', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibElyaTY2REdBTVB5SUdjcmI5ZTJSWGJQWjhrRnBBdUpzNTk0aGluYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730515575),
('qgkS9PYvmFOVubbh9iP7Km420P1gfr94yQ7GlzQI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYUJqUk1wWWdKYmttUHN2Qkk5dDhxQW83SlMzM09CUlVDVTM3cmJpNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730310720),
('RTlHvCoXU8nQMV3Jhw12HsZ5Jythz9G5AYp9RcX8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiak96cXpnSVBwU2dvYjU0dTVPRkg2UElIZlVMUGEzWm91dTdxUmE3MiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730888718),
('SqJ8v6IoQUKTkjWFUEPUoyenHqg9wfyC7LTBPuXD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTzJaYlNURTJRcW0wUEpHdzJjSjNsUlFsemxTOU5VOEZ0c014VDBTMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731851008),
('SRuuvHDCMhDCTDQpjTjOV1ZfGu6MmdTpLPJEPCp0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWFpSQkRReEk5cHBuZzg2Y25xeFI0ZzlQU3YxQ3ZTd1dvMmFxN3V2WCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730880154),
('stzzPLnJgHkkSbzcBOok82b9LUMR0ycXKAYgkVPy', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUEEyTHpYNlF6R2piQkN1dm4yeU9EeHJSNmpGNFVSNFhXSE9wTEpjSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731854104),
('V2kJqvB3JhZR9duzvkygfjIpjkXaQcR0ufS8WGsV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUHM0QjBsMnY1enBEZ3hUbjc3cDhiaFc1cnhlY0JJaU5pc1gyV1A4QSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1732005380),
('Vm4marbHnYoXOXKg1fgZntMeqowBV9gQmigQ7umK', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRmY5alJuRGhtR2dlVTlFVHpEUFA1YXVLajFOc1pnOXZSaEZEZkJLMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730896386),
('xE96K1a1GmxxjiWTyCxydW5OmDA7cm3CgXNTQFUt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMTR2N2dOSWVtVmI5aDlHY0hVc3RnczZkWXVReER1RDVsdnlWWjVwdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730173450),
('yyfn2HSox6dokga1kF1Pi99bsB009j6iJ9QgOeju', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNlNRVUhNam9MSWg3aGhZc0tRZ0dkaFhCMTdHSVNxSllpN1VlNkNrbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730087718);

-- --------------------------------------------------------

--
-- Struktur dari tabel `speakers`
--

CREATE TABLE `speakers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `speakers_img` varchar(255) DEFAULT NULL,
  `speakers_name` varchar(255) DEFAULT NULL,
  `speakers_desc` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `speakers`
--

INSERT INTO `speakers` (`id`, `speakers_img`, `speakers_name`, `speakers_desc`, `created_at`, `updated_at`) VALUES
(1, '/storage/uploads/91bedd82-84cb-452f-b923-65099fa4656c.jpg', 'Assoc. Prof. Dr. Hoshang Kolivand', 'School of Computer Science and Mathematics, Liverpool John Moores University, England', '2024-11-06 23:57:59', '2024-11-06 23:57:59'),
(2, '/storage/uploads/a30335ef-b036-4c0d-aa0e-653249d4e1ff.webp', 'Assoc. Prof. Dr. Hoshang Kolivand', 'School of Computer Science and Mathematics, Liverpool John Moores University, England', '2024-11-06 23:58:16', '2024-11-06 23:58:16'),
(7, '/storage/uploads/c3de91a0-a341-43a4-964e-464f722520e9.jpg', 'Assoc. Prof. Dr. Hoshang Kolivand', 'School of Computer Science and Mathematics, Liverpool John Moores University, England', '2024-11-19 11:55:52', '2024-11-19 11:55:52'),
(8, '/storage/uploads/c541b33f-cf81-4085-b3bb-5b3555a2c295.jpg', 'Assoc. Prof. Dr. Hoshang Kolivand', 'School of Computer Science and Mathematics, Liverpool John Moores University, England', '2024-11-19 11:56:06', '2024-11-19 11:56:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sponsored_by`
--

CREATE TABLE `sponsored_by` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sponsore_logo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sponsored_by`
--

INSERT INTO `sponsored_by` (`id`, `sponsore_logo`, `created_at`, `updated_at`) VALUES
(7, 'sponsors/QayJJvvpqoMEmv1p3cmOSNz7NU5K4UGtPKbUf5m0.png', '2024-11-07 14:58:49', '2024-11-07 14:58:49'),
(10, 'sponsors/JaGRc18JS24chUUj06R8aJPGmNGe4Ctkp9YZcigd.png', '2024-11-07 15:01:00', '2024-11-07 15:01:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `supported_by`
--

CREATE TABLE `supported_by` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `support_logo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `supported_by`
--

INSERT INTO `supported_by` (`id`, `support_logo`, `created_at`, `updated_at`) VALUES
(1, 'support_logos/u9zz6kl2tYgzCrjsqzoZ4cLJFrXLidn25EnJpBHC.png', '2024-11-07 06:27:38', '2024-11-07 06:27:38'),
(2, 'support_logos/HKLflgTycwsHEvd4mPv5l50iLs2JDHAlLprWMW2o.webp', '2024-11-07 06:27:43', '2024-11-07 06:27:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `topics`
--

CREATE TABLE `topics` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `topic_order` varchar(255) DEFAULT NULL,
  `topic_title` varchar(255) DEFAULT NULL,
  `topic_list` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `topics`
--

INSERT INTO `topics` (`id`, `topic_order`, `topic_title`, `topic_list`, `created_at`, `updated_at`) VALUES
(1, '01', 'Data Science', 'Data clustering and classifications\nStatistical model in data science\nMachine learning in data science\nData visualization\nData mining\nData intelligence\nBusiness intelligence and data warehousing\nCloud computing for Big Data\nData processing and analytics in IoT\nTools and applications in data science\nVision and future directions of data science\n\nCyber Security on data science', '2024-10-23 04:43:34', '2024-10-27 04:18:55'),
(2, '02', 'We Dev', 'Data clustering and classifications Statistical model in data science Machine learning in data science Data visualization Data mining Data intelligence Business intelligence and data warehousing Cloud computing for Big Data Data processing and analytics in IoT Tools and applications in data science Vision and future directions of data science Cyber Security on data science', '2024-10-27 04:20:07', '2024-10-27 18:44:48'),
(4, '03', 'Data Science', 'Data clustering and classifications\nStatistical model in data science\nMachine learning in data science\nData visualization\nData mining\nData intelligence\nBusiness intelligence and data warehousing\nCloud computing for Big Data\nData processing and analytics in IoT\nTools and applications in data science\nVision and future directions of data science', '2024-11-19 11:57:47', '2024-11-19 11:57:47'),
(5, '04', 'Web Dev', 'Data clustering and classifications\nStatistical model in data science\nMachine learning in data science\nData visualization\nData mining\nData intelligence\nBusiness intelligence and data warehousing\nCloud computing for Big Data\nData processing and analytics in IoT\nTools and applications in data science\nVision and future directions of data science', '2024-11-19 11:58:01', '2024-11-19 11:58:01');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tutorials`
--

CREATE TABLE `tutorials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `thumbail_img` varchar(255) DEFAULT NULL,
  `abstract` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `tutorials`
--

INSERT INTO `tutorials` (`id`, `thumbail_img`, `abstract`, `created_at`, `updated_at`) VALUES
(1, 'tutorialThumbs/NbpXCHJiR3R0436exUcnjySxC85TC4epBlgnICnb.png', 'The arrival of generative AI, especially ChatGPT, has revolutionized the educational landscape and offers unprecedented opportunities for personalized and interactive learning experiences. This tutorial examines the success of ChatGPT, powered by AI, as a learning assistant in data science and its wider applications. Using natural language processing capabilities, ChatGPT provides customized training, homework support, and real-time feedback, increasing students\' understanding of complex data science concepts. The tutorial will assess ChatGPT\'s effectiveness in supporting knowledge acquisition, engagement, and continuous learning.\n\n\nPlease fill the registration form Tutorial Session (required to upload transfer information):\nhttps://bit.ly/RegistTutorialICoDSA25', NULL, '2024-11-19 00:38:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', NULL, '$2y$12$QyZVJVfQ43Ya6ns8prGUy.bysgEcSq6fYURHJaeaYAafsueKo51Ry', NULL, '2024-11-06 04:03:00', '2024-11-06 04:03:00'),
(2, 'supri', 'supri@gmail.com', NULL, '$2y$12$QWM6tcub73G7BjwXopn04eYynNtBa6hidNPPJ/m395tg8o.Z47QQm', NULL, '2024-11-06 04:03:00', '2024-11-06 04:03:00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `abouts`
--
ALTER TABLE `abouts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `author_information`
--
ALTER TABLE `author_information`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `copyright`
--
ALTER TABLE `copyright`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `documentation_img`
--
ALTER TABLE `documentation_img`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `documentation_link`
--
ALTER TABLE `documentation_link`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `homes`
--
ALTER TABLE `homes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `home_button_link`
--
ALTER TABLE `home_button_link`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `home_host_logos`
--
ALTER TABLE `home_host_logos`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `important_date`
--
ALTER TABLE `important_date`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `important_date_bg`
--
ALTER TABLE `important_date_bg`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pricing`
--
ALTER TABLE `pricing`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `program_committees`
--
ALTER TABLE `program_committees`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `reviewers`
--
ALTER TABLE `reviewers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `speakers`
--
ALTER TABLE `speakers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sponsored_by`
--
ALTER TABLE `sponsored_by`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `supported_by`
--
ALTER TABLE `supported_by`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tutorials`
--
ALTER TABLE `tutorials`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `abouts`
--
ALTER TABLE `abouts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `address`
--
ALTER TABLE `address`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `article`
--
ALTER TABLE `article`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `author_information`
--
ALTER TABLE `author_information`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `copyright`
--
ALTER TABLE `copyright`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `documentation_img`
--
ALTER TABLE `documentation_img`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `documentation_link`
--
ALTER TABLE `documentation_link`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `homes`
--
ALTER TABLE `homes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `home_button_link`
--
ALTER TABLE `home_button_link`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `home_host_logos`
--
ALTER TABLE `home_host_logos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `important_date`
--
ALTER TABLE `important_date`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `important_date_bg`
--
ALTER TABLE `important_date_bg`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT untuk tabel `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pricing`
--
ALTER TABLE `pricing`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `program_committees`
--
ALTER TABLE `program_committees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `registration`
--
ALTER TABLE `registration`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `reviewers`
--
ALTER TABLE `reviewers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `speakers`
--
ALTER TABLE `speakers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `sponsored_by`
--
ALTER TABLE `sponsored_by`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `supported_by`
--
ALTER TABLE `supported_by`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `topics`
--
ALTER TABLE `topics`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `tutorials`
--
ALTER TABLE `tutorials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
