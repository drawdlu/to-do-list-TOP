import { format } from "date-fns";
import createForm from "./todo-form";
import { createContainer, createButtonField, createList, createItemName } from "./helpers";

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
    const buttons = createButtonField("delete", "Delete");

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

export function addItemToPage(title, date) {
    const ul = document.querySelector(".project-list ul");
    const newItem = createListItem(title, date, "todo-item");

    ul.append(newItem);
}