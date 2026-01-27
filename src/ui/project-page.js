import { format } from "date-fns";
import createForm from "./todo-form";
import { createContainer, createButtonField, createList, createItemName, findProject } from "./helpers";
import { events } from "../modules/pubsub";

export function createProjectPage(project) {
    const projectContainer = createContainer("project-container");
    const titleHeading = createProjectHeading(project.name);
    const formDiv = createForm();
    const list = createList("project-list", "todo-item", project.list, appendToList);

    addNameToForm(formDiv, project.name);

    projectContainer.append(
        titleHeading,
        formDiv,
        list
    );

    return projectContainer;
}

function addNameToForm(formDiv, projectName) {
    const form = formDiv.querySelector("form");
    form.dataset.projectName = projectName;
}

function createProjectHeading(name) {
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.classList.add("project-name-header");

    return h2;
}

function appendToList(ul, item, containerName) {
    const itemDiv = createListItem(item.title.value, item.dueDate.value, containerName);
    ul.append(itemDiv);
}

function createListItem(title, date, containerName) {
    const li = document.createElement("li");
    const itemContainer = createContainer(containerName);
    const itemName = createItemName("to-do-link", title);
    const itemDate = createItemDate(date);
    const buttons = createButtonField("delete-task", "Delete");

    itemContainer.append(
        itemName,
        itemDate,
        buttons
    )

    li.append(itemContainer)

    return li;
}

function createItemDate(date) {
    const dateContainer = createContainer("date");
    dateContainer.append(createDueDateSpan(), formatDate(date))

    return dateContainer;
}

function formatDate(date) {
    return format(date, "eee LLLL d y")
}

function createDueDateSpan() {
    const span = document.createElement("span");
    span.textContent = "Due Date: ";

    return span;
}

export function addItemToPage(todo) {
    const ul = document.querySelector(".project-list ul");
    const newItem = createListItem(todo.title.value, todo.dueDate.value, "todo-item");

    ul.append(newItem);
}

export function deleteTask(target, projectList) {
    const container = getContainer(target);
    const projectName = getProjectName();
    const taskTitle = getTaskNameFromContainer(container);
    const project = findProject(projectList, projectName);

    container.remove();
    events.emit("deleteTask", {project, taskTitle});
}

function getProjectName() {
    const header = document.querySelector("h2.project-name-header");

    return header.textContent;
}

function getTaskNameFromContainer(container) {
    const titleButton = container.querySelector(".todo-item button.to-do-link");
    
    return titleButton.textContent;
}

function getContainer(targetButton) {
    return targetButton.parentElement.parentElement.parentElement;
}