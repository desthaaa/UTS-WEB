document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const registerMessage = document.getElementById("register-message");

    if (!username || !password) {
        registerMessage.style.color = "red";
        registerMessage.textContent = "Semua field harus diisi!";
        return;
    }

    fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Registrasi berhasil!") {
            registerMessage.style.color = "green";
            registerMessage.textContent = "Registrasi berhasil! Silakan login.";
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } else {
            registerMessage.style.color = "red";
            registerMessage.textContent = data.message || "Registrasi gagal!";
        }
    })
    .catch(error => {
        registerMessage.style.color = "red";
        registerMessage.textContent = "Terjadi kesalahan, coba lagi.";
        console.error("Fetch error:", error);
    });
});
