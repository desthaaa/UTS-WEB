document.getElementById("taskForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value.trim();
    const deadline = document.getElementById("deadline").value.trim();
    const message = document.getElementById("message");
    const token = localStorage.getItem("token");

    console.log(" Data sebelum dikirim:", { title, category, deadline });

    if (!title || !category || !deadline) {
        console.log(" Data tidak lengkap!");
        message.style.color = "red";
        message.textContent = "Semua field harus diisi!";
        return;
    }

    try {
        const response = await fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, category, deadline })
        });

        const data = await response.json();
        console.log(" Response dari server:", data);

        if (response.status === 201) {
            window.location.href = "/tasklist.html";
        } else {
            message.style.color = "red";
            message.textContent = data.message || "Gagal menambahkan tugas!";
        }
    } catch (error) {
        console.error(" Fetch error:", error);
    }
});