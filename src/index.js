// import './styles/styles.css';
// import { projectManager, Project, Task } from './scripts/logic.js';

// let currentProject = defaultProject;

// function renderProjectList() {

//   const projectContainer = document.getElementById('project-container');

//   projectManager.allProjects.forEach((project, index) => {
//     const div = document.createElement('div');
//     div.classList.add('project-div');
//     div.textContent = project.name;
  
//     const btn = document.createElement('button');
//     btn.classList.add('project-delete-button');
//     btn.textContent = 'Delete';
  
//     div.appendChild(btn);
//     projectContainer.appendChild(div);
  
//     btn.addEventListener('click', () => {
//       if (index !== 0) {
//         projectManager.deleteProject(project);
//         div.remove();
//       } else {
//         alert("Default project cannot be deleted.");
//       }
//     });
//   })

//   const createProjectButton = document.createElement('button');
//   createProjectButton.textContent = 'New Project';
//   createProjectButton.classList.add('create-new-project');
//   projectContainer.appendChild(createProjectButton);
// }

// renderProjectList();

// function renderTasks() {
//   currentProject.taskList.forEach((task) => {
//     const div = document.createElement('div');
//     div.classList.add('task-div');
//     div.textContent = task.name;
  
//     const btn = document.createElement('button');
//     btn.classList.add('task-delete-button');
//     btn.textContent = 'Delete';
  
//     document.body.appendChild(div);
//     div.appendChild(btn);
  
//     btn.addEventListener('click', () => {
//       currentProject.deleteTask(task);
//       div.remove();
//     });
//   })
// }

import './styles/styles.css';
import { projectManager, Project, Task } from './scripts/logic.js';

const defaultProject = projectManager.createProject('Tasks');
const task1 = new Task('Eat', 'desc', '07/04/23', 'high prio');
const task2 = new Task('Play', 'desc', '06/04/22', 'med prio');
defaultProject.addTask(task1);
defaultProject.addTask(task2);


const proejct2 = projectManager.createProject('proejct 2');
const task4 = new Task('sleep', 'desc', '07/0sdfsdf23', 'high prio');
const task5 = new Task('Pldsdasdasy', 'desc', '06/04/22', 'med prio');
proejct2.addTask(task4);
proejct2.addTask(task5);
const proejct3 = projectManager.createProject('proejct 3');
const proejct4 = projectManager.createProject('proejct 4');


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
      console.log(`${currentProject.name} is the current project`)
    })

    // DELETE PROJECT FROM PROJECT CONTAINER
    btn.addEventListener('click', ()=> {
      if (index !== 0) {
        projectManager.deleteProject(project);
        currentProject = defaultProject;
        renderProjectList();
        renderTaskList();
        console.log(`${currentProject.name} is the current project`)

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
    <button class = 'task-complete-button'>X</button>
    ${task.name}
    <button class = 'task-details-button'>Details</button>
    <button class = 'edit-task-button'>Edit</button>
    ${task.dueDate}
    <button class = 'delete-task-button'>Delete</button>
    `;

    taskListContainer.appendChild(div);

    const deleteTaskbutton = div.querySelector('.delete-task-button');
    deleteTaskbutton.addEventListener('click', () => {
      currentProject.deleteTask(task);
      renderTaskList();
      console.log('clicked')
    })
  })
}

renderTaskList();
renderProjectList();