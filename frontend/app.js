const API_URL = "https://loginsystem-6z1a.onrender.com";

// =========================
// LOGIN
// =========================vb  

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message;
            return;
        }

        // Save JWT token
        localStorage.setItem("token", data.token);

        // Go to dashboard
        window.location.href = "landing.html";

    } catch (error) {
        message.textContent = "Unable to connect to the server.";
        console.error(error);
    }
});


// =========================
// SHOW REGISTER FORM
// =========================

const showRegister = document.getElementById("showRegister");
const registerForm = document.getElementById("registerForm");

showRegister.addEventListener("click", (event) => {
    event.preventDefault();

    registerForm.classList.toggle("hidden");
});


// =========================
// REGISTER
// =========================

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const message = document.getElementById("registerMessage");

    try {
        const response = await fetch(`${API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        message.textContent = data.message;

        if (response.ok) {
            registerForm.reset();
        }

    } catch (error) {
        message.textContent = "Unable to connect to the server.";
        console.error(error);
    }
});