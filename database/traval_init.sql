-- SQL to create database and table for Traval app
CREATE DATABASE IF NOT EXISTS Traval CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE Traval;

CREATE TABLE IF NOT EXISTS experiences (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  city VARCHAR(255),
  title VARCHAR(255),
  content TEXT,
  author VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
