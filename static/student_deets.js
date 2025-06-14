document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("table-body");

    const data = [
        { semester: "Sem 1", type: "Regular", courseCode: "CS101", prn: "10345678" },
        { semester: "Sem 2", type: "Backlog", courseCode: "CS102", prn: "10356789" },
        { semester: "Sem 3", type: "Regular", courseCode: "CS103", prn: "10367890" },
        { semester: "Sem 4", type: "Regular", courseCode: "CS104", prn: "10378901" }
    ];

    data.forEach((row, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${row.semester}</td>
            <td>${row.type}</td>
            <td>${row.courseCode}</td>
            <td>${row.prn}</td>
             <td><input type="text" id="seat-${index}" placeholder="Enter Seat No"></td>
            <td><input type="text" id="room-${index}" placeholder="Enter Room No"></td>
        `;

        tableBody.appendChild(tr);
    });
});
