// main.js
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout");

  logoutBtn.addEventListener("click", () => {
    // Elimina datos de sesión (ejemplo con localStorage)
    localStorage.removeItem("userToken"); 
    localStorage.removeItem("categories"); // si guardas categorías

    // Redirige al login
    window.location.href = "login.html";
  });
});