const API_URL = "/api/students";

const form = document.getElementById("studentForm");

const tableBody =
    document.getElementById("studentTableBody");

const cancelBtn =
    document.getElementById("cancelBtn");


// Load students when page opens
document.addEventListener("DOMContentLoaded", function () {

    loadStudents();

});


// Add or Update student
form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const id =
        document.getElementById("studentId").value;

    const student = {

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        phone:
        document.getElementById("phone").value,

        department:
        document.getElementById("department").value,

        age:
            parseInt(
                document.getElementById("age").value
            ),

        marks:
            parseFloat(
                document.getElementById("marks").value
            )
    };

    try {

        let response;

        if (id) {

            // Update
            response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(student)
                }
            );

        } else {

            // Add
            response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(student)
                }
            );
        }

        if (!response.ok) {

            const message =
                await response.text();

            throw new Error(message);
        }

        alert(
            id
                ? "Student updated successfully"
                : "Student added successfully"
        );

        resetForm();

        loadStudents();

    } catch (error) {

        alert(error.message);

    }
});


// Get all students
async function loadStudents() {

    try {

        const response =
            await fetch(API_URL);

        const students =
            await response.json();

        displayStudents(students);

    } catch (error) {

        alert("Unable to load students");

    }
}


// Display students
function displayStudents(students) {

    tableBody.innerHTML = "";

    students.forEach(function (student) {

        const row =
            document.createElement("tr");

        const status =
            getStatus(student.marks);

        row.innerHTML = `

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>${student.department}</td>

            <td>${student.age}</td>

            <td>${student.marks}</td>

            <td>${status}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>

            </td>
        `;

        tableBody.appendChild(row);

    });
}


// Check pass/fail
function getStatus(marks) {

    if (marks >= 50) {
        return "PASS";
    }

    return "FAIL";
}


// Search
async function searchStudents() {

    const name =
        document.getElementById("searchInput")
            .value
            .trim();

    if (name === "") {

        loadStudents();

        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/search?name=${encodeURIComponent(name)}`
            );

        const students =
            await response.json();

        displayStudents(students);

    } catch (error) {

        alert("Search failed");

    }
}


// Filter by department
async function filterDepartment() {

    const department =
        document.getElementById("departmentFilter")
            .value;

    if (department === "") {

        loadStudents();

        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/department/${department}`
            );

        const students =
            await response.json();

        displayStudents(students);

    } catch (error) {

        alert("Unable to filter students");

    }
}


// Edit student
async function editStudent(id) {

    try {

        const response =
            await fetch(`${API_URL}/${id}`);

        const student =
            await response.json();

        document.getElementById("studentId").value =
            student.id;

        document.getElementById("name").value =
            student.name;

        document.getElementById("email").value =
            student.email;

        document.getElementById("phone").value =
            student.phone;

        document.getElementById("department").value =
            student.department;

        document.getElementById("age").value =
            student.age;

        document.getElementById("marks").value =
            student.marks;

        document.getElementById("formTitle").innerText =
            "Update Student";

    } catch (error) {

        alert("Unable to load student");

    }
}


// Delete student
async function deleteStudent(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this student?"
        );

    if (!confirmation) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );

        if (!response.ok) {

            throw new Error(
                "Unable to delete student"
            );
        }

        alert("Student deleted successfully");

        loadStudents();

    } catch (error) {

        alert(error.message);

    }
}


// Reset form
function resetForm() {

    form.reset();

    document.getElementById("studentId").value =
        "";

    document.getElementById("formTitle").innerText =
        "Add Student";
}


// Cancel button
cancelBtn.addEventListener(
    "click",
    function () {

        resetForm();

    }
);