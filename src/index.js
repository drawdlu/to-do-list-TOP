import "./styles.css";

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