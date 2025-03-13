// Function to add a new faculty member
document.getElementById('facultyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve input values
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const designation = document.getElementById('designation').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const room = document.getElementById('room').value;
    const duty = document.getElementById('duty').value;

    // Create a new row in the table
    const table = document.getElementById('facultyTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert new cells for each input field
    newRow.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${department}</td>
        <td>${designation}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${room}</td>
        <td>${duty}</td>
    `;

    // Reset form fields
    document.getElementById('facultyForm').reset();
});
