document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value.trim();
    const deadline = document.getElementById("deadline").value.trim();
    const message = document.getElementById("message");
    const token = localStorage.getItem("token");

    // Debugging
    console.log("Title:", title);
    console.log("Category:", category);
    console.log("Deadline:", deadline);

    if (!title || !category || !deadline) {
        message.style.color = "red";
        message.textContent = "Semua field harus diisi!";
        return;
    }

    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, category, deadline })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response dari server:", data);  // Tambahkan log respons dari server
    
        if (data.message === "Task created successfully") {
            window.location.href = "/tasklist.html";  // Redirect ke daftar tugas
        } else {
            message.style.color = "red";
            message.textContent = data.message || "Gagal menambahkan tugas!";
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.removeItem("token"); // Hapus token dari localStorage
        window.location.href = "/login.html"; // Redirect ke halaman login
    });    
});