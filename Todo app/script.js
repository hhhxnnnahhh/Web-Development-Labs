"use strict";
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
function addTask() {
    const taskText = taskInput.value.trim();
    // Empty tasks are not allowed
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    // Create a new list item
    const li = document.createElement("li");
    // Create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // Create the task text
    const span = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text");
    // Mark as completed
    checkbox.addEventListener("change", () => {
        span.classList.toggle("completed", checkbox.checked);
    });
    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    // Delete the task
    deleteButton.addEventListener("click", () => {
        li.remove();
    });
    // Add elements to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    // Add the task to the page
    taskList.appendChild(li);
    // Clear the input
    taskInput.value = "";
}
// Add a task when the button is clicked
addButton.addEventListener("click", addTask);
// Also allow Enter to add a task
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
