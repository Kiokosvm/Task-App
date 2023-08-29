const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value;
    if (taskText) {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        newTaskInput.value = '';
    }
});

function createTaskItem(text) {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = text;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        li.remove();
    });
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    return li;
}
