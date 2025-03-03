document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const deadline = document.getElementById("deadline").value;
    const message = document.getElementById("message");
    const token = localStorage.getItem("token");

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
        if (data.message === "Task created successfully") {
            message.style.color = "green";
            message.textContent = "Tugas berhasil ditambahkan!";
            document.getElementById("taskForm").reset();
        } else {
            message.style.color = "red";
            message.textContent = data.message || "Gagal menambahkan tugas!";
        }
    })
    .catch(error => {
        message.style.color = "red";
        message.textContent = "Terjadi kesalahan, coba lagi.";
        console.error("Error:", error);
    });
});