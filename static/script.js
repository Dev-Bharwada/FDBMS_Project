// Handle Form Submission
document.getElementById("examForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let courseCode = document.getElementById("courseCode").value;
    let date = document.getElementById("date").value;
    let timing = document.getElementById("timing").value;
    let students = document.getElementById("students").value;
    let department = document.getElementById("department").value;
    let type = document.getElementById("type").value;

    let table = document.getElementById("examTable").getElementsByTagName("tbody")[0];

    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${courseCode}</td>
        <td>${date}</td>
        <td>${timing}</td>
        <td>${students}</td>
        <td>${department}</td>
        <td>${type}</td>
    `;

    // Reset Form Fields
    document.getElementById("examForm").reset();
});
