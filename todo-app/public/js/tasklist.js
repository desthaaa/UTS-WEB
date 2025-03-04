document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
    const token = localStorage.getItem("token");

    fetch("/tasks", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(tasks => {
        taskList.innerHTML = ""; // Kosongkan tabel sebelum ditampilkan

        tasks.forEach(task => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${task.title}</td>
                <td>${task.category}</td>
                <td>${task.deadline}</td>
                <td>
                    <button class="edit" data-id="${task.id}">Edit</button>
                    <button class="delete" data-id="${task.id}">Hapus</button>
                </td>
            `;
            taskList.appendChild(tr);
        });

        // Fitur Hapus Tugas
        document.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", function () {
                const taskId = this.getAttribute("data-id");
                fetch(`/tasks/${taskId}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                })
                .then(() => location.reload());
            });
        });
    })
    .catch(error => console.error("Error:", error));
});

async function fetchTasks() {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("/tasks", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await response.json();
        console.log(" Data tugas dari server:", data); //  Debugging

        if (response.status === 200) {
            displayTasks(data);
        } else {
            console.error(" Gagal mengambil tugas:", data.message);
        }
    } catch (error) {
        console.error(" Fetch error:", error);
    }
}

// Logout Functionality
document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
});