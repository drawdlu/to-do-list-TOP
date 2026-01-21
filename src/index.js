import "./styles.css";
import { format } from "date-fns";

import createProject from "./modules/project";
import createToDoItem from "./modules/todo";
import createProjectsOverview from "./ui/projects-overview";
import createProjectPage from "./ui/project-page";
import createProjectForm from "./ui/project-form";
import { events } from "./modules/pubsub";
import { addProject } from "./ui/navigation";

events.on("createNewProject", addProject);
events.on("createNewProject", addToList);

const projectList = [];

function addToList(project) {
    projectList.push(project);
}

function createDefaultProject() {
    const defaultProject = createProject("Default");
    const currentDate = format(new Date(), "LLLL d, y");
    const defatultToDo = createToDoItem("Default Task", "This is a sample", currentDate);
    defaultProject.addItem(defatultToDo);
}

createDefaultProject();

const nav = document.querySelector("nav");
const pages = {
    "projects": createProjectsOverview(projectList),
    "create-project": createProjectForm()
}

nav.addEventListener("click", e => {
    const navTarget = e.target;

    if (navTarget.nodeName === "BUTTON") {
        findAndLoadPage(navTarget);
    }
})

function findAndLoadPage(button) {
    if (button.classList.contains("project-link")) {
        const project = findProject(button.textContent);
        loadProjectPage(project);
    } else {
        loadNavPage(button)
    }
}

function loadNavPage(button) {
    const pageId = button.dataset.page;
    const contentDiv = getContentDiv();
    const page = pages[pageId];

    clearDiv(contentDiv);
    contentDiv.append(page);
}

function loadProjectPage(project) {
    const contentDiv = getContentDiv();
    const projectPage = createProjectPage(project);

    clearDiv(contentDiv);
    contentDiv.append(projectPage);
}

function getContentDiv() {
    return document.querySelector("div.content");
}

function clearDiv(div) {
    div.textContent = "";
}

function findProject(text) {
    const projectListNames = projectList.map( (project) => project.name );
    const index = projectListNames.indexOf(text)

    return projectList[index]
}