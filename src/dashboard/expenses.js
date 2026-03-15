import { apiFetch } from "../utils/api.js";
import { getToken } from "../utils/auth.js";

const form = document.getElementById("expenseForm");
const inputTitle = document.getElementById("expenseTitle");
const inputAmount = document.getElementById("expenseAmount");
const selectCategory = document.getElementById("expenseCategory");
const inputDate = document.getElementById("expenseDate");

const btnSave = document.getElementById("saveExpense");
const btnUpdate = document.getElementById("updateExpense");
const btnCancel = document.getElementById("cancelUpdate");

const expenseList = document.getElementById("expenseList");

// Cargar categorías
async function loadCategories() {
  try {
    const token = getToken();
    const categories = await apiFetch("/categories/list", "GET", null, token);

    selectCategory.innerHTML = `<option value="">Selecciona una categoría</option>`;
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category._id;
      option.textContent = category.name;
      selectCategory.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    alert("No pudimos cargar las categorías");
  }
}

// Crear gasto
async function saveExpense() {
  const title = inputTitle.value.trim();
  const amount = inputAmount.value.trim();
  const category = selectCategory.value;
  const date = inputDate.value;

  if (!title || !amount || !category) {
    return alert("Todos los campos son obligatorios");
  }

  try {
    const token = getToken();
    await apiFetch("/expenses/new", "POST", { title, amount, category, date }, token);

    alert("Gasto creado correctamente");
    form.reset();
    loadExpenses(); // actualizar lista automáticamente
  } catch (error) {
    console.error(error);
    alert("No se pudo crear el gasto");
  }
}

// Listar gastos
async function loadExpenses() {
  try {
    const token = getToken();
    const expenses = await apiFetch("/expenses/list", "GET", null, token);

    expenseList.innerHTML = "";

    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${expense.title} - $${expense.amount} (${expense.category.name})</span>
        <div>
          <button class="edit">Editar</button>
          <button class="delete">Eliminar</button>
        </div>
      `;

      li.querySelector(".delete").addEventListener("click", () =>
        deleteExpense(expense._id)
      );

      li.querySelector(".edit").addEventListener("click", () =>
        editExpense(expense)
      );

      expenseList.appendChild(li);
    });
  } catch (error) {
    console.error("Error al cargar gastos:", error.message);
    alert("No se pudieron cargar los gastos.");
  }
}

// Eliminar gasto
async function deleteExpense(id) {
  try {
    const token = getToken();
    await apiFetch(`/expenses/delete/${id}`, "DELETE", null, token);
    alert("Gasto eliminado correctamente");
    loadExpenses();
  } catch (error) {
    console.error("Error al eliminar gasto:", error.message);
    alert("No se pudo eliminar el gasto.");
  }
}

// Editar gasto
function editExpense(expense) {
  inputTitle.value = expense.title;
  inputAmount.value = expense.amount;
  selectCategory.value = expense.category._id;
  inputDate.value = expense.date.split("T")[0]; // formato YYYY-MM-DD

  btnSave.style.display = "none";
  btnUpdate.style.display = "inline-block";
  btnCancel.style.display = "inline-block";

  btnUpdate.dataset.id = expense._id;
}

// Actualizar gasto
async function updateExpense() {
  const id = btnUpdate.dataset.id;
  const title = inputTitle.value.trim();
  const amount = inputAmount.value.trim();
  const category = selectCategory.value;
  const date = inputDate.value;

  if (!title || !amount || !category) {
    return alert("Todos los campos son obligatorios");
  }

  try {
    const token = getToken();
    await apiFetch(`/expenses/update/${id}`, "PUT", { title, amount, category, date }, token);

    alert("Gasto actualizado correctamente");
    form.reset();
    btnSave.style.display = "inline-block";
    btnUpdate.style.display = "none";
    btnCancel.style.display = "none";
    loadExpenses();
  } catch (error) {
    console.error("Error al actualizar gasto:", error.message);
    alert("No se pudo actualizar el gasto.");
  }
}

// Cancelar edición
function cancelUpdate() {
  form.reset();
  btnSave.style.display = "inline-block";
  btnUpdate.style.display = "none";
  btnCancel.style.display = "none";
}

// Eventos
btnSave.addEventListener("click", saveExpense);
btnUpdate.addEventListener("click", updateExpense);
btnCancel.addEventListener("click", cancelUpdate);

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadExpenses();
});

