import { createContainer, createInputFormField, createButtonField } from "./helpers";

export default function createProjectForm() {
    const container = createContainer("project-form");
    const nameField = createInputFormField("name", "text", "Project Name: ");
    const buttonField = createButtonField("Create");

    container.append(nameField, buttonField);

    return container;
}