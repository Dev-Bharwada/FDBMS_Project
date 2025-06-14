// Sample data for building allocation (this would ideally come from a database or API)
const buildingAllocations = [
    { buildingName: "Building A", department: "Computer Science", numOfExamHalls: 2 },
    { buildingName: "Building B", department: "Mechanical Engineering", numOfExamHalls: 3 },
    { buildingName: "Building C", department: "Electrical Engineering", numOfExamHalls: 1 },
    { buildingName: "Building A", department: "Electrical Engineering", numOfExamHalls: 1 },
    { buildingName: "Building B", department: "Computer Science", numOfExamHalls: 2 },
];

// Function to populate the table with building allocation data
function populateAllocationsTable() {
    const tableBody = document.querySelector("#allocations-table tbody");
    tableBody.innerHTML = ''; // Clear any existing rows

    buildingAllocations.forEach(allocation => {
        const tableRow = document.createElement("tr");

        const buildingNameCell = document.createElement("td");
        buildingNameCell.textContent = allocation.buildingName;
        tableRow.appendChild(buildingNameCell);

        const departmentCell = document.createElement("td");
        departmentCell.textContent = allocation.department;
        tableRow.appendChild(departmentCell);

        const numOfExamHallsCell = document.createElement("td");
        numOfExamHallsCell.textContent = allocation.numOfExamHalls;
        tableRow.appendChild(numOfExamHallsCell);

        // Append the row to the table body
        tableBody.appendChild(tableRow);
    });
}

// Function for the back button to navigate to the previous page
document.getElementById("backBtn").addEventListener("click", function() {
    window.location.href = "building_allocation.html"; // Adjust this if the file is in a different folder
});

// Call the function to populate the table when the page loads
window.onload = function() {
    populateAllocationsTable();
};
