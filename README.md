# Week 2 Day 3 — DOM Manipulation

Three interactive browser apps built with vanilla JavaScript and the DOM.

## 📁 Files

| File | Purpose |
|---|---|
| `counter.html` / `counter.js` | Live character counter with colour warnings |
| `shopping-list.html` / `shopping-list.js` | Add, mark bought, and delete list items |
| `calculator.html` / `calculator.js` | Four-function calculator with chained operations |
| `styles.css` | Shared stylesheet |

## 🚀 Live Demo (GitHub Pages)

- Character Counter: https://OtienoMartha.github.io/week-2-day-3-assignment/counter.html
- Shopping List: https://OtienoMartha.github.io/week-2-day-3-assignment/shopping-list.html
- Calculator: https://OtienoMartha.github.io/week-2-day-3-assignment/calculator.html

## 📸 Screenshots

### Task 1 — Character Counter
![Counter](screenshots/counter.png)

### Task 2 — Shopping List
![Shopping list](screenshots/shopping-list.png)

### Task 3 — Calculator
![Calculator](screenshots/calculator.png)

## 🎨 What I Built

### Task 1 — Character Counter
A 280-character counter inspired by Twitter/X. Uses `addEventListener("input", ...)` on the textarea to update the count in real time. The counter and textarea border turn orange when within 20 characters of the limit, and red when over. The Post button is disabled while over the limit.

### Task 2 — Dynamic Shopping List
Add items with a name and quantity. Each list item is built entirely with `document.createElement()` — no `innerHTML`. Each row has a Bought button (toggles a strikethrough class) and a Delete button (removes the `<li>`). A live counter at the top shows how many unbought items remain.

### Task 3 — Calculator
A four-function calculator that handles chained operations left-to-right: `5 + 3 × 2` evaluates as `(5 + 3) × 2 = 16`. Handles division by zero with an "Error" state and rounds to avoid float noise.

### Bonus — Keyboard Support
Fully keyboard-driven: digits `0-9`, operators `+ - * /`, `Enter` or `=` to evaluate, `Escape` or `c` to clear, `.` for decimal, `Backspace` to delete a character.

## 🧠 What I Practiced

- Selecting elements with `querySelector` and `querySelectorAll`
- Creating elements with `document.createElement()` and `appendChild()`
- Updating content with `textContent`
- Adding and toggling classes with `classList`
- Attaching event listeners — `input`, `click`, `keydown`
- Using `data-*` attributes to drive button behaviour
- Managing application state with plain variables

## ▶️ How to Run Locally

Open any of the three HTML files directly in a browser, or use VS Code's Live Server extension.