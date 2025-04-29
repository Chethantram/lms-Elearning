# Project Name: LMS E-Learning

## Overview
This project is a client-side application for a Learning Management System (LMS) that interacts with a backend API. It provides a user-friendly interface for managing courses, users, and other LMS functionalities. The application is built using modern web development technologies and relies on external APIs for data handling and processing.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Setup](#environment-setup)
4. [Local Development](#local-development)
5. [External API Configuration](#external-api-configuration)
6. [File Uploads and Static Files](#file-uploads-and-static-files)
7. [API Usage Examples](#api-usage-examples)
8. [Notes on Environment Variables](#notes-on-environment-variables)

---

## Prerequisites
Before starting, ensure you have the following installed:
- **Node.js**: Version 16.x or higher
- **npm**: Comes with Node.js
- **MongoDB**: Version 5.x or higher (if applicable)
- **Git**: For version control

---

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Chethantram/lms-Elearning.git
    cd lms-client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

---

## Environment Setup
1. Create a `.env` file in the root directory.
2. Add the following environment variables:
    ```env
    REACT_APP_API_BASE_URL=http://localhost:5000/api
    REACT_APP_API_KEY=your-api-key
    ```

---

## Local Development
1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:5173`.

---


## File Uploads and Static Files
- **File Uploads**: Files are uploaded to Google Cloud Storage. Ensure the `REACT_APP_GOOGLE_CLOUD_API_KEY` is configured.
- **Static Files**: Place static assets (e.g., images, CSS) in the `public` directory.

---
