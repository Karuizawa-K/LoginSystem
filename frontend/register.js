const API_URL = "https://loginsystem-6z1a.onrender.com";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch(`${API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
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