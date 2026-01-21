import { events } from "./pubsub";

export default function createProject(projectName) {
    let name = projectName;
    let list = [];

    const editName = (newName) => { name = newName };

    const addItem = (newToDo) => { list.push(newToDo) };

    const removeItem = (toDoItem) => {
        const itemIndex = list.indexOf(toDoItem);
        list.splice(itemIndex, 1);
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
