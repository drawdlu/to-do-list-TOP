import { events } from "./pubsub";

export function createProject(projectName) {
    let name = projectName;
    let list = [];

    const editName = (newName) => { name = newName };

    const addItem = (newToDo) => { list.push(newToDo) };

    const removeItem = (toDoName) => {
        const toDoItem = getToDoFromName(toDoName);
        const itemIndex = list.indexOf(toDoItem);
        list.splice(itemIndex, 1);
    }

    const getToDoFromName = (toDoName) => {
        const listTitles = list.map( (toDo) => toDo.title.value );
        const indexOfToDo = listTitles.indexOf(toDoName);
        
        return list[indexOfToDo];
    }
    
    const project =  {
        get name () { return name; },
        get list() { return [...list] },
        editName,
        addItem,
        removeItem
    };

    events.emit("createNewProject", project);

    return project;
}

export function removeTask(data) { 
    const project = data.project;
    const title = data.taskTitle;

    project.removeItem(title);
}