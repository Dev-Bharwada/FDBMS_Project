function submitProfile() {
    let selectedProfile = document.querySelector('input[name="profile"]:checked');

    if (selectedProfile) {
        switch (selectedProfile.value) {
            case "administrator":
                window.location.href = "/admin-dashboard"; // Redirects to Admin Dashboard route in Flask
                break;
            case "faculty": 
                window.location.href = "/faculty-dashboard"; // Redirects to Faculty Dashboard route in Flask
                break;
            default:
                alert("This option is not linked yet.");
        }
    } else {
        alert("Please select a profile.");
    }
}
