const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addButton = document.getElementById("addButton") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

function addTask(): void {
    const taskText: string = taskInput.value.trim();

    // Empty tasks are not allowed
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // list item
    const li: HTMLLIElement = document.createElement("li");

    // checkbox
    const checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";

    // task text
    const span: HTMLSpanElement = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text");

    // mark as completed
    checkbox.addEventListener("change", () => {
        span.classList.toggle("completed", checkbox.checked);
    });

    // delete button
    const deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", () => {
        li.remove();
    });

    // add elements to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    // add the task to the page
    taskList.appendChild(li);

    // clear the input
    taskInput.value = "";
}

// add a task when the button is clicked
addButton.addEventListener("click", addTask);

// allow Enter to add a task
taskInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        addTask();
    }
});
