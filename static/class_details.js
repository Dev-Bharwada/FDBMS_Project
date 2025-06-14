// Sample data for the allocated classrooms
const classroomData = [
    { courseCode: "CS101", semester: "Fall 2025", numOfStudents: 120, roomNo: "A101", facultyId: "F001" },
    { courseCode: "MATH202", semester: "Spring 2025", numOfStudents: 90, roomNo: "B202", facultyId: "F002" },
    { courseCode: "PHY303", semester: "Fall 2025", numOfStudents: 80, roomNo: "C303", facultyId: "F003" },
    { courseCode: "CHEM404", semester: "Spring 2025", numOfStudents: 110, roomNo: "D404", facultyId: "F004" },
];

// Function to populate the table with data
function populateTable() {
    const tableBody = document.querySelector("#classroom-table tbody");
    classroomData.forEach(row => {
        const tableRow = document.createElement("tr");
        
        const courseCodeCell = document.createElement("td");
        courseCodeCell.textContent = row.courseCode;
        tableRow.appendChild(courseCodeCell);
        
        const semesterCell = document.createElement("td");
        semesterCell.textContent = row.semester;
        tableRow.appendChild(semesterCell);
        
        const numOfStudentsCell = document.createElement("td");
        numOfStudentsCell.textContent = row.numOfStudents;
        tableRow.appendChild(numOfStudentsCell);
        
        const roomNoCell = document.createElement("td");
        roomNoCell.textContent = row.roomNo;
        tableRow.appendChild(roomNoCell);
        
        const facultyIdCell = document.createElement("td");
        facultyIdCell.textContent = row.facultyId;
        tableRow.appendChild(facultyIdCell);

        // Append the row to the table body
        tableBody.appendChild(tableRow);
    });
}

// Call the function to populate the table on page load
window.onload = populateTable;
