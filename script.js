const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task when button clicked or Enter pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  createTaskElement(taskText, false);
  saveTask(taskText, false);

  input.value = "";
}

// Create task UI
function createTaskElement(text, completed) {
  const li = document.createElement("li");

  if (completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
    <span onclick="toggleTask(this)">${text}</span>
    <div>
      <button class="done" onclick="toggleTask(this.previousElementSibling)">✔</button>
      <button class="delete" onclick="deleteTask(this)">X</button>
    </div>
  `;

  taskList.appendChild(li);
}

// Toggle completed task
function toggleTask(span) {
  const li = span.parentElement.parentElement;
  li.classList.toggle("completed");
  updateStorage();
}

// Delete task
function deleteTask(button) {
  button.parentElement.parentElement.remove();
  updateStorage();
}

// Save to localStorage
function saveTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

// Update storage after changes
function updateStorage() {
  let tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").innerText;
    const completed = li.classList.contains("completed");

    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

