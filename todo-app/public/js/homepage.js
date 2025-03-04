document.getElementById('taskForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const deadline = document.getElementById('deadline').value;

    if (!title || !category || !deadline) {
        document.getElementById('message').innerText = "Semua field harus diisi!";
        return;
    }

    // 🔹 Ambil token dari localStorage (pastikan token disimpan saat login)
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // 🔹 Kirim token JWT
            },
            body: JSON.stringify({ title, category, deadline })
        });

        if (response.ok) {
            document.getElementById('message').innerText = "Tugas berhasil ditambahkan!";
            setTimeout(() => {
                window.location.href = "/tasklist";
            }, 1000);
        } else {
            document.getElementById('message').innerText = "Gagal menambahkan tugas.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('message').innerText = "Terjadi kesalahan.";
    }
});