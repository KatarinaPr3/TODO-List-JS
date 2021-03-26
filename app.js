const form = document.querySelector('form');
const input = document.querySelector('form input');
const add = document.querySelector('#add');
const ul = document.querySelector('ul');
const cbtn = document.querySelector('#delete');

loadevents();


function loadevents() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    ul.addEventListener('click', removeItem);
    cbtn.addEventListener('click', clearAll)
}

function getTasks() {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        cbtn.style.display = 'block';

    }

    tasks.forEach(function(task) {

        const li = document.createElement('li');
        li.className = 'list-item';
        li.appendChild(document.createTextNode(task));
        const x = document.createElement('a');
        x.className = 'delete-li';
        x.innerHTML = '<i class="fa fa-trash"></i>';
        li.appendChild(x);
        ul.appendChild(li);



        if (li.textContent === "") {
            li.remove();
        }

    });

}

function addTask(e) {
    if (input.value === '') {
        alert('Please fill input!');


    }
    if (ul.innerHTML === '') {
        const button = document.querySelector('.container-two button');
        button.style.display = 'none';
        ul.style.display = 'none';

    }

    const li = document.createElement('li');
    li.className = 'list-item';
    li.appendChild(document.createTextNode(input.value));
    const x = document.createElement('a');
    x.className = 'delete-li';
    x.innerHTML = '<i class="fa fa-trash"></i>';
    li.appendChild(x);
    ul.appendChild(li);

    const button = document.querySelector('.container-two button');
    button.style.display = 'block';


    if (li.textContent === "") {
        li.remove();
    }
    ul.style.display = 'block';

    storeTaskInLocalStorage(input.value);

    input.value = "";
    e.preventDefault();

}


function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeItem(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('delete-li')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }

    e.preventDefault();
    if (ul.children.length === 0) {
        const button = document.querySelector('.container-two button');

        button.style.display = 'none';
        ul.style.display = 'none';

    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);

        }

    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAll(e) {
    ul.innerHTML = '';
    if (ul.innerHTML === '') {
        const button = document.querySelector('.container-two button');
        button.style.display = 'none';
        ul.style.display = 'none';

    }
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}