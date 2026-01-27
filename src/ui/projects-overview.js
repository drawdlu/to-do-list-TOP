import { createContainer, createList, createItemName, createButtonField } from "./helpers";
import { events } from "../modules/pubsub";

export function createProjectsOverview(projectList) {
    const container = createContainer("project-overview");
    const list = createList("project-list", "project-card", projectList, appendToList)

    container.append(list);

    return list;
}

function appendToList(ul, item, containerName) {
    const itemDiv = createListItem(item.name, containerName);
    ul.append(itemDiv);
}

function createListItem(name, containerName) {
    const li = document.createElement("li");
    const itemContainer = createContainer(containerName);
    const itemName = createItemName("project-link", name);
    const deleteButton = createButtonField("delete-project", "Delete");

    itemContainer.append( itemName, deleteButton);
    li.append(itemContainer);

    return li;
}

export function deleteProject(target, projectList) {
    const projectName = getProjectName(target);
    const projectListNames = projectList.map( (project) => project.name );
    const projectIndex = projectListNames.indexOf(projectName);

    projectList.splice(projectIndex, 1);
    removeProjectFromMain(target)
    events.emit("projectDeletion", projectName)
}

function getProjectName(target) {
    const projectCardDiv = target.parentElement.parentElement
    const projectNameButton = projectCardDiv.querySelector(".name button")
    
    return projectNameButton.textContent;
}

export function removeProjectFromMain(target) {
    const liContainer = getLiFromTargetButton(target);
    liContainer.remove();
}

function getLiFromTargetButton(buttonTarget) {
    return buttonTarget.parentElement.parentElement.parentElement;
}