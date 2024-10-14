const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection failed:', err.message);
});

// Simple route
app.get('/', (req, res) => {
  res.send('Welcome to Apollonia Employee Management');
});

// Employee routes
app.use('/api/employees', employeeRoutes);

// Department routes
app.use('/api/departments', departmentRoutes);


app.use(express.static('public'));


// Listen on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
