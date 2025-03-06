document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token); //Simpan token di localStorage
            window.location.href = "/homepage"; //Redirect ke homepage setelah login
        } else {
            errorMessage.textContent = data.message || "Login gagal!";
        }
    })
    .catch(error => {
        errorMessage.textContent = "Terjadi kesalahan, coba lagi.";
        console.error("Error:", error);
    });
});