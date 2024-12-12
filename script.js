const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Add Task Function
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create a new task element
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Add event listener for marking as complete
  li.addEventListener('click', () => {
    li.querySelector('span').classList.toggle('task-complete');
  });

  // Add event listener for deleting task
  li.querySelector('.delete-btn').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the mark complete action
    li.remove();
  });

  // Append to the task list
  taskList.appendChild(li);

  // Clear the input
  taskInput.value = '';
}

// Event Listener for the Add Button
addTaskBtn.addEventListener('click', addTask);

// Add Task on Enter Key
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Load tasks from localStorage on startup
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
      createTaskElement(task.text, task.completed);
    });
  }
  
  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
      tasks.push({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('span').classList.contains('task-complete'),
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Modify addTask to save tasks
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }
  
    createTaskElement(taskText);
    saveTasks(); // Save after adding
    taskInput.value = '';
  }
  
  // Create a new task element
  function createTaskElement(taskText, completed = false) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${completed ? 'task-complete' : ''}">${taskText}</span>
      <button class="delete-btn">Delete</button>
    `;
  
    li.addEventListener('click', () => {
      li.querySelector('span').classList.toggle('task-complete');
      saveTasks();
    });
  
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });
  
    taskList.appendChild(li);
  }
  
  // Load tasks on page load
  document.addEventListener('DOMContentLoaded', loadTasks);
  const clearAllBtn = document.getElementById('clear-all-btn');

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
  taskList.innerHTML = '';
  saveTasks();
});
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Load theme on startup
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('#task-list li').forEach(li => {
      const isCompleted = li.querySelector('span').classList.contains('task-complete');
      if (filter === 'all' || (filter === 'completed' && isCompleted) || (filter === 'pending' && !isCompleted)) {
        li.style.display = 'flex';
      } else {
        li.style.display = 'none';
      }
    });
  });
});



