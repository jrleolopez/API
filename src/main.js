<<<<<<< HEAD
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
=======
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
>>>>>>> 1f7a12a9cb29d4bff1a89482d0757af07c3cb3b3
});