
import './styles/styles.css';
import { projectManager, Project, Task } from './scripts/logic.js';
import { format } from 'date-fns';

const defaultProject = projectManager.createProject('Tasks');
const task1 = new Task('Eat', 'desc', '2024-03-21', 'high');
const task2 = new Task('Play', 'desc', '2024-04-15', 'medium');
defaultProject.addTask(task1);
defaultProject.addTask(task2);

let currentProject = defaultProject;

const renderProjectList = () => {
  const projectContainer = document.getElementById('project-container');
  projectContainer.innerHTML = '';

  projectManager.allProjects.forEach((project, index) => {
    const div = document.createElement('div');
    div.classList.add('project-item');

    const span = document.createElement('span');
    span.classList.add('project-name-span');
    span.textContent = project.name;

    const btn = document.createElement('button');
    btn.classList.add('project-delete-button');
    btn.textContent = 'Delete';

    div.appendChild(span);
    div.appendChild(btn);
    projectContainer.appendChild(div);

    span.addEventListener('click', ()=> {
      currentProject = project;
      renderTaskList();
    })

    // DELETE PROJECT FROM PROJECT LIST
    btn.addEventListener('click', ()=> {
      if (index !== 0) {
        projectManager.deleteProject(project);
        currentProject = defaultProject;
        renderProjectList();
        renderTaskList();
      } else {
        alert("Default project cannot be deleted.");
      }
    })
  })
}

const renderTaskList = () => {
  const taskListContainer = document.getElementById('task-container');
  taskListContainer.innerHTML = '';

  currentProject.taskList.forEach((task) => {
    const div = document.createElement('div');
    div.classList.add('task-item');
    div.innerHTML = `
    <button class = 'task-complete-button'></button>
    ${task.name}
    <button class = 'task-details-button'>Details</button>
    <button class = 'edit-task-button'>Edit</button>
    ${format(new Date(task.dueDate), 'dd-MM')}
    <button class = 'delete-task-button'>Delete</button>
    `;

    if (task.priority === 'low') {
      div.classList.add('low-priority')
    } else if (task.priority === 'medium') {
      div.classList.add('medium-priority')
    } else if (task.priority === 'high') {
      div.classList.add('high-priority')
    }

    taskListContainer.appendChild(div);

    // DELETE TASK FROM TASKLIST
    const deleteTaskbutton = div.querySelector('.delete-task-button');
    deleteTaskbutton.addEventListener('click', () => {
      currentProject.deleteTask(task);
      renderTaskList();
    })

    // EDIT TASK
    const editTaskButton = div.querySelector('.edit-task-button');
    editTaskButton.addEventListener('click', () => {
      openEditModal(task);
    });
  })
}

const openEditModal = (task) => {
  const modal = createModal(task);
  modal.showModal();

  const applyChangesButton = modal.querySelector('.js-add-task');
  applyChangesButton.addEventListener('click', (event) => {
    event.preventDefault();
    editTask(task, modal);
    clearInputFields(modal);
    modal.close();
    renderTaskList();
  });

  const cancelButton = modal.querySelector('.cancel-button');
  cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.close();
  });
}

const createModal = (task) => {
  const modal  = document.createElement('dialog');
  modal.classList.add('jsmodal');
  
  modal.innerHTML = `
  <form>
    <p><label for="task-title">Title:</label></p>
    <input type="text" id="task-title" class="text-input" value="${task.name}">

    <p><label for="task-description">Description:</label></p>
    <input type="text" id="task-description" class="text-input" value="${task.description}">

    <p><label for="due-date">Due Date:</label></p>
    <input type="date" id="due-date" class="due-date-input" value="${task.dueDate}">

    <p>Priority:</p>
    <label>
      Low
      <input type="radio" name="priority" id="low-priority-radio" value="low" ${task.priority === 'low' ? 'checked' : ''}> 
    </label>

    <label>
      Medium
      <input type="radio" name="priority" id="medium-priority-radio" value="medium" ${task.priority === 'medium' ? 'checked' : ''}> 
    </label>

    <label>
      High
      <input type="radio" name="priority" id="high-priority-radio" value="high" ${task.priority === 'high' ? 'checked' : ''}> 
    </label>

    <p class="dialog-button-section">
    <button class="cancel-button dialog-btn">Cancel</button>
    <button class="js-add-task dialog-btn">Save</button>
    </p>
  </form>
  `
  document.body.appendChild(modal);
  return modal
};

function editTask(task, modal) {
  const title = modal.querySelector('#task-title').value;
  const description = modal.querySelector('#task-description').value;
  const dueDate = modal.querySelector('#due-date').value;
  const priority = modal.querySelector('input[name="priority"]:checked').value;

  task.editTaskInfo(title, description, dueDate, priority);
}

function clearInputFields() {
  const modal = document.querySelector('.jsmodal');
  
  const title = modal.querySelector('#task-title');
  const description = modal.querySelector('#task-description');
  const dueDate = modal.querySelector('#due-date');
  const lowPriority = modal.querySelector('#low-priority-radio');

  title.value = '';
  description.value = '';
  dueDate.value = '';
  lowPriority.checked = true;
}

const createNewTaskModal = (() => {
  const modal  = document.createElement('dialog');
  modal.classList.add('new-task-modal');
  modal.classList.add('jsmodal');

  modal.innerHTML = `
  <form>
    <p><label for="task-title">Title:</label></p>
    <input type="text" id="task-title" class="text-input">

    <p><label for="task-description">Description:</label></p>
    <input type="text" id="task-description" class="text-input">

    <p><label for="due-date">Due Date:</label></p>
    <input type="date" id="due-date" class="due-date-input">

    <p>Priority:</p>
    <label>
      Low
      <input type="radio" name="priority" id="low-priority-radio" value="low" checked}> 
    </label>

    <label>
      Medium
      <input type="radio" name="priority" id="medium-priority-radio" value="medium"> 
    </label>

    <label>
      High
      <input type="radio" name="priority" id="high-priority-radio" value="high"> 
    </label>

    <p class="dialog-button-section">
    <button class="cancel-button dialog-btn">Cancel</button>
    <button class="js-add-task dialog-btn">Save</button>
    </p>
  </form>
  `
  document.body.appendChild(modal);
})();

const addNewTaskButton = (() => {
  const button = document.createElement('button');
  button.classList.add('new-task-button');
  button.textContent = 'New Task';
  const header = document.querySelector('.title-container');
  header.appendChild(button);

  button.addEventListener('click', () => {
    const modal = document.querySelector('.new-task-modal');
    modal.showModal();
  })
})();

const newTaskModal = document.querySelector('.new-task-modal');
const newTaskSaveButton = newTaskModal.querySelector('.js-add-task');
newTaskSaveButton.addEventListener('click', (event) => {
  event.preventDefault();

  const modal = newTaskModal;
  const title = modal.querySelector('#task-title').value;
  const description = modal.querySelector('#task-description').value;
  const dueDate = modal.querySelector('#due-date').value;
  const lowPriority = modal.querySelector('#low-priority-radio');
  const mediumPriority = modal.querySelector('#medium-priority-radio');
  const highPriority = modal.querySelector('#high-priority-radio');
  let selectedRadio;

  if (lowPriority.checked) {
    selectedRadio = 'low';
  } else if (mediumPriority.checked) {
    selectedRadio = 'medium';
  } else if (highPriority.checked) {
    selectedRadio = 'high';
  }

  const newTask = new Task(title, description, dueDate, selectedRadio);
  currentProject.taskList.push(newTask);
  renderTaskList();
  modal.close();
  clearInputFields();
})

const allModal = document.querySelector('.jsmodal');
const cancelButton = allModal.querySelector('.cancel-button');
cancelButton.addEventListener('click', (event) => {
  event.preventDefault();
  allModal.close();
})

const createNewProjectModal = (() => {
  const modal  = document.createElement('dialog');
  modal.classList.add('new-project-modal');

  modal.innerHTML = `
    <p><label for="project-title">New Project Title:</label></p>
    <input type="text" id="project-title" class="text-input">

    <p class="dialog-button-section">
    <button class="cancel-button dialog-btn">Cancel</button>
    <button class="js-add-project dialog-btn">Save</button>
    </p>
  `
  document.body.appendChild(modal);

  modal.querySelector('.js-add-project')
    .addEventListener('click', () => {
      const name = modal.querySelector('#project-title').value;
      const newProject = projectManager.createProject(name);
      currentProject = newProject;
      renderProjectList();
      renderTaskList();
      modal.close();
    })
})();

const addNewProject = (() => {
  const button = document.createElement('button');
  button.classList.add('new-project-button');
  button.textContent = 'New Project';
  const header = document.querySelector('.title-container');
  header.insertBefore(button, header.firstChild);

  button.addEventListener('click', () => {
    const modal = document.querySelector('.new-project-modal');
    modal.showModal();
  })
})();

renderTaskList();
renderProjectList();
