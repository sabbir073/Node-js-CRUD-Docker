document.addEventListener('DOMContentLoaded', () => {
    const departmentForm = document.getElementById('departmentForm');
    const departmentList = document.getElementById('departmentList');
  
    // Fetch and display departments
    const fetchDepartments = () => {
      departmentList.innerHTML = ''; // Clear list before repopulating
      fetch('/api/departments')
        .then(response => response.json())
        .then(departments => {
          departments.forEach(department => {
            const li = document.createElement('li');
            li.textContent = department.name;
  
            // Delete Button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                fetch(`/api/departments/${department._id}`, {
                  method: 'DELETE'
                })
                .then(response => {
                  if (response.ok) {
                    fetchDepartments(); // Refresh department list
                    alert('Department Deleted');
                  } else {
                    return response.json(); // Get error message
                  }
                })
                .then(errorMessage => {
                  if (errorMessage) {
                    console.error('Failed to delete department:', errorMessage.message);
                    alert(errorMessage.message); // Display the error message in an alert
                  }
                });
              });
              

            li.appendChild(deleteButton);
  
            departmentList.appendChild(li);
          });
        });
    };
  
    fetchDepartments(); // Initial fetch
  
    // Handle form submission to add a new department
    departmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const departmentName = document.getElementById('departmentName').value;
  
      fetch('/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: departmentName })
      })
      .then(response => response.json())
      .then(() => {
        departmentForm.reset(); // Clear form
        fetchDepartments(); // Refresh department list
      });
    });
  });
  