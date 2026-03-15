import { apiFetch } from "../utils/api.js";

async function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  try {
    const response = await apiFetch(
      "/auth/register",
      "POST",
      {
        name,
        email,
        password,
      },
      null,
    );

    alert("Registro exitoso, Redirigiendo a login");
    window.location.href = "login.html";
  } catch (error) {
    alert(`Error en el registro: ${error.message}`);
    console.error(error);
  }
}

document
  .getElementById("registerForm")
  .addEventListener("submit", handleRegister);
