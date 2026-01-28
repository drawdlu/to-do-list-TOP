import { createContainer, createButton } from "./helpers";
import { format } from "date-fns";

export function createTaskPage(task, project) {
    const taskData = createTaskData(task, project);

    return taskData;
}

function createTaskData(task, project) {
    const container = createContainer("task-page");
    const taskHeader = createTaskProjectHeader(project);
    const taskTitle = createTaskTitle(task);
    const taskDueDate = createTaskDueDate(task);
    const taskDescription = createTaskDescription(task);
    const taskNotes = createTaskNotes(task);

    container.append(
        taskHeader,
        taskTitle,
        taskDueDate,
        taskDescription,
        taskNotes
    )

    return container;
}

function createTaskProjectHeader(project) {
    const container = createContainer("task-project-name");
    const header = document.createElement("h2");
    header.textContent = "Project: ";
    const projectButton = createButton("project-link", project.name);

    container.append(header);
    header.append(projectButton);

    return container;
}

function createTaskTitle(task) {
    const container = createContainer("task-title");
    const header = document.createElement("h3");
    header.textContent = task.title.value;
    const editButton = createButton("edit-task", "Edit");

    container.append(header, editButton);

    return container;
}

function createTaskDueDate(task) {
    const container = createContainer("task-due-date");
    const formattedDate = format(task.dueDate.value, "MMMM d, y")
    container.textContent = `Due Date: ${formattedDate}`;

    return container;
}

function createTaskDescription(task) {
    const container = createContainer("task-description");
    const p = document.createElement("p");
    p.textContent = task.description.value;

    container.append(p);

    return container;
}

function createTaskNotes(task) {
    const container = createContainer("task-notes");
    const noteHeader = document.createElement("h4");
    const p = document.createElement("p");

    noteHeader.textContent = "Notes";
    p.textContent = task.notes.value;

    container.append(noteHeader, p);

    return container;
}