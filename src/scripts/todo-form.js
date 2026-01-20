export default function createForm() {
    const formContainer = createFormContainer();
    const formElement = formContainer.querySelector("form");
    const title = createInputField("text", "title", "Title (required):  ");
    const description = createTextAreaField("description", "Description: ");
    const date = createInputField("date", "date", "Date (required): ");
    const notes = createTextAreaField("notes", "Notes: ");
    const checklistButton = createButtonField("add-checklist", "Add Checklist");
    const submitButton = createButtonField("submit", "Create");

    formElement.append(
        title,
        description,
        date,
        notes,
        checklistButton,
        submitButton
    );

    return formContainer;
}

function createFormContainer() {
    const div = document.createElement("div");
    div.classList.add("form")

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

function createInputField(type, id, labelText) {
    const inputFieldContainer = createContainer("field");
    const label = createLabel(id, labelText);
    const input = createInput(id, type);

    inputFieldContainer.appendChild(label);
    inputFieldContainer.appendChild(input);

    return inputFieldContainer;
}

function createLabel(id, text) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = text;

    return label;
}

function createInput(id, type) {
    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("id", id);

    return input;
}

function createContainer(className) {
    const div = document.createElement("div");
    div.classList.add(className);

    return div;

}

function createButtonField(buttonClassname, text) {
    const container = createContainer("button");
    const button = createButton(buttonClassname, text);

    container.appendChild(button);

    return container;
}

function createButton(className, text) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = text;

    return button;
}