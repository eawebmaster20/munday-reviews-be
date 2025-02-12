# Munday Reviews Backend

## Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application Locally](#running-the-application-locally)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Deployment](#deployment)
  - [CI/CD](#cicd)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Project Overview
Munday Reviews Backend is the server-side API for the Munday Reviews application. It serves the Angular frontend with RESTful endpoints for user authentication, review management, company ratings, and more. It handles business logic, stores data, and processes requests from the frontend. And also implement web socket for realtime dashboard updates

## Getting Started

### Prerequisites
Before you can run this project locally, ensure you have the following installed on your machine:

- Node.js: The backend is built using Node.js. You can download it from [nodejs.org](https://nodejs.org)
- npm: npm is required to install dependencies. It is included with Node.js
- Docker (optional, for containerized deployment): Docker is used for containerizing the application for easier deployment

### Installation
1. Clone the Repository:
   ```bash
   git clone https://github.com/eawebmaster20/munday-reviews-be.git
   cd munday-reviews-be
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

### Running the Application Locally
1. Set Environment Variables:
   - Create a `.env` file 
   - Update the `.env` file with your configurations:
     ```ini
     DB_URL=database url variable
     JWT_SECRET=your-jwt-secret
     ```

2. Start the Development Server:
   ```bash
   npm start
   ```

3. Access the API: Once the server is running, you can interact with the API endpoints at `http://localhost:5000`

4. The backend is also hosted on railway at the provided URL  
## Project Structure
```bash
munday-reviews-be/
├── src/                    # Application source code
│   ├── models/            # Database models (User, Review, etc.)
│   ├── routes/            # API route definitions
│   ├── middleware/        # Express middlewares (e.g., authentication)
│   ├── config/            # Configuration files (database, server settings)
│   └── index.js           # Main entry point of the server
├── .env                   # Environment variables
├── package.json          # Project metadata and dependencies
├── Dockerfile            # Docker configuration for containerization
├── README.md             # This file
└── .gitignore            # Files to be ignored by git
```

## Technologies Used
- **Node.js**: Server-side runtime for building scalable applications
- **Express.js**: Web application framework for Node.js to simplify routing and handling HTTP requests
- **MySql**: NoSQL database used for storing user and review data
- **SQlite**: used it for testing purposes before switching back to MySQL
- **JWT**: For secure user authentication using token-based strategies
- **Bcrypt.js**: Library for hashing passwords before saving them to the database
- **Dotenv**: To manage environment variables and configure the application securely
- **Docker**: For containerizing the application and enabling easy deployment
- **Cors**: To enable cross-origin requests between frontend and backend during development

## Features
- **User Authentication**: Secure token-based login and signup using JWT
- **Review System**: Users can submit reviews for companies, with ratings between 1 to 5 stars
- **CRUD Operations**: Full CRUD (Create, Read, Update, Delete) operations for reviews
- **User and Admin Roles**: Different access levels for users and administrators
- **WebSocket Support**: Real-time updates for review submissions using Socket.io

## Deployment

### CI/CD
This project uses GitHub Actions for continuous integration and deployment.

The CI/CD pipeline is configured to:
- Build and containerize the app using Docker
- Deploy the app to the cloud or server after successful tests

To manually trigger the CI/CD workflow, go to the GitHub Actions tab in the repository and start the pipeline manually.

## Environment Variables
This backend project relies on several environment variables. Here's a list of the main ones you should configure in your `.env` file:

```ini
JWT_SECRET=my-super-secret-key  # Secret key for JWT tokens
PORT=5000                 # Server port
DB_URL= as shared with you   # Base API URL
```

## Acknowledgements
- **Express.js**: Web framework for Node.js that powers this backend
- **MongoDB**: NoSQL database used to store user and review data
- **JWT**: Used for token-based authentication
- **Socket.io**: For real-time WebSocket communication
- **Docker**: Containerization tool for deploying the application in different environments
