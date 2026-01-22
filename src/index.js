import "./styles.css";
import { format } from "date-fns";

import createProject from "./modules/project";
import createToDoItem from "./modules/todo";
import findAndLoadPage from "./ui/page-load";
import { events } from "./modules/pubsub";
import { addProject } from "./ui/navigation";

const projectList = [];

function addToList(project) {
    projectList.push(project);
}

events.on("createNewProject", addProject);
events.on("createNewProject", addToList);

function createDefaultProject() {
    const defaultProject = createProject("Default");
    const currentDate = format(new Date(), "LLLL d, y");
    const defatultToDo = createToDoItem("Default Task", "This is a sample", currentDate);
    defaultProject.addItem(defatultToDo);
}

createDefaultProject();

const nav = document.querySelector("nav");

nav.addEventListener("click", e => {
    const navTarget = e.target;

    if (navTarget.nodeName === "BUTTON") {
        findAndLoadPage(projectList, navTarget);
    }
});