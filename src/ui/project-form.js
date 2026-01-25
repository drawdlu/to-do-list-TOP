import { createContainer, createInputFormField, createButtonField, addRequired } from "./helpers";
import createProject from "../modules/project";
import { loadProjectPage } from "./page-load";

export function createProjectForm() {
    const container = createContainer("project-form");
    const form = document.createElement("form");
    const nameField = createInputFormField("name", "text", "Project Name: ");
    const buttonField = createButtonField("create-project", "Create");
    
    addRequired(nameField);
    container.append(form);
    form.append(nameField, buttonField);

    return container;
}

export function createProjectFromForm(form, projectList) {
    const formData = new FormData(form);
    const project = Object.fromEntries(formData.entries());
    const newProjectName = project.name;

    if (projectExists(newProjectName, projectList)) {
        alert("This project already exists");
    } else if ( newProjectName.trimStart() === "" ) {
        alert("Name Required");
    } else {
        const newProject = createProject(newProjectName);
        loadProjectPage(newProject);
    }   

}

function projectExists(name, projectList) {
    const projectNames = projectList.map( (project) => project.name.toLowerCase() );
    
    if (projectNames.includes(name.toLowerCase())) {
        return true;
    } else {
        return false;
    }
}