import "./styles.css";
import { format } from "date-fns";

import createProject from "./modules/project";
import createToDoItem from "./modules/todo";
import { events } from "./modules/pubsub";
import { addProject } from "./ui/navigation";

events.on("createNewProject", addProject);
events.on("createNewProject", addToList);

const projectList = [];

function addToList(project) {
    projectList.push(project);
}

function createDefaultProject() {
    const defaultProject = createProject("Default");
    const currentDate = format(new Date(), "LLLL d, y");
    const defatultToDo = createToDoItem("Default Task", "This is a sample", currentDate);
    defaultProject.addItem(defatultToDo);
}

createDefaultProject();