-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 01 Cze 2019, 09:07
-- Wersja serwera: 5.7.26-0ubuntu0.18.04.1
-- Wersja PHP: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `projekty_dev`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `academic_year`
--

CREATE TABLE `academic_year` (
  `id` int(11) NOT NULL,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `academic_year`
--

INSERT INTO `academic_year` (`id`, `name`) VALUES
(2, '2018/19');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `subject` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_public` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `from_role` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `programing_language`
--

CREATE TABLE `programing_language` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `programing_language`
--

INSERT INTO `programing_language` (`id`, `name`) VALUES
(1, 'Java SE'),
(2, 'Java EE'),
(3, 'Spring'),
(4, 'PHP'),
(5, 'Laravel'),
(6, 'Angular'),
(7, 'Android'),
(8, 'React'),
(9, 'C'),
(10, 'C++'),
(11, 'C#'),
(13, 'Lumen'),
(17, 'Kotlin'),
(18, 'java'),
(19, 'Bash'),
(20, 'SDL2'),
(21, 'CMake'),
(22, 'Python'),
(23, 'Heroku'),
(24, 'Django'),
(25, 'JavaFX'),
(26, 'Hibernate'),
(27, 'PostgreSQL'),
(28, 'HTML'),
(29, 'CSS'),
(30, 'Bootstrap');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_id` int(11) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `release_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mentoring` int(11) NOT NULL,
  `academic_year_id` int(11) NOT NULL,
  `featured` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project_history`
--

CREATE TABLE `project_history` (
  `id` int(11) NOT NULL,
  `subject` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project_language`
--

CREATE TABLE `project_language` (
  `project_id` int(11) NOT NULL,
  `programing_language_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project_student`
--

CREATE TABLE `project_student` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `accepted` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'Stworzony'),
(2, 'Przesłany do akceptacji'),
(3, 'Aktywny'),
(4, 'Przesłano do poprawy'),
(5, 'Poproszono o edycję'),
(6, 'W trakcie edycji');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `index_no` char(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `field` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(56) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `worker`
--

CREATE TABLE `worker` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(56) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `worker_academic_year`
--

CREATE TABLE `worker_academic_year` (
  `worker_id` int(11) NOT NULL,
  `academic_year_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `academic_year`
--
ALTER TABLE `academic_year`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indeksy dla tabeli `programing_language`
--
ALTER TABLE `programing_language`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `worker_id` (`worker_id`),
  ADD KEY `created_by` (`student_id`),
  ADD KEY `academic_year_id` (`academic_year_id`);

--
-- Indeksy dla tabeli `project_history`
--
ALTER TABLE `project_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indeksy dla tabeli `project_language`
--
ALTER TABLE `project_language`
  ADD KEY `project_id` (`project_id`),
  ADD KEY `programing_language_id` (`programing_language_id`);

--
-- Indeksy dla tabeli `project_student`
--
ALTER TABLE `project_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indeksy dla tabeli `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `worker`
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `worker_academic_year`
--
ALTER TABLE `worker_academic_year`
  ADD KEY `worker_id` (`worker_id`,`academic_year_id`),
  ADD KEY `academic_year_id` (`academic_year_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `academic_year`
--
ALTER TABLE `academic_year`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `programing_language`
--
ALTER TABLE `programing_language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT dla tabeli `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `project_history`
--
ALTER TABLE `project_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `project_student`
--
ALTER TABLE `project_student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `worker`
--
ALTER TABLE `worker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

--
-- Ograniczenia dla tabeli `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`worker_id`) REFERENCES `worker` (`id`),
  ADD CONSTRAINT `project_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `project_ibfk_4` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_year` (`id`);

--
-- Ograniczenia dla tabeli `project_history`
--
ALTER TABLE `project_history`
  ADD CONSTRAINT `project_history_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

--
-- Ograniczenia dla tabeli `project_language`
--
ALTER TABLE `project_language`
  ADD CONSTRAINT `project_language_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `project_language_ibfk_2` FOREIGN KEY (`programing_language_id`) REFERENCES `programing_language` (`id`);

--
-- Ograniczenia dla tabeli `project_student`
--
ALTER TABLE `project_student`
  ADD CONSTRAINT `project_student_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `project_student_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`);

--
-- Ograniczenia dla tabeli `worker_academic_year`
--
ALTER TABLE `worker_academic_year`
  ADD CONSTRAINT `worker_academic_year_ibfk_1` FOREIGN KEY (`worker_id`) REFERENCES `worker` (`id`),
  ADD CONSTRAINT `worker_academic_year_ibfk_2` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_year` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
