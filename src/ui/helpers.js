export function createContainer(className) {
    const container = document.createElement("div");
    container.classList.add(className);

    return container;
}

export function createInputFormField(id, inputType, labelText) {
    const container = createContainer("field");
    const label = createLabel(id, labelText);
    const input = createInput(id, inputType);

    container.append( label, input );

    return container;
}

export function createButtonField(text) {
    const container = createContainer("button");
    const button = createButton(text);

    container.append(button);

    return container;
}

function createButton(text) {
    const button = document.createElement("button");
    button.textContent = text;

    return button;
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