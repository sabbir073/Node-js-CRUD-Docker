const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/employeeModel');
const Department = require('./models/departmentModel');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  seedDatabase();
}).catch(err => {
  console.error('Error connecting to MongoDB', err.message);
});

async function seedDatabase() {
  try {
    // Clear existing data
    await Employee.deleteMany({});
    await Department.deleteMany({});

    // Create departments
    const departments = await Department.insertMany([
      { name: 'General Dentistry' },
      { name: 'Pediatric Dentistry' },
      { name: 'Restorative Dentistry' },
      { name: 'Surgery' },
      { name: 'Orthodontics' }
    ]);

    // Create employees with the department references
    const employees = [
      { name: 'Alfred', surname: 'Christensen', department: departments[0]._id }, // General Dentistry
      { name: 'John', surname: 'Dudley', department: departments[0]._id },       // General Dentistry
      { name: 'Janet', surname: 'Doe', department: departments[0]._id },          // General Dentistry
      { name: 'Francisco', surname: 'Willard', department: departments[1]._id },  // Pediatric Dentistry
      { name: 'Sarah', surname: 'Alvarez', department: departments[1]._id },      // Pediatric Dentistry
      { name: 'Lisa', surname: 'Harris', department: departments[2]._id },        // Restorative Dentistry
      { name: 'Danny', surname: 'Perez', department: departments[2]._id },        // Restorative Dentistry
      { name: 'Constance', surname: 'Smith', department: departments[3]._id },    // Surgery
      { name: 'Leslie', surname: 'Roche', department: departments[4]._id },       // Orthodontics
      { name: 'Lisa', surname: 'Harris', department: departments[4]._id }         // Orthodontics (Lisa in two departments)
    ];

    await Employee.insertMany(employees);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
}
