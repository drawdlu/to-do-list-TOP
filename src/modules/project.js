export default function createProject(projectName) {
    let name = projectName;
    let list = [];

    const editName = (newName) => { name = newName };

    const addItem = (newToDo) => { list.push(newToDo) };

    const removeItem = (toDoItem) => {
        const itemIndex = list.indexOf(toDoItem);
        list.splice(itemIndex, 1);
    }
    
    return {
        get name () { return name; },
        get list() { return [...list] },
        editName,
        addItem,
        removeItem
    };
}
