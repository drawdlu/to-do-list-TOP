import { createLink } from "./helpers";

export function addProject(project) {
    const ulContainer = document.querySelector("nav ul.projects");
    const li = document.createElement("li");
    const link = createLink(project.name);

    li.append(link);
    ulContainer.append(li);
}