document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token); 
            window.location.href = "/homepage"; 
        } else {
            errorMessage.textContent = data.message || "Login gagal!";
        }
    })
    .catch(error => {
        errorMessage.textContent = "Terjadi kesalahan, coba lagi.";
        console.error("Error:", error);
    });
});