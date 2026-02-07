-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS contact_db;

-- 2. Switch to the Database
USE contact_db;

-- 3. Create the Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);