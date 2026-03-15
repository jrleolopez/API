import { apiFetch } from "../utils/api.js";
import { getToken } from "../utils/auth.js";

// Referencias al DOM
const form = document.getElementById("categoryForm");
const inputName = document.getElementById("categoryName");
const inputId = document.getElementById("categoryId");
const btnSave = document.getElementById("saveCategory");
const btnUpdate = document.getElementById("updateCategory");
const btnCancel = document.getElementById("cancelUpdate");
const list = document.getElementById("categoryList");

// Crear categoría
async function saveCategory() {
  const name = inputName.value.trim();
  if (!name) {
    alert("Escribe un nombre para la categoría");
    return;
  }

  try {
    const token = getToken();
    await apiFetch("/categories/new", "POST", { name }, token);
    alert("Categoría guardada correctamente");
    form.reset();
    loadCategories();
  } catch (error) {
    console.error(error);
    alert("No se pudo guardar la categoría");
  }
}

// Listar categorías
async function loadCategories() {
  try {
    const token = getToken();
    const categories = await apiFetch("/categories/list", "GET", null, token);
    list.innerHTML = "";

    categories.forEach((category) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${category.name}</span>
        <div class="buttons">
          <button class="edit">Editar</button>
          <button class="delete">Eliminar</button>
        </div>
      `;

      li.querySelector(".edit").addEventListener("click", () =>
        editCategory(category)
      );

      li.querySelector(".delete").addEventListener("click", () =>
        deleteCategory(category._id)
      );

      list.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    alert("No se pudieron cargar las categorías");
  }
}

// Editar categoría
function editCategory(category) {
  inputId.value = category._id;
  inputName.value = category.name;
  btnSave.style.display = "none";
  btnUpdate.style.display = "inline-block";
  btnCancel.style.display = "inline-block";
}

// Cancelar edición
function cancelUpdate() {
  form.reset();
  inputId.value = "";
  btnSave.style.display = "inline-block";
  btnUpdate.style.display = "none";
  btnCancel.style.display = "none";
}

// Actualizar categoría
async function updateCategory() {
  const id = inputId.value;
  const name = inputName.value.trim();

  if (!id || !name) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const token = getToken();
    await apiFetch(`/categories/${id}`, "PUT", { name }, token);
    alert("Categoría actualizada correctamente");
    cancelUpdate();
    loadCategories();
  } catch (error) {
    console.error(error);
    alert("No pudimos actualizar la categoría");
  }
}

// Eliminar categoría
async function deleteCategory(id) {
  try {
    const token = getToken();
    await apiFetch(`/categories/${id}`, "DELETE", null, token);
    alert("Categoría eliminada correctamente");
    loadCategories();
  } catch (error) {
    console.error(error);
    alert("No se pudo eliminar la categoría");
  }
}

// Eventos
btnSave.addEventListener("click", saveCategory);
btnUpdate.addEventListener("click", updateCategory);
btnCancel.addEventListener("click", cancelUpdate);

document.addEventListener("DOMContentLoaded", loadCategories);
