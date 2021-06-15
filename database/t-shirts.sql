-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 15, 2021 at 10:10 PM
-- Server version: 8.0.19
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `t-shirts`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id_cart_item` int NOT NULL,
  `id_user` int NOT NULL,
  `id_option` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id_cart_item`, `id_user`, `id_option`) VALUES
(196, 59, 63),
(197, 59, 66),
(198, 59, 76),
(199, 59, 70),
(200, 59, 49),
(201, 59, 63),
(202, 59, 49),
(203, 59, 63),
(204, 59, 63),
(205, 59, 62),
(206, 59, 49),
(207, 59, 63),
(210, 59, 62),
(211, 59, 63);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id_category` int NOT NULL,
  `category_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_category`, `category_name`) VALUES
(1, 'Auto'),
(2, 'IT'),
(3, 'Internet memes'),
(4, 'Music'),
(5, 'Holidays'),
(6, 'Humor');

-- --------------------------------------------------------

--
-- Table structure for table `categories_products`
--

CREATE TABLE `categories_products` (
  `id_category` int NOT NULL,
  `id_product` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories_products`
--

INSERT INTO `categories_products` (`id_category`, `id_product`) VALUES
(1, 2),
(1, 1),
(2, 4),
(4, 6),
(5, 8),
(3, 7),
(6, 9),
(6, 10),
(6, 11);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id_color` int NOT NULL,
  `color_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id_color`, `color_name`) VALUES
(1, 'White'),
(2, 'Yellow'),
(3, 'Orange'),
(4, 'Red'),
(5, 'Olive'),
(6, 'Black'),
(7, 'Gray');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id_customer` int NOT NULL,
  `username` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `second_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `matherials`
--

CREATE TABLE `matherials` (
  `id_matherial` int NOT NULL,
  `matherial_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `matherials`
--

INSERT INTO `matherials` (`id_matherial`, `matherial_name`) VALUES
(1, 'Cotton 100%'),
(2, 'Cotton 90%, Polyester 10%'),
(3, 'Cotton 95%, Viscose 5%');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id_option` int NOT NULL,
  `id_color` int NOT NULL,
  `id_size` int NOT NULL,
  `id_type` int NOT NULL,
  `id_product` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id_option`, `id_color`, `id_size`, `id_type`, `id_product`) VALUES
(49, 1, 1, 1, 1),
(51, 2, 1, 1, 1),
(52, 2, 2, 1, 1),
(53, 2, 2, 2, 2),
(54, 3, 2, 2, 2),
(55, 1, 2, 2, 2),
(56, 2, 1, 2, 2),
(58, 2, 1, 2, 1),
(59, 4, 3, 1, 1),
(60, 4, 3, 6, 1),
(61, 4, 1, 6, 1),
(62, 1, 1, 1, 4),
(63, 1, 1, 1, 7),
(64, 1, 4, 6, 7),
(65, 1, 1, 1, 6),
(66, 1, 1, 1, 2),
(67, 1, 4, 2, 9),
(68, 1, 3, 3, 4),
(69, 1, 4, 2, 1),
(70, 1, 1, 1, 9),
(71, 1, 1, 1, 8),
(72, 4, 4, 6, 7),
(73, 5, 3, 3, 4),
(74, 1, 1, 1, 11),
(75, 1, 3, 1, 7),
(76, 1, 1, 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id_order` int NOT NULL,
  `id_user` int NOT NULL,
  `id_order_status` int NOT NULL,
  `id_payment` int NOT NULL,
  `id_shipping_method` int NOT NULL,
  `address` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `zip_code` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `order_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id_order`, `id_user`, `id_order_status`, `id_payment`, `id_shipping_method`, `address`, `city`, `country`, `zip_code`, `phone_number`, `order_date`) VALUES
(168, 54, 1, 1, 1, 'Groove Streer, 8', 'Los Angeles', 'United States', '123498', '+1-987-136-31', '2021-06-15'),
(169, 54, 1, 1, 1, 'Green Steet. 52', 'Bronx', 'United States', '143-56', '+1-165453-55', '2021-06-15'),
(170, 60, 1, 1, 1, 'Lazurnaya 5', 'Mykolaiv', 'Ukraine', '57370', '+380661326451', '2021-06-15');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id_order_items` int NOT NULL,
  `id_order` int NOT NULL,
  `id_option` int NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id_order_items`, `id_order`, `id_option`, `price`) VALUES
(227, 168, 62, 40),
(228, 168, 49, 35),
(229, 168, 70, 33),
(230, 168, 65, 34),
(231, 169, 62, 40),
(232, 169, 70, 33),
(233, 169, 65, 34),
(234, 170, 63, 20),
(235, 170, 62, 40);

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `id_order_status` int NOT NULL,
  `status_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`id_order_status`, `status_name`) VALUES
(1, 'New'),
(2, 'Processing');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id_payment` int NOT NULL,
  `payment_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id_payment`, `payment_name`, `is_active`) VALUES
(1, 'Cash on delivery', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id_product` int NOT NULL,
  `id_matherial` int NOT NULL,
  `product_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `product_price` double(10,2) NOT NULL,
  `imgUrl` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id_product`, `id_matherial`, `product_name`, `product_price`, `imgUrl`) VALUES
(1, 2, 'Things i do in my spare time', 35.00, 'https://megafutbolka.com.ua/content/11357_uni_white_400_0.jpg'),
(2, 2, 'Tesla', 55.00, 'https://megafutbolka.com.ua/content/10852_uni_white_400_0.jpg'),
(4, 1, 'Sysadmin', 40.00, 'https://megafutbolka.com.ua/content/11359_uni_white_400_0.jpg'),
(6, 3, 'Hip Hop Einstein', 34.00, 'https://megafutbolka.com.ua/content/11283_uni_white_400_0.jpg'),
(7, 1, 'What?', 20.00, 'https://megafutbolka.com.ua/content/11351_uni_white_400_0.jpg'),
(8, 2, '2021', 49.00, 'https://megafutbolka.com.ua/content/11392_uni_white_400_0.jpg'),
(9, 3, 'I\'m your father', 33.00, 'https://megafutbolka.com.ua/content/11291_uni_white_400_0.jpg'),
(10, 3, 'Coffee just brew it', 11.00, 'https://megafutbolka.com.ua/content/11060_uni_white_400_0.jpg'),
(11, 2, 'No Brain, no pain', 21.00, 'https://megafutbolka.com.ua/content/11025_uni_white_400_0.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_methods`
--

CREATE TABLE `shipping_methods` (
  `id_shipping_method` int NOT NULL,
  `shipping_carrier` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `shipping_cost` double(10,2) NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `shipping_methods`
--

INSERT INTO `shipping_methods` (`id_shipping_method`, `shipping_carrier`, `shipping_cost`, `is_active`) VALUES
(1, 'Nova Poshta', 0.00, 1),
(3, 'Justin', 30.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id_size` int NOT NULL,
  `size_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id_size`, `size_name`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(4, 'XL');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id_type` int NOT NULL,
  `type_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id_type`, `type_name`) VALUES
(1, 'Men'),
(2, 'Women'),
(3, 'Unisex '),
(4, 'Kids'),
(5, 'Long Sleeve'),
(6, 'Ringer');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `user_full_name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `user_phone_number` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `user_full_name`, `user_phone_number`, `user_email`, `user_password`, `token`) VALUES
(54, 'Carl Johns', '+1-800-513-44-11', 'gflavocode1@gmail.com', '$2a$08$VElqcHOXfZI47YF/kqvDbOr7Dckglf70nNlc197Bj4MXrJND180Ju', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1NCwiaWF0IjoxNjIzNzgzODYzLCJleHAiOjE2MzE1NTk4NjN9.ffBNV_cL67az2WKN8Q8BoBiFcDvM_OZ--9qrvGdlUkk'),
(59, 'Marshall Mathers', '+1-800-911-88-88', 'slimshady@records.com', '$2a$08$fDZS3fW4yEnOxRL5y0gbQOsWZH2KG4ulp.J57NC2f6fWcXAGlfSw6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1OSwiaWF0IjoxNjIzNzgwODI5LCJleHAiOjE2MzE1NTY4Mjl9.MlnOFi2x_WMBp3mJv-4A9Zs80H760sOUKTNXQizrJ2k'),
(60, 'Garry Gosnell', '+380636324212', 'gosnell@gmail.com', '$2a$08$GiC8ELSaJ8yUYQ8.jKRvkO0pUvGNQY.D4O2wYQyHkGucS2Wo8l2LS', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id_cart_item`),
  ADD KEY `id_option` (`id_option`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `categories_products`
--
ALTER TABLE `categories_products`
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id_color`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indexes for table `matherials`
--
ALTER TABLE `matherials`
  ADD PRIMARY KEY (`id_matherial`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id_option`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `id_size` (`id_size`),
  ADD KEY `id_type` (`id_type`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_order_status` (`id_order_status`),
  ADD KEY `id_payment` (`id_payment`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_shipping_method` (`id_shipping_method`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id_order_items`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_option` (`id_option`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id_order_status`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id_payment`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `id_matherial` (`id_matherial`);

--
-- Indexes for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  ADD PRIMARY KEY (`id_shipping_method`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id_size`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id_type`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id_cart_item` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id_color` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id_customer` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `matherials`
--
ALTER TABLE `matherials`
  MODIFY `id_matherial` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id_option` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id_order_items` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=236;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id_order_status` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id_payment` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  MODIFY `id_shipping_method` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id_size` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id_type` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_3` FOREIGN KEY (`id_option`) REFERENCES `options` (`id_option`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `cart_items_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `categories_products`
--
ALTER TABLE `categories_products`
  ADD CONSTRAINT `categories_products_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `categories_products_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_2` FOREIGN KEY (`id_color`) REFERENCES `colors` (`id_color`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `options_ibfk_3` FOREIGN KEY (`id_size`) REFERENCES `sizes` (`id_size`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `options_ibfk_4` FOREIGN KEY (`id_type`) REFERENCES `types` (`id_type`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `options_ibfk_5` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_order_status`) REFERENCES `order_status` (`id_order_status`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_payment`) REFERENCES `payments` (`id_payment`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`id_shipping_method`) REFERENCES `shipping_methods` (`id_shipping_method`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`id_option`) REFERENCES `options` (`id_option`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_matherial`) REFERENCES `matherials` (`id_matherial`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
