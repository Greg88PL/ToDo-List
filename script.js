let todoInfo; //miejsce gdzie użytkownik wpisuje treść zadania
let errorInfo; //info o braku zadań / konieczności wpisania tekstu
let addBtn; // przycisk ADD
let ulList; // lista zadań
let newTodo; // nowo dodany li/nowe zadanie
let popup; // popup
let popupInfo; // tekst w popupie, jak się doda pusty tekst
let todoToEdit; // edytowany Todo
let popupInput; // input w popupie
let popupAddBtn; // przycisk "zatwierdź" w popupie
let popupCloseBtn; // przycisk "anuluj" w popupie

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};
const prepareDOMElements = () => {
  todoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

// nadajemy nasłuchiwanie
const prepareDOMEvents = () => {
  addBtn.addEventListener("click", addNewTodo);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  todoInput.addEventListener("keyup", enterKeyCheck);
  popupAddBtn.addEventListener("click", changeTodoText);
};

/*
tworzy nowy element (li)
dodaje nowy element do ul listy
funkcja odpalana na click w przycisk ADD
przechwytuje treść z inputa i umieszcza go w nowo utworzonym li
funkcja nie doda do listy pustego zadania (input value niepuste)
*/

const addNewTodo = () => {
  if (todoInput.value !== "") {
    newTodo = document.createElement("li");
    newTodo.textContent = todoInput.value;
    createToolsArea();
    ulList.append(newTodo);
    todoInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Wpisz treść zadania!";
  }
};

// stworzenie toolsów do zadań - div o klasie tools i 3x przycisk

const createToolsArea = () => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  newTodo.append(toolsPanel);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "EDIT";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

// sprawdzenie co klikamy w danym zadaniu

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editTodo(e);
  } else if (e.target.matches(".delete")) {
    deleteTodo(e);
  }
};

// funkcja otwieranie popupa

const editTodo = (e) => {
  todoToEdit = e.target.closest("li");

  popupInput.value = todoToEdit.firstChild.textContent;

  popup.style.display = "flex";
};

// funkcja zamykanie popupa

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

// funkcja zmiany zadania

const changeTodoText = () => {
  if (popupInput.value !== "") {
    todoToEdit.firstChild.textContent = popupInput.value;
    closePopup();
  } else {
    popupInfo.textContent = "Musisz podać treść zadania";
  }
};

// funkcja usuwanie elementu

const deleteTodo = (e) => {
  e.target.closest("li").remove();

  const allTodos = ulList.querySelectorAll("li");
  if (allTodos.length === 0) {
    errorInfo.textContent = "Brak zadań na liście.";
  }
};

// funkcja dodawanie zadania za pomocą klawisza ENTER
const enterKeyCheck = (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
};

// kiedy strona zostaje załadowana uruchamia się funkcja main
document.addEventListener("DOMContentLoaded", main);
