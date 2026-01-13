import { parse, isPast } from "date-fns";

export default function createToDoItem(title, description, dueDate) {
    let completed = false;
    let priority = [ "low", "medium", "high"];
    let priorityIndex = 0;

    const toggle = () => { completed = !completed};

    const togglePriority = () => {
        priorityIndex = (priorityIndex + 1) % priority.length;
    };

    return { 
        title: createText(title),
        description: createText(description),
        notes: createText(""),
        checklist: createChecklist(),
        dueDate: createDate(dueDate),
        get completed() { return completed; },
        get priority() { return priority[priorityIndex]; },
        toggle,
        togglePriority
    };
}

function createDate(initialValue) {
    let value = parse(initialValue, "LLLL d, y", new Date());

    const edit = (newValue) => ( value = newValue );

    const overdue = () => ( isPast(value) );

    return {
        get value() { return value; },
        edit,
        overdue
    }
}

function createText(initialValue = "") {
    let value = initialValue;
    const edit = (newValue) => ( value = newValue );

    return {
        get value() { return value; }, 
        edit
    };
}

function createChecklist() {
    let values = [];

    const add = (value) => { values.push(createChecklistItem(value)) };

    const remove = (value) => { 
        const valueIndex = values.indexOf(value);
        values.splice(valueIndex, 1);
    };

    return {
        get values() { return [...values]; },
        add,
        remove
    };
}

function createChecklistItem(initialValue) {
    let completed = false;
    let value = initialValue;

    const toggle = () => { completed = !completed };

    const edit = (newValue) => { value = newValue };

    return {
        get value() { return value; },
        get completed() { return completed; },
        edit,
        toggle
    };
}