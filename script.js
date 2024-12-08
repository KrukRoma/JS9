// Отримуємо елементи DOM
const addButton = document.getElementById("add-btn");
const clearButton = document.getElementById("clear-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Завантажуємо список справ з Local Storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Функція для рендеринга списку справ
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.classList.toggle("completed", todo.completed);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodoStatus(index));

        const text = document.createElement("span");
        text.textContent = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Видалити";
        deleteButton.addEventListener("click", () => deleteTodo(index));

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

// Функція для додавання нової справи
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push({ text: todoText, completed: false });
        todoInput.value = "";
        saveTodos();
        renderTodos();
    }
}

// Функція для зміни статусу виконання справи
function toggleTodoStatus(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Функція для видалення справи
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Функція для очищення списку
function clearTodos() {
    todos = [];
    saveTodos();
    renderTodos();
}

// Функція для збереження списку в Local Storage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Ініціалізуємо відображення списку при завантаженні сторінки
document.addEventListener("DOMContentLoaded", renderTodos);

// Додаємо слухачі подій
addButton.addEventListener("click", addTodo);
clearButton.addEventListener("click", clearTodos);
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});
