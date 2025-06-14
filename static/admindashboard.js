document.addEventListener("DOMContentLoaded", function () {
    // Faculty Allocation Navigation
    document.querySelector(".sidebar ul li:nth-child(1) a").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default anchor action
        window.location.href = "/faculty-management"; // Redirect to Faculty Management page via Flask route
    });

    document.querySelector(".sidebar ul li:nth-child(2) a").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "/current-upcoming-duties"; 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const facultyId = 6; // You can change this or fetch dynamically
    const profileCard = document.querySelector('.profile-card');

    loadProfile(facultyId);

    async function loadProfile(facultyId) {
        try {
            const response = await fetch(`/api/get-faculty-info?faculty_id=${facultyId}`);
            const faculty = await response.json();

            if (response.ok) {
                profileCard.innerHTML = `
                    <h2>Profile</h2>
                    <img src="/static/images/profile.png" alt="Profile Picture">
                    <p><strong>Name:</strong> ${faculty.Name}</p>
                    <p><strong>Role:</strong> ${faculty.Designation}</p>
                    <p><strong>Email:</strong> ${faculty.Email}</p>
                    <p><strong>Department:</strong> ${faculty.Department_ID}</p>
                    <button id="updateProfile">Update Profile</button>
                `;
            } else {
                profileCard.innerHTML = `<p>Failed to load profile: ${faculty.error}</p>`;
            }
        } catch (error) {
            console.error("Error loading profile:", error);
            profileCard.innerHTML = `<p>Failed to load profile data.</p>`;
        }
    }
});

