
import './styles/styles.css';
import { projectManager, Project, Task } from './scripts/logic.js';

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
    ${task.dueDate}
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

renderTaskList();
renderProjectList();
