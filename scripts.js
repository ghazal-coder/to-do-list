// Select elements
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const taskInput = document.getElementById('new-task');
const dueDateInput = document.getElementById('due-date');
const prioritySelect = document.getElementById('priority');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const allTasksButton = document.getElementById('all-tasks');
const activeTasksButton = document.getElementById('active-tasks');
const completedTasksButton = document.getElementById('completed-tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(tasksToRender = tasks) {
    taskList.innerHTML = '';
    tasksToRender.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-info">
                <span><strong>${task.firstName} ${task.lastName}</strong></span>
                <span>${task.text}</span>
                <span class="task-date">${task.dueDate}</span>
            </div>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        li.classList.add(`priority-${task.priority}`);
        if (task.completed) li.classList.add('completed');
        li.addEventListener('click', () => toggleTask(index));
        taskList.appendChild(li);
    });
}

function addTask() {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const text = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;
    
    if (firstName && lastName && text) {
        tasks.push({ firstName, lastName, text, dueDate, priority, completed: false });
        saveTasks();
        renderTasks();
        firstNameInput.value = '';
        lastNameInput.value = '';
        taskInput.value = '';
        dueDateInput.value = '';
        prioritySelect.value = 'low';
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteTask(e.target.dataset.index);
    }
});

allTasksButton.addEventListener('click', () => renderTasks());
activeTasksButton.addEventListener('click', () => renderTasks(tasks.filter(task => !task.completed)));
completedTasksButton.addEventListener('click', () => renderTasks(tasks.filter(task => task.completed)));

// Initial render
renderTasks();
