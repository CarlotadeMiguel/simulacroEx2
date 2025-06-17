const API_URL = 'http://localhost:5000/api/tasks';

document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();

    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const priority = document.getElementById('priority').value;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, priority })
        });
        const newTask = await response.json();
        addTaskToDOM(newTask);
        document.getElementById('taskForm').reset();
    });
});

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    document.getElementById('taskList').innerHTML = '';
    tasks.forEach(addTaskToDOM);
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = `${task.title} [${task.priority}]`;
    document.getElementById('taskList').appendChild(li);
}
