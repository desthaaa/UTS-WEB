document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const registerMessage = document.getElementById("register-message");

    fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "User registered successfully") {
            registerMessage.style.color = "green";
            registerMessage.textContent = "Registrasi berhasil! Silakan login.";
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } else {
            registerMessage.textContent = data.message || "Registrasi gagal!";
        }
    })
    .catch(error => {
        registerMessage.textContent = "Terjadi kesalahan, coba lagi.";
        console.error("Error:", error);
    });
});