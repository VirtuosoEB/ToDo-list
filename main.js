// Get the "Add Task" button
let addTaskBtn = document.getElementById("addTaskBtn");

// Main function triggered by the Add Task button
function addTaskForm() {
  console.log("Button clicked");

  // Target the container div for the task form
  const taskFormDiv = document.getElementById("taskFormDiv");

  // Create the form and its input elements
  const taskForm = document.createElement("form");
  const taskName = document.createElement("input");
  const taskFormLabel = document.createElement("p");
  const finalizeBtn = document.createElement("button");

  // Configure elements
  taskName.type = "text";
  taskFormLabel.textContent = "Task Name:";
  finalizeBtn.type = "button";
  finalizeBtn.textContent = "Finalize";

  // Add elements to the form
  taskForm.appendChild(taskFormLabel);
  taskForm.appendChild(taskName);
  taskForm.appendChild(finalizeBtn);

  // Add the form to the page
  taskFormDiv.appendChild(taskForm);

  // When finalize is clicked, create the task
  finalizeBtn.addEventListener("click", addTask);

  function addTask() {
    // Prevent empty tasks
    if (taskName.value.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    // Create the task's <li> item
    const listElement = document.createElement("li");
    listElement.textContent = taskName.value;

    // Create checkbox
    const checkTask = document.createElement("input");
    checkTask.type = "checkbox";
    checkTask.addEventListener("change", () => {
      listElement.style.textDecoration = checkTask.checked ? "line-through" : "none";
      saveTasks()
    });

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.type = "button";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
      toDo.removeChild(listElement);
      saveTasks();
    });

    // Append checkbox and delete button to the task
    listElement.appendChild(checkTask);
    listElement.appendChild(deleteBtn);

    // Append the task to the task list
    const toDo = document.getElementById("toDo");
    toDo.appendChild(listElement);
    saveTasks();

    // Clear form
    taskFormDiv.removeChild(taskForm);

    // Log for test
    console.log(taskName.value);
  }
}

// saves tasks to local storage 
function saveTasks() {
  const li = document.querySelectorAll("#toDo li");
  let taskStorage = [];
  console.log(li);
  //creates object and adds it to task storage variable 
  for (let i = 0; i < li.length; i++){
    let taskObject = {
      Name: li[i].childNodes[0].textContent.trim(),
      Completed: li[i].querySelector("input[type = 'checkbox']").checked
    }
    taskStorage.push(taskObject);
  }
  localStorage.setItem("tasks", JSON.stringify(taskStorage));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const toDo = document.getElementById("toDo");

  tasks.forEach(taskObject => {
    const listElement = document.createElement("li");
    listElement.textContent = taskObject.Name;

    // Create checkbox
    const checkTask = document.createElement("input");
    checkTask.type = "checkbox";
    checkTask.checked = taskObject.Completed;
    checkTask.addEventListener("change", () => {
      listElement.style.textDecoration = checkTask.checked ? "line-through" : "none";
      saveTasks(); // Update localStorage when checkbox changes
    });

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.type = "button";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
      toDo.removeChild(listElement);
      saveTasks(); // Update localStorage on delete
    });

    // Apply strikethrough style if already completed
    if (taskObject.Completed) {
      listElement.style.textDecoration = "line-through";
    }

    // Add checkbox and delete button
    listElement.appendChild(checkTask);
    listElement.appendChild(deleteBtn);
    toDo.appendChild(listElement);
  });
}

window.onload = loadTasks;