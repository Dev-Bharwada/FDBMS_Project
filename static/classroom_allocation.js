document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("classroomForm").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Classroom allocated successfully!");
    });

    // Link to class_details.html when "Show Classes" is clicked
    document.getElementById("showClasses").addEventListener("click", function() {
        // Navigate to class_details.html
        window.location.href = "class_details.html";
    });
});