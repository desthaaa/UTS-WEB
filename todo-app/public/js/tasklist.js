document.addEventListener("DOMContentLoaded", function () {
    fetchTasks(); // Ambil data tugas saat halaman dimuat

    // Logout Functionality
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "/login.html";
    });
});

// Fungsi untuk mengambil tugas dari server dan menampilkannya
async function fetchTasks() {
    const token = localStorage.getItem("token");
    const taskList = document.getElementById("tasklist");

    try {
        // Tambahkan timestamp untuk mencegah cache
        const response = await fetch(`/tasks?timestamp=${Date.now()}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const tasks = await response.json();
        console.log("Data tugas terbaru dari server:", tasks);

        if (response.status === 200 && Array.isArray(tasks)) {
            taskList.innerHTML = ""; // Kosongkan tabel sebelum menambahkan data baru

            tasks.forEach(task => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${task.title}</td>
                    <td>${task.category}</td>
                    <td>${task.deadline}</td>
                    <td>
                        <button class="edit" data-id="${task.id}" data-title="${task.title}" data-category="${task.category}" data-deadline="${task.deadline}">Edit</button>
                        <button class="delete" data-id="${task.id}">Hapus</button>
                    </td>
                `;
                taskList.appendChild(tr);
            });

            // Tambahkan event listener untuk tombol hapus setelah data ditambahkan
            document.querySelectorAll(".delete").forEach(button => {
                button.addEventListener("click", function () {
                    const taskId = this.getAttribute("data-id");
                    deleteTask(taskId);
                });
            });

            // Tambahkan event listener untuk tombol edit
            document.querySelectorAll(".edit").forEach(button => {
                button.addEventListener("click", function () {
                    const taskId = this.getAttribute("data-id");
                    const oldTitle = this.getAttribute("data-title");
                    const oldCategory = this.getAttribute("data-category");
                    const oldDeadline = this.getAttribute("data-deadline");

                    openEditPopup(taskId, oldTitle, oldCategory, oldDeadline);
                });
            });

        } else {
            console.error("Gagal mengambil tugas:", tasks.message);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// Fungsi untuk membuka popup edit tugas
function openEditPopup(taskId, title, category, deadline) {
    const popupHtml = `
        <div id="edit-popup" class="popup">
            <div class="popup-content">
                <h2>Edit Tugas</h2>
                <label>Judul:</label>
                <input type="text" id="edit-title" value="${title}">
                
                <label>Kategori:</label>
                <input type="text" id="edit-category" value="${category}">
                
                <label>Deadline:</label>
                <input type="date" id="edit-deadline" value="${deadline}">
                
                <button id="save-edit" onclcik="editTask()">Simpan</button>
                <button id="cancel-edit">Batal</button>
            </div>
        </div>
    `;
    
    // Tambahkan popup ke dalam body
    document.body.insertAdjacentHTML("beforeend", popupHtml);
    
    // Event listener untuk menyimpan perubahan
    document.getElementById("save-edit").addEventListener("click", function () {
        const newTitle = document.getElementById("edit-title").value;
        const newCategory = document.getElementById("edit-category").value;
        const newDeadline = document.getElementById("edit-deadline").value;

        updateTask(taskId, newTitle, newCategory, newDeadline);
    });

    // Event listener untuk membatalkan edit
    document.getElementById("cancel-edit").addEventListener("click", function () {
        document.getElementById("edit-popup").remove();
    });
}

// Fungsi untuk mengupdate tugas ke server
async function updateTask(taskId, title, category, deadline) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, category, deadline })
        });

        const result = await response.json();
        console.log("Update response:", result);

        if (response.status === 200) {
            alert("Tugas berhasil diperbarui!");
            document.getElementById("edit-popup").remove();
            fetchTasks(); // Refresh daftar tugas setelah update
        } else {
            alert("Gagal memperbarui tugas: " + result.message);
        }
    } catch (error) {
        console.error("Update error:", error);
    }
}

// Fungsi untuk menghapus tugas
async function deleteTask(taskId) {
    const token = localStorage.getItem("token");

    if (!confirm("Apakah Anda yakin ingin menghapus tugas ini?")) return  deleteTask();

    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const result = await response.json();
        console.log("Delete response:", result);

        if (response.status === 200) {
            alert("Tugas berhasil dihapus!");
            fetchTasks(); // Refresh daftar tugas setelah penghapusan
        } else {
            alert("Gagal menghapus tugas: " + result.message);
        }
    } catch (error) {
        console.error("Delete error:", error);
    }
}
