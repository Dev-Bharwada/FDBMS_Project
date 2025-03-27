document.getElementById("classroomForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get values
    let subject = document.getElementById("subject").value;
    let faculty_id = document.getElementById("faculty_id").value;
    let building_name = document.getElementById("building_name").value;
    let room_no = document.getElementById("room_no").value;
    let no_of_students = document.getElementById("no_of_students").value;
    let semester = document.getElementById("semester").value;

    // Create table row
    let table = document.getElementById("classroomTable").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${subject}</td>
        <td>${faculty_id}</td>
        <td>${building_name}</td>
        <td>${room_no}</td>
        <td>${no_of_students}</td>
        <td>${semester}</td>
    `;

    // Clear form fields
    document.getElementById("classroomForm").reset();
});
