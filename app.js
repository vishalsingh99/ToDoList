// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
   // DOM load event
   document.addEventListener('DOMContentLoaded',getTasks);
  
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
	return false;
  }
 // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store in LocalStorage
  storeInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';
  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
	  //console.log(e.target); tareget give which element triggered the event
      //e.target.parentElement.parentElement will point to li
      // before deleting just confirm.
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LocalStorage
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
   // local Storage clear
   clearTaskFromLocalStorage();
  // https://jsperf.com/innerhtml-vs-removechild
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Store Task in localStorage
function storeInLocalStorage(task){
   let tasks;
// Checking storage if there is any variable in task
if(localStorage.getItem('tasks')=== null){
   tasks=[];
}else{
   // since storage only stores as string so we have to parse it to JSON when it come out
   tasks=JSON.parse(localStorage.getItem('tasks'));
}
   tasks.push(task);
   // we have to store as string so JSON.stringify
   localStorage.setItem('tasks',JSON.stringify(tasks));
}

// get stored value from localStorage and display
function getTasks(){
   let tasks;
   if(localStorage.getItem('tasks')=== null){
      tasks=[];
   }else{
      tasks=JSON.parse(localStorage.getItem('tasks'));
   } 
   //looop through the tasks are there
   tasks.forEach(function(task){
   // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
   });
}

// Remove Task from LS
function removeTaskFromLS(taskItem){
let tasks;
if(localStorage.getItem('tasks')=== null){
   tasks=[];
}else
tasks=JSON.parse(localStorage.getItem('tasks'));

tasks.forEach(function(task,index){
if(taskItem.textContent===task){
   tasks.splice(index,1);
}
});
localStorage.setItem('tasks',JSON.stringify(tasks));
}

// clear task 

function clearTaskFromLocalStorage(){
   localStorage.clear();
}