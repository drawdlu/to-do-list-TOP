import { createContainer, createList, createItemName, createButtonField } from "./helpers";

export default function createProjectsOverview(projectList) {
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
    const itemName = createItemName("project-name", name);
    const deleteButton = createButtonField("delete", "Delete");

    itemContainer.append( itemName, deleteButton);
    li.append(itemContainer);

    return li;
}