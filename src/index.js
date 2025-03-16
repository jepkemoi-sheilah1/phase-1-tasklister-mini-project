
document.addEventListener("DOMContentLoaded", () => {
  // your code here
const newTaskDescription = document.getElementById("new-task-description");
const taskUser = document.getElementById("task-user");
const taskDueDate = document.getElementById("task-due-date");
const taskPriority = document.getElementById("task-priority");
const  theList = document.getElementById("tasks");
const sortButton = document.getElementById("sort-tasks");

const priorityColors = {
  high:"red",
  medium:"orange",
  low:"green",

};


const createNewTask = event => {
  event.preventDefault();

const newTask = document.createElement('li');

newTask.dataset.description = newTaskDescription.value;
newTask.dataset.user = taskUser.value || "N/A";
newTask.dataset.dueDate = taskDueDate.value || "N/A";
newTask.dataset.priority = taskPriority.value;

const taskText = document.createElement("span");
taskText.textContent = newTask.dataset.description;
taskText.style.color = priorityColors[newTask.dataset.priority];

const taskDetails = document.createElement('small');
taskDetails.textContent = ` (Assigned to: ${newTask.dataset.user}, Due: ${newTask.dataset.dueDate})`;

newTask.appendChild(taskText);
newTask.appendChild(taskDetails);

createButton(newTask);
theList.appendChild(newTask);

event.target.reset();
};

const createButton = task => {
  const editBtn = document.createElement("button");
  editBtn.textContent="Edit";
  editBtn.addEventListener('click', () => editTask(task));

  const btn = document.createElement('button');
  btn.textContent = "X";
  btn.addEventListener('click', (e) => deleteTask(e));
  
  task.appendChild(btn);
  task.appendChild(editBtn);
};

const deleteTask = (e) => {
  const selectedTask = e.target.parentElement;
  theList.removeChild(selectedTask);

};

const editTask = (task) => {
  newTaskDescription.value = task.dataset.description;
  taskUser.value = task.dataset.user !== "N/A" ? task.dataset.user : "";
  taskDueDate.value = task.dataset.dueDate !== "N/A" ? task.dataset.dueDate : "";
  taskPriority.value = task.dataset.priority;


  theList.removeChild(task);

};

 const sortTasksByPriority = () => {
  let tasks = Array.from(theList.children);
  tasks.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3};
    return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority];
  });

  theList.innerHTML = "";
  tasks.forEach(task => theList.appendChild(task));

};


document.querySelector('#create-task-form').addEventListener("submit", createNewTask);
sortButton.addEventListener('click' , sortTasksByPriority);


});