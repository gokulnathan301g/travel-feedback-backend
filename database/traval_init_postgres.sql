-- PostgreSQL-compatible SQL for Traval app
-- Create database (run as a superuser or create DB via your hosting provider)
-- CREATE DATABASE traval;

-- Use the database 'traval' and run the following to create table
CREATE TABLE IF NOT EXISTS experiences (
  id BIGSERIAL PRIMARY KEY,
  city VARCHAR(255),
  title VARCHAR(255),
  content TEXT,
  author VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
