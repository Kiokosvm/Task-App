const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const tasks = [];

// Load tasks from local storage
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    tasks.push(...JSON.parse(storedTasks));
    tasks.forEach(task => {
        taskList.appendChild(createTaskItem(task.text, task.completed));
    });
}

addTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);

        // Save task to local storage
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        newTaskInput.value = '';
    }
});

function createTaskItem(text, completed = false) {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = text;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        li.remove();
        removeTask(text);
    });

    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.checked = completed;
    completeCheckbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        updateTaskCompletion(text, completeCheckbox.checked);
    });

    li.appendChild(completeCheckbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    if (completed) {
        li.classList.add('completed');
    }

    return li;
}

function removeTask(text) {
    tasks.splice(tasks.findIndex(task => task.text === text), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskCompletion(text, completed) {
    const task = tasks.find(task => task.text === text);
    if (task) {
        task.completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
