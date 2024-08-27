# Complaint Management System (CMS)

## Overview

The Complaint Management System (CMS) is a comprehensive full-stack web application designed to streamline and manage the complaint handling process. Featuring role-based access control, the CMS ensures secure and efficient management of complaints, providing users with tailored experiences based on their roles.

## Key Features

- **Role-Based Access Control:** Assigns specific roles such as Admin, Support Staff, and End Users with appropriate permissions.
- **Modern User Interface:** Built with React.js and styled using Tailwind CSS for a responsive and intuitive design.
- **Flexible Data Management:** Uses MongoDB for scalable and efficient data storage and retrieval.
- **Robust Backend Services:** Developed with Node.js and Express.js for a scalable and reliable server-side application.
- **Detailed Reporting:** Provides comprehensive reports and analytics on complaints, resolutions, and system performance.

## Technology Stack

- **React.js:** For creating a dynamic and interactive front-end user interface.
- **Tailwind CSS:** For utility-first CSS styling and a consistent modern look.
- **MongoDB:** For flexible and scalable NoSQL database management.
- **Node.js:** Server-side runtime environment for building scalable applications.
- **Express.js:** Server-side framework for creating robust APIs and handling application logic.

## Installation

To get started with the CMS, follow these steps:

1. **Clone the Repository:**
   Clone the repository to your local machine using the following command:
   ```bash
   git clone https://github.com/yourusername/complaint-management-system.git
   ```
   Navigate into the cloned repository directory:
   ```bash
   cd complaint-management-system
   ```

2. **Install Dependencies:**
   * For the backend, navigate to the `backend` directory and install the required dependencies:
     ```bash
     cd backend
     npm install
     ```
   * For the frontend, navigate to the `frontend` directory and install the required dependencies:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Configure Environment Variables:**
   * For the backend, navigate to the `backend` directory and create a `.env` file with the following content:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
     Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB connection string and JWT secret.

   * For the frontend, navigate to the `frontend` directory and create a `.env` file with the following content if needed:
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```
     Adjust `REACT_APP_API_URL` to match your backend API URL if necessary.

4. **Run the Application:**
   * Start the backend server by navigating to the `backend` directory and running:
     ```bash
     cd ../backend
     npm start
     ```
   * Start the frontend application by navigating to the `frontend` directory and running:
     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000` to access the CMS. Ensure both the backend and frontend servers are running for the application to function correctly.
