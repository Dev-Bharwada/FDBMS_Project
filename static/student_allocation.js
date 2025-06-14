function filterData() {
    // Get selected values from the filter dropdowns
    const division = document.getElementById('division').value;
    const department = document.getElementById('department').value;
    const year = document.getElementById('year').value;
    const panel = document.getElementById('panel').value;

    // Simulated dummy data
    const dummyData = [
        { semester: '1', type: 'Theory', seatNo: 'A01', department: 'Computer Science', courseCode: 'CS101', prn: '1234567890', roomNo: '101' },
        { semester: '2', type: 'Practical', seatNo: 'B02', department: 'Electrical Engineering', courseCode: 'EE101', prn: '2345678901', roomNo: '202' },
        { semester: '1', type: 'Theory', seatNo: 'A03', department: 'Computer Science', courseCode: 'CS102', prn: '3456789012', roomNo: '103' },
        { semester: '3', type: 'Theory', seatNo: 'B04', department: 'Electrical Engineering', courseCode: 'EE102', prn: '4567890123', roomNo: '104' }
    ];

    // Filter data based on selected filters
    const filteredData = dummyData.filter(item => {
        return (
            (division === '' || item.seatNo.startsWith(division)) &&
            (department === '' || item.department === department) &&
            (year === '' || item.semester === year.toString()) &&
            (panel === '' || item.roomNo.endsWith(panel))
        );
    });

    // Store filtered data in localStorage to pass to student_deets.html
    localStorage.setItem('filteredStudents', JSON.stringify(filteredData));
    
    // Redirect to student_deets.html
    window.location.href = 'student_deets.html';
}
