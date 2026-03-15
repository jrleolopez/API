import { apiFetch } from "../utils/api.js";
import { setToken } from "../utils/auth.js";

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const response = await apiFetch(
      "/auth/login",
      "POST",
      { email, password },
      null,
    );
    setToken(response.token);

    alert("Redirigiendo a la pagina de categorias");
    window.location.href = "categories.html";
  } catch (error) {
    alert(`Error al iniciar sesión: ${error.message}`);
    console.error(error);
  }
}

document.getElementById("loginForm").addEventListener("submit", handleLogin);
