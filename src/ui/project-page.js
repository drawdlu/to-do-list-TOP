import { format } from "date-fns";
import createForm from "./todo-form";

function createProjectPage(project) {
    const projectContainer = createContainer("project-container");
    const titleHeading = createProjectHeading(project.name);
    const form = createForm();
    const list = createList(project);

    projectContainer.append(
        titleHeading,
        form,
        list
    );

    return projectContainer;
}

function createContainer(className) {
    const container = document.createElement("div");
    container.classList.add(className);

    return container;
}

function createProjectHeading(name) {
    const h2 = document.createElement("h2");
    h2.textContent = name;

    return h2;
}

function createList(project) {
    const listContainer = createContainer("project-list");
    const ul = document.createElement("ul");

    for ( const item of project.list ) {
        appendToList(ul, item);
    }

    listContainer.append(ul);

    return listContainer;
}

function appendToList(ul, item) {
    const itemDiv = createListItem(item);
    ul.append(itemDiv);
}

function createListItem(item) {
    const itemContainer = createContainer("todo-item");
    const itemName = createItemName(item.title.value);
    const itemDate = createItemDate(item.dueDate.value);
    const buttons = createButtonsDiv("Delete");

    itemContainer.append(
        itemName,
        itemDate,
        buttons
    )

    return itemContainer;
}

function createItemName(title) {
    const nameContainer = createContainer("name");
    const link = createLink(title);

    nameContainer.append(link);

    return nameContainer;

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


function createLink(text) {
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.textContent = text;

    return link;
}

function createButtonsDiv(text) {
    const container = createContainer("buttons");
    const button = createButton(text);

    container.append(button);

    return container;
}

function createButton(text) {
    const button = document.createElement("button");
    button.textContent = text;

    return button;
}

export  {createProjectPage}