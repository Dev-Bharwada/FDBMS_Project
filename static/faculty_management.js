// Ensures the function loadFaculty() runs once the HTML is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    loadFaculty();
});

// Gets all faculty data from /api/faculty.
// Populates a table in your HTML (<table id="facultyTable">) with each faculty’s details.
// Adds Edit and Delete buttons for each row.
function loadFaculty() {
    fetch('/api/faculty')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('facultyTable').getElementsByTagName('tbody')[0];
            table.innerHTML = '';
            data.forEach(faculty => {
                const departmentText = getTextFromList('departmentList', faculty.Department_ID);
                const designationText = getTextFromList('designationList', faculty.Designation);
                const dutyText = getTextFromList('dutyList', faculty.Nature_of_Duty);

                const row = table.insertRow();
                row.innerHTML = `
                    <td>${faculty.ID}</td>
                    <td>${faculty.Name}</td>
                    <td>${departmentText}</td>
                    <td>${designationText}</td>
                    <td>${faculty.Email}</td>
                    <td>${faculty.Phone_No}</td>
                    <td>${faculty.Room_No}</td>
                    <td>${dutyText}</td>
                    <td>${faculty.Total_Duties}</td>
                    <td>${faculty.Subject_Taught ?? ''}</td>
                    <td>
                        <button onclick="editFaculty(${faculty.ID})">Edit</button>
                        <button onclick="deleteFaculty(${faculty.ID})">Delete</button>
                    </td>
                `;
            });
        })
        .catch(error => console.error('Error loading faculty:', error));
}


function getTextFromList(listId, value) {
    const listItems = document.getElementById(listId).querySelectorAll('li');
    for (const item of listItems) {
        if (item.dataset.value === String(value)) {
            return item.textContent.trim();
        }
    }
    return value; 
}

// Utility to extract value from custom dropdowns
function getCustomValue(inputId, listId) {
    const input = document.getElementById(inputId);
    const text = input.value.trim();
    const arr = document.getElementById(listId).querySelectorAll('li');
    for (const li of arr) {
        if (li.textContent.trim() === text) {
            return parseInt(li.dataset.value) || li.dataset.value;
        }
    }
    return null;
}

// Handles form submission for adding/updating faculty
document.getElementById('facultyForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('id').value);
    const facultyData = {
        ID: id,
        Name: document.getElementById('name').value,
        Department_ID: getCustomValue('departmentSearch', 'departmentList'),
        Designation: getCustomValue('designationSearch', 'designationList'),
        Email: document.getElementById('email').value,
        Phone_No: document.getElementById('phone').value,
        Room_No: document.getElementById('room').value,
        Nature_of_Duty: getCustomValue('dutySearch', 'dutyList'),
        Total_Duties: parseInt(document.getElementById('total_duties').value),
        Subject_Taught: document.getElementById('subject_taught').value
    };

    const editMode = document.getElementById('faculty-id').value;
    const method = editMode ? 'PUT' : 'POST';
    const url = editMode ? `/api/faculty/${id}` : '/api/faculty';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facultyData)
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to save faculty');
            return response.json();
        })
        .then(() => {
            document.getElementById('facultyForm').reset();
            document.getElementById('faculty-id').value = '';
            document.getElementById('submitBtn').innerText = 'Add Faculty';
            loadFaculty();
        })
        .catch(error => alert('Error: ' + error.message));
});

// Deletes a faculty entry
function deleteFaculty(id) {
    if (!confirm('Are you sure you want to delete this faculty?')) return;

    fetch(`/api/faculty/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to delete');
            return response.json();
        })
        .then(() => loadFaculty())
        .catch(error => alert('Error: ' + error.message));
}

// Edits a faculty entry
function editFaculty(id) {
    fetch('/api/faculty')
        .then(response => response.json())
        .then(data => {
            const faculty = data.find(f => f.ID === id);
            if (!faculty) return alert('Faculty not found');

            // Set form fields
            document.getElementById('faculty-id').value = faculty.ID;
            document.getElementById('id').value = faculty.ID;
            document.getElementById('name').value = faculty.Name;
            document.getElementById('email').value = faculty.Email;
            document.getElementById('phone').value = faculty.Phone_No;
            document.getElementById('room').value = faculty.Room_No;
            document.getElementById('total_duties').value = faculty.Total_Duties;
            document.getElementById('subject_taught').value = faculty.Subject_Taught;

            // Custom dropdowns
            setCustomDropdownValue('departmentSearch', 'departmentList', faculty.Department_ID);
            setCustomDropdownValue('designationSearch', 'designationList', faculty.Designation);
            setCustomDropdownValue('dutySearch', 'dutyList', faculty.Nature_of_Duty);

            document.getElementById('submitBtn').innerText = 'Update Faculty';
        });
}
/*Auto assign no of duties based on designation
const designationField = document.getElementById("designation");
const dutiesField = document.getElementById("duties");

  const dutiesByDesignation = {
    "Professor": 2,
    "Associate Professor": 4,
    "Assistant Professor": 6
  };

  designationField.addEventListener("change", function() {
    const selected = designationField.value;
    dutiesField.value = dutiesByDesignation[selected] || "";
  });*/

const dutiesByDesignation = {
    "Professor": 2,
    "Associate Professor": 4,
    "Assistant Professor": 6
  };

  const designationInput = document.getElementById("designationSearch");
  const designationList = document.getElementById("designationList");
  const totalDutiesInput = document.getElementById("total_duties");

  // Handle clicking on dropdown items
  designationList.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
      const designation = item.textContent.trim();

      // Set selected value to input
      designationInput.value = designation;

      // Set total duties based on mapping
      totalDutiesInput.value = dutiesByDesignation[designation] || "";

      // Hide the dropdown list
      designationList.style.display = "none";
    });
  });

  // Show the dropdown when the input is focused
  designationInput.addEventListener("focus", () => {
    designationList.style.display = "block";
  });

  // Optional: hide dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown-container")) {
      designationList.style.display = "none";
    }
  });

// Sets custom dropdown to a value
function setCustomDropdownValue(inputId, listId, targetValue) {
    const listItems = document.getElementById(listId).querySelectorAll('li');
    for (const item of listItems) {
        if (item.dataset.value === String(targetValue) || item.textContent.trim() === targetValue) {
            document.getElementById(inputId).value = item.textContent.trim();
            break;
        }
    }
}

// Initialize a searchable dropdown
function initSearchableDropdown(searchInputId, listId) {
    const searchInput = document.getElementById(searchInputId);
    const dropdownList = document.getElementById(listId);

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const items = dropdownList.querySelectorAll('li');
        dropdownList.style.display = 'block';

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });

    searchInput.addEventListener('focus', function () {
        dropdownList.style.display = 'block';
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown-container')) {
            dropdownList.style.display = 'none';
        }
    });

    dropdownList.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            searchInput.value = e.target.textContent;
            searchInput.dataset.selectedId = e.target.dataset.id;
            dropdownList.style.display = 'none';
        }
    });
}

// Initialize all dropdowns
initSearchableDropdown('departmentSearch', 'departmentList');
initSearchableDropdown('designationSearch', 'designationList');
initSearchableDropdown('dutySearch', 'dutyList');
