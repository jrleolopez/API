const API_URL = "https://api-u1cj.onrender.com";

export async function apiFetch(endpoint, method, body, token) {
  const headers = { "Content-Type": "application/json" };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error en la solicitud");
  }

  return await response.json();
}

//apiFetch("/expenses/list", "GET", null, "adñsjfladjsfñalsjdfñlakjsdñflj")
