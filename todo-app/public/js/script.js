document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

// Fungsi untuk mengambil data tugas dari API
function loadTasks() {
    fetch("/api/tasks")
        .then(response => response.json())
        .then(tasks => {
            let taskList = document.getElementById("taskList");
            taskList.innerHTML = ""; // Bersihkan sebelum memasukkan data baru
            
            tasks.forEach(task => {
                let taskCard = document.createElement("div");
                taskCard.classList.add("task-card");
                
                taskCard.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Status: ${task.completed ? "✅ Selesai" : "❌ Belum Selesai"}</p>
                    <button class="complete-btn" onclick="markComplete(${task.id})">Selesai</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Hapus</button>
                `;
                
                taskList.appendChild(taskCard);
            });
        })
        .catch(error => console.error("Error fetching tasks:", error));
}

// Fungsi untuk menandai tugas selesai
function markComplete(id) {
    console.log(`Tandai selesai tugas dengan ID ${id}`);
    // Di sini buat API request untuk update tugas sebagai selesai
}

// Fungsi untuk menghapus tugas
function deleteTask(id) {
    console.log(`Hapus tugas dengan ID ${id}`);
    // Di sini buat API request untuk menghapus tugas
}

// Fungsi untuk menambahkan tugas baru
function addTask() {
    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;

    if (title && description) {
        console.log("Menambahkan tugas:", title, description);
        // Di sini buat API request untuk menambahkan tugas baru
    } else {
        alert("Mohon isi judul dan deskripsi tugas!");
    }
}
