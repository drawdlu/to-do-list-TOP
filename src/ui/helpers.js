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

export function createButtonField(className, text) {
    const container = createContainer("buttons");
    const button = createButton(className, text);

    container.append(button);

    return container;
}

function createButton(className, text) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = text;

    return button;
}

export function createLabel(id, text) {
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

export function createList(containerName, listContainerName, list, appendToList) {
    const listContainer = createContainer(containerName);
    const ul = document.createElement("ul");

    if (list.length > 0) {
        for ( const item of list ) {
            appendToList(ul, item, listContainerName);
        }
    }

    listContainer.append(ul);

    return listContainer;
}

export function createLink(text) {
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.textContent = text;

    return link;
}

export function createItemName(title) {
    const nameContainer = createContainer("name");
    const link = createLink(title);

    nameContainer.append(link);

    return nameContainer;

}