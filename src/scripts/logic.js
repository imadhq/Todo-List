class ProjectManager {
  constructor() {
    this.allProjects = [];
  }

  createProject(name) {
    const project = new Project(name);
    this.allProjects.push(project);
    return project;
  }

  deleteProject(project) {
    const index = this.allProjects.indexOf(project);
    if (index > -1) {
      this.allProjects.splice(index, 1);
    } else {
      throw new Error('Project not found');
    }
  }
}

export const projectManager = new ProjectManager(); 

export class Project {
  constructor(name) {
    this.name = name;
    this.taskList = [];
  }

  setName(newName) {
    this.name = newName;
  }

  addTask(task) {
    this.taskList.push(task);
  }

  deleteTask(task) {
   const index = this.taskList.indexOf(task);
   if (index > -1) {
    this.taskList.splice(index, 1);
   }
   return this.taskList;
  }
}

export class Task {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority
  }

  editTaskInfo(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority
  }
}