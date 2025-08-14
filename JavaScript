const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    
    const text = document.createElement('span');
    text.textContent = task;
    text.contentEditable = true;
    text.addEventListener('blur', () => {
      tasks[index] = text.textContent;
      saveTasks();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(text);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value.trim() === '') return;
  tasks.push(input.value.trim());
  input.value = '';
  saveTasks();
  renderTasks();
});

renderTasks();
