import "./styles.css";
import { format } from "date-fns";

import { createProject, removeTask } from "./modules/project";
import createToDoItem from "./modules/todo";
import { deleteProject } from "./ui/projects-overview";
import { createProjectFromForm } from "./ui/project-form";
import { createToDoFromForm, clearForm } from "./ui/todo-form";
import { addItemToPage, deleteTask } from "./ui/project-page";
import { findAndLoadPage, loadProjectListPage, loadProjectPage } from "./ui/page-load";
import { events } from "./modules/pubsub";
import { addProject, removeProjectFromNav } from "./ui/navigation";


events.on("createNewProject", addProject);
events.on("createNewProject", addToList);
events.on("createNewProject", loadProjectPage);
events.on("createToDo", clearForm);
events.on("createToDo", addItemToPage);
events.on("projectDeletion", removeProjectFromNav)
events.on("deleteTask", removeTask);

const projectList = [];

function addToList(project) {
    projectList.push(project);
}

function createDefaultProject() {
    const defaultProject = createProject("Default");
    const currentDate = format(new Date(), "y-M-d");
    const defatultToDo = createToDoItem("Default Task", "This is a sample", currentDate);
    defaultProject.addItem(defatultToDo);
}

createDefaultProject();
loadProjectListPage(projectList);

const nav = document.querySelector("nav");

nav.addEventListener("click", e => {
    const navTarget = e.target;

    if (navTarget.nodeName === "BUTTON") {
        findAndLoadPage(projectList, navTarget);
    }
});

const main = document.querySelector("main");

main.addEventListener("submit", e => {
    e.preventDefault()

    const form = document.querySelector("form");
    const targetClassName = e.submitter.className;

    switch (targetClassName) {
        case "add-checklist":
            console.log("add checklist");
            break;
        case "create-to-do":
            createToDoFromForm(form, projectList);
            break;
        case "create-project":
            createProjectFromForm(form, projectList);
            break;
    }
})

main.addEventListener("click", e => {
    const target = e.target;

    if ( target.nodeName === "BUTTON" ) {
        const targetClassName = target.className;

        switch (targetClassName) {
            case "delete-project":
                deleteProject(target, projectList);
                break;
            case "delete-task":
                deleteTask(target, projectList)
                break;
            case "project-link":
                findAndLoadPage(projectList, target);
                break;
        }
    }
})