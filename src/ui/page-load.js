import { createProjectsOverview } from "./projects-overview";
import { createProjectPage } from "./project-page";
import { createProjectForm } from "./project-form";
import { findProject, getProjectName } from "./helpers";
import { createTaskPage } from "./to-do-page";

const pages = {
    "projects": createProjectsOverview,
    "create-project": createProjectForm
}

export function findAndLoadPage(projectList, button) {
    if (button.dataset.action === "project-link" ) {
        const project = findProject(projectList, button.textContent);
        loadProjectPage(project);
    } else {
        loadNavPage(projectList, button);
    }
}

function loadNavPage(projectList, button) {
    const pageId = button.dataset.action;
    const contentDiv = getContentDiv();
    const page = pages[pageId](projectList);

    clearDiv(contentDiv);
    contentDiv.append(page);
}

export function loadProjectPage(project) {
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

export function loadProjectListPage(projectList) {
    const contentDiv = getContentDiv();
    const projectListPage = createProjectsOverview(projectList);

    clearDiv(contentDiv);
    contentDiv.append(projectListPage);
}

export function loadTaskPage(button, projectList) {
    const taskPage = getTaskPage(button, projectList);
    const content = document.querySelector("main .content");

    clearDiv(content);
    content.append(taskPage);
}

function getTaskPage(button, projectList) {
    const project = getProject(projectList);
    const toDo = getToDO(button, project);

    return createTaskPage(toDo, project);
}

function getProject(projectList) {
    const projectName = getProjectName();
    
    return findProject(projectList, projectName);
}

function getToDO(button, project) {
    const toDoName = button.textContent;

    return project.getToDoFromName(toDoName);
}