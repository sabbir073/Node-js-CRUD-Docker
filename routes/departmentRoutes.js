const express = require('express');
const Department = require('../models/departmentModel');
const router = express.Router();
const Employee = require('../models/employeeModel'); // Import the Employee model

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new department
router.post('/', async (req, res) => {
  const department = new Department({
    name: req.body.name
  });

  try {
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete a department
router.delete('/:id', async (req, res) => {
    try {
      // Check if any employees are assigned to the department
      const employeesInDepartment = await Employee.find({ department: req.params.id });
      if (employeesInDepartment.length > 0) {
        return res.status(400).json({ message: 'Cannot delete department with assigned employees.' });
      }
  
      const department = await Department.findById(req.params.id);
      if (!department) return res.status(404).json({ message: 'Department not found' });
  
      await Department.deleteOne({ _id: req.params.id }); // Correct method to delete
      res.json({ message: 'Department deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
