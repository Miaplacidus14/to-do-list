class Notes {
    constructor(title, date, notes, priority) {
        this.title = title;
        this.date = date;
        this.notes = notes;
        this.priority = priority;
    }
}

let main = []

function addForm () {
    const form = document.querySelector('.new-task');
    form.style.visibility = "visible";
}



const form = document.querySelector('.new-task')
const low = document.querySelector('.low');
const normal = document.querySelector('.normal');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskTitle = e.target.title.value;
    const date = e.target.date.value;
    const notes = e.target.notes.value;
    let priority = '';
    if (low.checked) {
        priority = 'low';
    } else if (normal.checked) {
        priority = 'normal';
    } else {
        priority = 'high';
    }
    main.unshift(new Notes(taskTitle, date, notes, priority));
    form.style.visibility = "hidden";
    addToPages();
});

function addToPages () {
    const taskStorage = document.querySelector('.tasks-storage')
    const task = document.createElement('div');
    task.classList.add('task');

    const title = document.createElement('h1');
    title.textContent = `${main[0].title}`
    title.onclick = function () { affichageNotes(); }
    task.setAttribute("id", `${main[0].title}`);
    
    task.appendChild(title);
    const date = document.createElement('h1');
    date.textContent = `${main[0].date}`;
    task.appendChild(date);

    const image = document.createElement('img');
    image.src = "../src/images/trash-can.svg";
    image.setAttribute('id', `${main[0].title}`);
    image.onclick = function() { removeNotes(this.id);}
    task.appendChild(image);

    if (main[0].priority === 'low') {
        task.style.borderLeft = '3px solid yellow';
    } else if (main[0].priority === 'normal') {
        task.style.borderLeft = '3px solid orange';
    } else {
        task.style.borderLeft = '3px solid red';
    }

    const notesStorage = document.createElement('div');
    notesStorage.classList.add('notes-storage');
    notesStorage.setAttribute('id', `${main[0].title}`);
    const notesContent = document.createElement('div');
    notesContent.classList.add('notes-content');
    const notesTitle = document.createElement('h1');
    notesTitle.textContent = "Notes :"
    const paragraph = document.createElement('p');
    paragraph.textContent = main[0].notes;
    notesContent.appendChild(notesTitle);
    notesContent.appendChild(paragraph);
    notesStorage.appendChild(notesContent);
    document.body.appendChild(notesStorage);
    const close = document.createElement('img');
    close.src = "../src/images/close.svg";
    close.onclick = function () { removeNotesStorage() }
    close.classList.add("close")
    notesContent.appendChild(close)

    taskStorage.appendChild(task);
    localStorage.setItem('Main', main)
}

function removeNotes (id) {
    const notes = document.getElementById(id);
    notes.remove()
    for (let i = 0; i < main.length; i++) {
        if (id === main[i].title) {
            delete main[i];
        }
    }
}

function affichageNotes () {
    const form = document.querySelector('.notes-storage');
    form.style.visibility = "visible";
}

function removeNotesStorage () {
    const element = document.querySelector('.notes-storage');
    element.style.visibility = 'hidden';
}

