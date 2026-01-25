import createProjectsOverview from "./projects-overview";
import createProjectPage from "./project-page";
import { createProjectForm } from "./project-form";

const pages = {
    "projects": createProjectsOverview,
    "create-project": createProjectForm
}

export function findAndLoadPage(projectList, button) {
    if (button.classList.contains("project-link")) {
        const project = findProject(projectList, button.textContent);
        loadProjectPage(project);
    } else {
        loadNavPage(projectList, button)
    }
}

function loadNavPage(projectList, button) {
    const pageId = button.dataset.page;
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

function findProject(projectList, text) {
    const projectListNames = projectList.map( (project) => project.name );
    const index = projectListNames.indexOf(text)

    return projectList[index]
}