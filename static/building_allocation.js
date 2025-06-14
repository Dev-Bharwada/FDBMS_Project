document.addEventListener('DOMContentLoaded', () => {
    loadBuildings();

    document.getElementById('building-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const nameField = document.getElementById('building-name');
        const originalName = nameField.getAttribute('data-original-name');
        const currentName = nameField.value;

        const payload = {
            Building_Name: currentName,
            Department_ID: document.getElementById('department').value,
            No_of_Exam_Halls: parseInt(document.getElementById('num-exam-halls').value)
        };

        const url = originalName
            ? `/api/buildings/${encodeURIComponent(originalName)}`
            : '/api/buildings';

        const method = originalName ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(res => {
            if (!res.ok) throw new Error('Failed to save');
            return res.json();
        }).then(data => {
            console.log('Success:', data);
            resetForm();
            loadBuildings();
        }).catch(err => {
            console.error('Fetch error:', err);
            alert('Error saving building. See console.');
        });
    });
});

function loadBuildings() {
    fetch('/api/buildings')
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('buildingTableBody');
            table.innerHTML = '';
            data.forEach(building => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${building.Building_Name}</td>
                    <td>${building.Department_ID}</td>
                    <td>${building.No_of_Exam_Halls}</td>
                    <td>
                        <button class="edit" onclick="editBuilding('${building.Building_Name}', '${building.Department_ID}', ${building.No_of_Exam_Halls})">✏️</button>
                        <button class="delete" onclick="deleteBuilding('${building.Building_Name}')">🗑️</button>
                    </td>
                `;
                table.appendChild(row);
            });
        });
}

function editBuilding(name, dept, halls) {
    document.getElementById('building-name').value = name;
    document.getElementById('department').value = dept;
    document.getElementById('num-exam-halls').value = halls;

    document.getElementById('building-name').setAttribute('data-original-name', name);
    document.getElementById('submitBtn').innerText = 'Add/Update';
}

function deleteBuilding(name) {
    if (confirm("Are you sure you want to delete this building?")) {
        fetch(`/api/buildings/${encodeURIComponent(name)}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (!res.ok) throw new Error("Delete failed");
            return res.json();
        })
        .then(() => loadBuildings())
        .catch(err => {
            console.error(err);
            alert("Error deleting building.");
        });
    }
}

function resetForm() {
    const nameField = document.getElementById('building-name');
    nameField.value = '';
    nameField.removeAttribute('data-original-name');
    document.getElementById('department').value = '';
    document.getElementById('num-exam-halls').value = '';
    document.getElementById('submitBtn').innerText = 'Add Building';
}
