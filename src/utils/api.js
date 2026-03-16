// utils/api.js

// URL base de tu API
const API_URL = "https://api-u1cj.onrender.com";

/**
 * Función para hacer peticiones a la API con soporte para token y logs de depuración
 * @param {string} endpoint - Ruta del endpoint (ej: "/expenses/list")
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE)
 * @param {object|null} body - Datos a enviar en la petición
 * @param {string|null} token - Token de autenticación
 * @returns {Promise<object>} - Respuesta en formato JSON
 */
export async function apiFetch(endpoint, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  // Logs de depuración
  console.log("➡️ Petición:", method, `${API_URL}${endpoint}`);
  console.log("📡 Status:", response.status);

  let data = null;
  try {
    data = await response.json();
  } catch {
    console.warn("⚠️ La respuesta no es JSON válido");
  }

  console.log("📦 Respuesta completa:", data);

  if (!response.ok) {
    throw new Error(data?.error || `Error ${response.status}`);
  }

  return data;
}

// Ejemplo de uso para probar rápidamente
// (puedes borrar esto en producción)
apiFetch("/expenses/list", "GET", null, "token_de_prueba")
  .then(data => console.log("✅ Datos recibidos:", data))
  .catch(err => console.error("❌ Error en la petición:", err.message));
