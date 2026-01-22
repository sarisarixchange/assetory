# Sari-Sari Project - Backend API

This is the Node.js backend for the Sari-Sari project, responsible for managing digital asset submissions, file storage, and database persistence.

## Prerequisites

- **Node.js**: v16.x 

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

1. Create the database instance through `CREATE DATABASE sarisari_db;` via psql.
2. Upon the first run, the server will execute the `init.sql` script to automatically create the necessary tables (assets), columns, and indexes if they do not exist.

### 6. Running the Server
`npm start`
