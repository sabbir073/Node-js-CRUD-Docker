document.addEventListener('DOMContentLoaded', () => {
  const employeeForm = document.getElementById('employeeForm');
  const employeeList = document.getElementById('employeeList');
  const departmentSelect = document.getElementById('department');
  const employeeIdInput = document.getElementById('employeeId');
  const submitButton = employeeForm.querySelector('button'); // Reference the submit button

  // Fetch and display departments in the form
  fetch('/api/departments')
    .then(response => response.json())
    .then(departments => {
      departments.forEach(department => {
        const option = document.createElement('option');
        option.value = department._id;
        option.textContent = department.name;
        departmentSelect.appendChild(option);
      });
    });

  // Fetch and display employees
  const fetchEmployees = () => {
    employeeList.innerHTML = ''; // Clear the list before repopulating
    fetch('/api/employees')
      .then(response => response.json())
      .then(employees => {
        employees.forEach(employee => {
          const li = document.createElement('li');
          li.textContent = `${employee.name} ${employee.surname} - ${employee.department.name}`;

          // Update Button
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.addEventListener('click', () => {
            // Populate the form with employee details for editing
            document.getElementById('name').value = employee.name;
            document.getElementById('surname').value = employee.surname;
            departmentSelect.value = employee.department._id;
            employeeIdInput.value = employee._id; // Store employee ID in the hidden input
            submitButton.textContent = 'Update Employee'; // Change button text to Update
          });
          li.appendChild(updateButton);

          // Delete Button
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => {
            fetch(`/api/employees/${employee._id}`, {
              method: 'DELETE'
            })
            .then(response => {
              if (response.ok) {
                fetchEmployees(); // Refresh employee list if deletion was successful
                alert('Employee Deleted');
              } else {
                return response.json(); // Handle error messages
              }
            })
            .then(errorMessage => {
              if (errorMessage) {
                console.error('Failed to delete employee:', errorMessage.message);
                alert(errorMessage.message); // Show the error to the user
              }
            });
          });
          

          li.appendChild(deleteButton);

          employeeList.appendChild(li);
        });
      });
  };

  fetchEmployees(); // Initial fetch

  // Handle form submission to add/update an employee
  employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const department = departmentSelect.value;
    const employeeId = employeeIdInput.value;

    // If employeeId exists, we update, otherwise we create a new employee
    const method = employeeId ? 'PUT' : 'POST';
    const url = employeeId ? `/api/employees/${employeeId}` : '/api/employees';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, surname, department })
    })
    .then(response => response.json())
    .then(() => {
      // Clear the form
      employeeForm.reset();
      employeeIdInput.value = ''; // Clear the hidden input field
      submitButton.textContent = 'Add Employee'; // Reset the button text back to Add
      fetchEmployees(); // Refresh employee list
    });
  });
});
