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

export function createButton(className, text) {
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
    input.setAttribute("name", id);

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

export function createItemName(className, title) {
    const nameContainer = createContainer("name");
    const link = createButton(className, title);

    nameContainer.append(link);

    return nameContainer;

}

export function addRequired(...fields) {
    for ( const field of fields ) {
        let input = field.querySelector("input");

        if ( input === null ) {
            input = field.querySelector("textarea");
        }
        
        input.setAttribute("required", "");
    }

}

export function findProject(projectList, text) {
    const projectListNames = projectList.map( (project) => project.name );
    const index = projectListNames.indexOf(text)

    return projectList[index]
}

export function getProjectName() {
    const header = document.querySelector("h2.project-name-header");

    return header.textContent;
}