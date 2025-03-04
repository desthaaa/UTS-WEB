document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const registerMessage = document.getElementById("register-message");

    console.log("Mengirim request registrasi:", { username, password }); // ✅ Debugging

    fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response dari server:", data); // ✅ Debugging

        if (data.token) {  // ✅ Registrasi berhasil jika token diterima
            registerMessage.style.color = "green";
            registerMessage.textContent = "Registrasi berhasil! Mengarahkan ke halaman login...";
            setTimeout(() => {
                window.location.href = "/login.html"; // ✅ Redirect ke login
            }, 2000);
        } else {
            registerMessage.style.color = "red";
            registerMessage.textContent = data.message || "Registrasi gagal!";
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        registerMessage.style.color = "red";
        registerMessage.textContent = "Terjadi kesalahan, coba lagi.";
    });
});