document.addEventListener('DOMContentLoaded', () => {
    const runAssignmentBtn = document.getElementById('runAssignmentBtn');
    const dutiesTableBody = document.querySelector('#duties-table tbody');

    // Load duties on page load
    loadDuties();

    runAssignmentBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/execute-procedures', {
                method: 'POST'
            });

            const data = await response.json();
            if (response.ok && data.success) {
                alert('Procedures executed successfully!');
                loadDuties(); // Refresh the table
            } else {
                alert('Error: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            alert('Something went wrong: ' + error.message);
        }
    });

    async function loadDuties() {
        try {
            const response = await fetch('/api/get-duty-data-by-id');
            const duties = await response.json();

            dutiesTableBody.innerHTML = ''; // Clear existing data

            duties.forEach(duty => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${duty.Course_Code}</td>
                    <td>${duty.Faculty_ID}</td>
                    <td>${duty.Duty_Date}</td>
                    <td>${duty.Duty_Time}</td>
                    <td>${duty.Duty_Location}</td>
                `;
                dutiesTableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error loading duties:", error);
            dutiesTableBody.innerHTML = '<tr><td colspan="4">Failed to load data.</td></tr>';
        }
    }
});
