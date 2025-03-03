document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
    const token = localStorage.getItem("token");

    fetch("/tasks", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(tasks => {
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${task.title}</strong> - ${task.category} (Deadline: ${task.deadline})
                <a href="#" class="edit">Edit</a> |
                <button class="delete" data-id="${task.id}">Hapus</button>`;
            taskList.appendChild(li);
        });

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

// Logout Functionality
document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
});