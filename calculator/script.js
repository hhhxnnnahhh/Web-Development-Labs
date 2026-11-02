
const display = document.getElementById("display");
const buttons = document.querySelectorAll("[data-value]");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");

let firstNumber = "";
let operator = "";
let newNumber = false;

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.dataset.value;

        if (["+", "-", "*", "/"].includes(value)) {
            firstNumber = display.value;
            operator = value;
            display.value += value;
        } else {
            const currentNumber = display.value.split(/[+\-*/]/).pop();

            if (value !== "." || !currentNumber.includes(".")) {
                display.value += value;
            }
        }
    });
});

clear.addEventListener("click", function() {
    display.value = "";
    firstNumber = "";
    operator = "";
    newNumber = false;
});


equals.addEventListener("click", function() {
    const expression = display.value;
    const match = expression.match(/^(-?\d+\.?\d*)([+\-*/])(-?\d+\.?\d*)$/);

    if (!match) return;

    const a = Number(match[1]);
    const op = match[2];
    const b = Number(match[3]);
    let result;

    if (op === "+") result = a + b;
    else if (op === "-") result = a - b;
    else if (op === "*") result = a * b;
    else if (op === "/") result = b === 0 ? "Error" : a / b;

    display.value = typeof result === "number"
        ? String(Number(result.toPrecision(10)))
        : result;

    firstNumber = "";
    operator = "";
});
