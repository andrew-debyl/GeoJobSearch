-- Create the geojobsearch database and delete any previous instances.
DROP DATABASE IF EXISTS geojobsearch;
CREATE DATABASE geojobsearch COMMENT 'GeoJobSearch Database';

-- Switch to the geojobsearch database.
USE geojobsearch;

-- Create the locations table with default values.
CREATE TABLE IF NOT EXISTS locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    street_number INT DEFAULT 0,
    street_name VARCHAR(100) DEFAULT '',
    city VARCHAR(100) DEFAULT '',
    postal VARCHAR(100) DEFAULT '',
    province VARCHAR(100) DEFAULT '',
    country VARCHAR(100) DEFAULT 'Unknown'
);

-- Create the jobs table with default values.
CREATE TABLE IF NOT EXISTS jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT,
    company_name VARCHAR(255) DEFAULT 'Unknown',
    job_type VARCHAR(100) DEFAULT 'Unknown',
    job_title VARCHAR(255) DEFAULT 'Unknown',
    job_salary VARCHAR(255) DEFAULT 'Unknown',
    job_description TEXT DEFAULT '',
    FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

-- Account table
CREATE TABLE IF NOT EXISTS accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Junction table linking accounts --> jobs
CREATE TABLE IF NOT EXISTS account_jobs (
    account_id INT,
    job_id INT,
    PRIMARY KEY (account_id, job_id),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id)
);





-- Load Test Tables for Integration Tests ---

CREATE TABLE people (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

-- Insert data into people
INSERT INTO people (first_name, last_name) VALUES ('John', 'Doe');
INSERT INTO people (first_name, last_name) VALUES ('Jane', 'Doe');