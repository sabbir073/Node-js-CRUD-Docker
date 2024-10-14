
# Apollonia Dental Practice Employee Management System

This project is an employee and department management system built for Apollonia Dental Practice. It allows the practice to manage employees and departments, including performing CRUD (Create, Read, Update, Delete) operations on employees and departments.

## Project Overview
The system provides:
- An employee management interface where employees can be added, updated, or deleted.
- A department management interface where departments can be added or deleted.
- A MongoDB backend to store data, and a Node.js Express server to handle API requests.
- Docker support for containerized deployment of both the app and MongoDB.

## Tools Used
- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for Node.js to build the API.
- **MongoDB**: NoSQL database for storing employees and departments data.
- **Mongoose**: MongoDB object modeling tool used for schema validation and database interaction.
- **Docker**: Used for containerizing the application and database.
- **Nodemon**: Automatically restarts the server when file changes are detected (for development).
- **dotenv**: Manages environment variables.
- **HTML, CSS, JavaScript**: For the front-end views.
  
## Features
1. **Employee Management**: Add, view, update, and delete employees.
2. **Department Management**: Add, view, and delete departments.
3. **Validation**: Employees cannot be deleted if they belong to a department with employees.
4. **Dockerized**: The app runs inside Docker containers for easy deployment.

## How to Run the Project

To run this project locally or from GitHub, follow these steps:

### Prerequisites
- **Node.js** and **npm**: You need Node.js (v18 or higher) installed on your system.
- **Docker**: You need Docker and Docker Compose installed to run the app in containers.

### Steps to Run
1. **Clone the repository**:
   ```bash
   git clone https://github.com/sabbir073/Node-js-CRUD-Docker.git
   cd Node-js-CRUD-Docker
   ```

2. **Install dependencies**:
   If you're running locally without Docker:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following content:
   ```bash
   MONGO_URI=mongodb://mongo:27017/apollonia
   ```

4. **Run the application**:
   - If you're running locally (without Docker):
     ```bash
     npm run dev
     ```

   - If you're running with Docker (recommended):
     ```bash
     docker-compose up --build
     ```

5. **Access the application**:
   Once the app is running, you can access it in your browser:
   - **Employee Management**: `http://localhost:3000/views/index.html`
   - **Department Management**: `http://localhost:3000/views/departments.html`

6. **Stopping the containers**:
   If you're using Docker and want to stop the containers:
   ```bash
   docker-compose down
   ```

## Project Structure
```
├── public
│   ├── css
│   │   └── styles.css         # CSS for styling
│   ├── js
│   │   ├── employee.js        # Employee management JS
│   │   └── department.js      # Department management JS
│   └── views
│       ├── index.html         # Employee management view
│       └── departments.html   # Department management view
├── models
│   ├── employeeModel.js       # Mongoose schema for employees
│   └── departmentModel.js     # Mongoose schema for departments
├── routes
│   ├── employeeRoutes.js      # Employee routes
│   └── departmentRoutes.js    # Department routes
├── seed.js                    # Seed script to add initial data
├── Dockerfile                 # Dockerfile to build the Node.js app
├── docker-compose.yml         # Docker Compose file for app and MongoDB
├── .env                       # Environment variables
└── app.js                     # Main Node.js server file
```

## License
This project is licensed under the MIT License.
