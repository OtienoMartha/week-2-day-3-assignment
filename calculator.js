// Task 3 — Calculator
// Supports chained operations (left-to-right evaluation).
// full keyboard support.

// --- Element references ---
const display = document.querySelector("#calc-display");
const allButtons = document.querySelectorAll(".calc-btn");

// --- Calculator state ---
let currentInput = "0";       // What the user is typing right now
let previousValue = null;     // The stored number before an operator
let pendingOperator = null;   // "+", "-", "×", "÷" or null
let waitingForOperand = false; // True right after pressing an operator

/**
 * updateDisplay()
 * Pushes the current state of currentInput to the screen.
 */
function updateDisplay() {
    display.textContent = currentInput;
}

/**
 * calculate(a, b, operator)
 * Applies an arithmetic operation. Handles division by zero.
 */
function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "×":
            return a * b;
        case "÷":
            if (b === 0) return "Error";
            return a / b;
        default:
            return b;
    }
}

/**
 * handleDigit(digit)
 * Called when the user presses a number key.
 */
function handleDigit(digit) {
    if (waitingForOperand) {
        // The previous input was an operator — start fresh
        currentInput = digit;
        waitingForOperand = false;
    } else if (currentInput === "0") {
        // Replace the leading zero
        currentInput = digit;
    } else {
        // Append the digit
        currentInput += digit;
    }

    updateDisplay();
}

/**
 * handleDecimal()
 * Adds a decimal point — only if one isn't already present.
 */
function handleDecimal() {
    if (waitingForOperand) {
        currentInput = "0.";
        waitingForOperand = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

/**
 * handleOperator(operator)
 * Handles +, -, ×, ÷. Evaluates any pending operation first,
 * so chained input works step by step.
 */
function handleOperator(operator) {
    const inputValue = parseFloat(currentInput);

    // If the user just pressed an operator, replace it
    if (pendingOperator !== null && waitingForOperand) {
        pendingOperator = operator;
        return;
    }

    // First operator press — remember the number
    if (previousValue === null) {
        previousValue = inputValue;
    } else if (pendingOperator !== null) {
        // Chain: evaluate what we have so far
        const result = calculate(previousValue, inputValue, pendingOperator);

        if (result === "Error") {
            currentInput = "Error";
            previousValue = null;
            pendingOperator = null;
            waitingForOperand = true;
            updateDisplay();
            return;
        }

        previousValue = result;
        currentInput = String(result);
    }

    pendingOperator = operator;
    waitingForOperand = true;
    updateDisplay();
}

/**
 * handleEquals()
 * Applies the pending operator and shows the result.
 */
function handleEquals() {
    if (pendingOperator === null || waitingForOperand) {
        return;
    }

    const inputValue = parseFloat(currentInput);
    const result = calculate(previousValue, inputValue, pendingOperator);

    if (result === "Error") {
        currentInput = "Error";
    } else {
        // Round to avoid float noise like 0.30000000000000004
        currentInput = String(Math.round(result * 1e10) / 1e10);
    }

    previousValue = null;
    pendingOperator = null;
    waitingForOperand = true;
    updateDisplay();
}

/**
 * handleClear()
 * Resets everything back to zero.
 */
function handleClear() {
    currentInput = "0";
    previousValue = null;
    pendingOperator = null;
    waitingForOperand = false;
    updateDisplay();
}

/**
 * handleBackspace()
 * Removes the last character the user typed.
 */
function handleBackspace() {
    if (waitingForOperand || currentInput === "Error") {
        return;
    }

    if (currentInput.length <= 1) {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }

    updateDisplay();
}

// Click handling — one listener attached to each button


allButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const digit = button.dataset.digit;
        const operator = button.dataset.operator;
        const action = button.dataset.action;
        const isDecimal = button.hasAttribute("data-decimal");

        if (digit !== undefined) {
            handleDigit(digit);
        } else if (operator !== undefined) {
            handleOperator(operator);
        } else if (isDecimal) {
            handleDecimal();
        } else if (action === "equals") {
            handleEquals();
        } else if (action === "clear") {
            handleClear();
        }
    });
});

//  Keyboard support

document.addEventListener("keydown", function (event) {
    const key = event.key;

    // Digits 0-9
    if (key >= "0" && key <= "9") {
        handleDigit(key);
        return;
    }

    // Operators (accept both * and x for multiply, / for divide)
    if (key === "+") {
        handleOperator("+");
        return;
    }
    if (key === "-") {
        handleOperator("-");
        return;
    }
    if (key === "*" || key === "x" || key === "X") {
        handleOperator("×");
        return;
    }
    if (key === "/") {
        event.preventDefault(); // Stop Firefox's quick-find
        handleOperator("÷");
        return;
    }

    // Equals / Enter
    if (key === "=" || key === "Enter") {
        event.preventDefault();
        handleEquals();
        return;
    }

    // Clear (Escape or c)
    if (key === "Escape" || key === "c" || key === "C") {
        handleClear();
        return;
    }

    // Decimal point
    if (key === ".") {
        handleDecimal();
        return;
    }

    // Backspace
    if (key === "Backspace") {
        event.preventDefault();
        handleBackspace();
    }
});

// --- Initial display ---
updateDisplay();