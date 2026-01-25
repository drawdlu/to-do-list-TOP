import "./styles.css";
import { format } from "date-fns";

import createProject from "./modules/project";
import createToDoItem from "./modules/todo";
import { createProjectFromForm } from "./ui/project-form";
import { createToDoFromForm } from "./ui/todo-form";
import { findAndLoadPage, loadProjectListPage } from "./ui/page-load";
import { events } from "./modules/pubsub";
import { addProject } from "./ui/navigation";

const projectList = [];

function addToList(project) {
    projectList.push(project);
}

events.on("createNewProject", addProject);
events.on("createNewProject", addToList);

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