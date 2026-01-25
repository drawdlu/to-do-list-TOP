import { createContainer, createInputFormField, createButtonField, createLabel, findProject, addRequired } from "./helpers"
import createToDo from "../modules/todo";
import { addItemToPage } from "./project-page";

export default function createForm() {
    const formContainer = createFormContainer();
    const formElement = formContainer.querySelector("form");
    const title = createInputFormField("title", "text", "Title (required):  ");
    const description = createTextAreaField("description", "Description: (required) ");
    const date = createInputFormField("date", "date", "Date (required): ");
    const notes = createTextAreaField("notes", "Notes: ");
    const submitButton = createButtonField("create-to-do", "Create");

    addRequired(title, description, date);

    formElement.append(
        title,
        description,
        date,
        notes,
        submitButton
    );

    return formContainer;
}

function createFormContainer() {
    const div = createContainer("form");

    const form = document.createElement("form");

    div.appendChild(form);

    return div;
}


function createTextAreaField(id, labelText) {
    const inputFieldContainer = createContainer("field");
    const label = createLabel(id, labelText);
    const textArea = createTextArea(id);

    inputFieldContainer.appendChild(label);
    inputFieldContainer.appendChild(textArea);

    return inputFieldContainer;
}

function createTextArea(id) {
    const textArea = document.createElement("textarea");
    textArea.setAttribute("name", id);
    textArea.setAttribute("id", id);

    return textArea;
}

export function createToDoFromForm(form, projectList) {
    const formData = new FormData(form);
    const todo = Object.fromEntries(formData.entries());
    const projectName = getProjectNameFromForm(form);
    const project = findProject(projectList, projectName);

    if ( !formIncomplete(todo) ) {
        const newToDo = createToDo(todo.title, todo.description, todo.date, todo.notes);
        project.addItem(newToDo);
        addItemToPage(newToDo.title.value, newToDo.dueDate.value);
        clearForm(form);
    }
}

function getProjectNameFromForm(form) {
    return form.dataset.projectName;
}

function formIncomplete(form) {
    if ( form.title.trimStart() === "" || form.description.trimStart === "" ) {
        alert("Please fill up required fields");
        return true;
    }
}

function clearForm(form) {
    const title = form.querySelector("input#title");
    const description = form.querySelector("textarea#description");
    const date = form.querySelector("input#date");
    const notes = form.querySelector("textarea#notes");
    clearInputs(title, description, date, notes);
}

function clearInputs(...inputs) {
    for ( const input of inputs) {
        input.value = "";
    }
}