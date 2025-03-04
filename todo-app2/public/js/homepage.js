document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value.trim();
    const deadline = document.getElementById("deadline").value.trim();
    const message = document.getElementById("message");
    const token = localStorage.getItem("token"); // ✅ Ambil token dari localStorage

    if (!token) {
        message.style.color = "red";
        message.textContent = "Anda belum login!";
        return;
    }

    if (!title || !category || !deadline) {
        message.style.color = "red";
        message.textContent = "Semua field harus diisi!";
        return;
    }

    fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ✅ Pastikan token dikirim dengan format yang benar
        },
        body: JSON.stringify({ title, category, deadline })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response dari server:", data); // Debugging

        if (data.message === "Task created successfully") {
            window.location.href = "/tasklist.html"; // ✅ Redirect ke tasklist setelah menyimpan
        } else {
            message.style.color = "red";
            message.textContent = data.message || "Gagal menambahkan tugas!";
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
});