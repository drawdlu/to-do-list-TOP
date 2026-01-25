import { createButton } from "./helpers";

export function addProject(project) {
    const ulContainer = document.querySelector("nav ul.projects");
    const li = document.createElement("li");
    const link = createButton("project-link", project.name);

    li.dataset.projectName = project.name;

    li.append(link);
    ulContainer.append(li);
}

export function removeProjectFromNav(projectName) {
    const liContainer = document.querySelector(`[data-project-name="${projectName}"]`)
    liContainer.remove();
}