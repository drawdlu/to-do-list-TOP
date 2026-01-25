import { createContainer, createInputFormField, createButtonField, createLabel } from "./helpers"

export default function createForm() {
    const formContainer = createFormContainer();
    const formElement = formContainer.querySelector("form");
    const title = createInputFormField("title", "text", "Title (required):  ");
    const description = createTextAreaField("description", "Description: ");
    const date = createInputFormField("date", "date", "Date (required): ");
    const notes = createTextAreaField("notes", "Notes: ");
    const submitButton = createButtonField("create-to-do", "Create");

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