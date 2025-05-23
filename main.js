let addTaskBtn = document.getElementById("addTaskBtn")

function addTaskForm() { 
  // Test if code works before coding function 
  console.log("button clicked");
  //setup for function
  const taskFormDiv =
  document.getElementById("taskFormDiv");
  const taskForm = document.createElement("form");
  const taskName = document.createElement("input");
  const finalizeBtn = document.createElement("button")
  finalizeBtn.type = "button"
  finalizeBtn.textContent = "Finalize";
  taskName.type = "text";
   const taskFormLabel = document.createElement("p");
  taskFormLabel.textContent = "Task Name:";
  //inserting elements onto screen
  taskForm.appendChild(taskFormLabel);
  taskForm.appendChild(taskName);
  taskForm.appendChild(finalizeBtn);
  taskFormDiv.appendChild(taskForm);
  finalizeBtn.addEventListener("click", addTask);
 
  //creates task when activated 
  function addTask() {
    if (taskName.value.trim() === "") {
  alert("Please enter a task.");
  return;
}
 const listElement = document.createElement("li");
 listElement.textContent = taskName.value;
 const checkTask = document.createElement("input")
 checkTask.type = "checkbox"
 checkTask.addEventListener("change", () => {
  listElement.style.textDecoration = checkTask.checked ? "line-through" : "none";
});
 const toDo = document.getElementById("toDo");
 listElement.appendChild(checkTask)
 const deleteBtn = document.createElement("button");
deleteBtn.textContent = "✖";
deleteBtn.type = "button";
deleteBtn.style.marginLeft = "10px";
deleteBtn.addEventListener("click", () => {
  toDo.removeChild(listElement);
});
listElement.appendChild(deleteBtn);
 toDo.appendChild(listElement)
 
 console.log(taskName.value);
 taskFormDiv.removeChild(taskForm)
}
}

console.log("Script loaded!");