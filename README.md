# Sari-Sari Project - Backend API

This repository contains the Node.js / Express backend service for the Sari-Sari Exchange platform. It manages secure multi-part digital asset submissions, structured database interactions with PostgreSQL, and automated storage directory mapping.

## Prerequisites

- **Runtime**: Node.js v16.x or higher
- **Database**: PostgreSQL v13.x or higher
- **Process Manager (Recommended for Production)**: PM2 or systemd

## Deployment Instructions

### 1. Clone this Repository

### 2. Install dependencies
   `npm install`

### 3. Configure the environment
   `cp .env.example .env`

### 4. Open the newly created .env file and fill in the database credentials

DB_USER

DB_PASSWORD

DB_HOST

DB_NAME

### 5. Database Initialization

1. Ensure your PostgreSQL instance is running and create the target database:

`CREATE DATABASE sarisari_db;`


2. Execute the provided init.sql script to initialize tables and query performance indexes:

`sudo -u postgres psql -d sarisari_db -f init.sql`

### 4. File Storage Structure
The application handles dynamic, segmented storage paths for file processing.

Note: The root ./uploads folder along with its target subdirectories (./uploads/assets and ./uploads/artists) will self-initialize automatically upon the server's first execution cycle. No manual folder creation is required.

### 6. Running the Server
`npm start`
