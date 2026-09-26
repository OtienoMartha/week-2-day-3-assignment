// Task 1 — Character Counter
// Live character count with colour warnings.


// --- Select the elements we need ---
const textarea = document.querySelector("#tweet-input");
const display = document.querySelector("#counter-display");
const submitBtn = document.querySelector("#submit-btn");

const MAX_CHARS = 280;
const WARNING_THRESHOLD = 260; // Start warning at 261

/**
 * updateCounter()
 * Runs every time the user types. Updates the count text,
 * applies warning/danger colours, and disables the button
 * when the user is over the limit.
 */
function updateCounter() {
    const count = textarea.value.length;

    // Update the text
    display.textContent = `${count}/${MAX_CHARS} characters`;

    // --- Colour logic ---
    // Remove previous state classes first
    textarea.classList.remove("warning", "danger");
    display.classList.remove("warning", "danger");
    submitBtn.disabled = false;

    if (count > MAX_CHARS) {
        // Over the limit → red
        textarea.classList.add("danger");
        display.classList.add("danger");
        submitBtn.disabled = true;
    } else if (count >= WARNING_THRESHOLD) {
        // Close to the limit → orange
        textarea.classList.add("warning");
        display.classList.add("warning");
    }
    // Otherwise, no extra class → default colour
}

// --- Listen for input on the textarea ---
textarea.addEventListener("input", updateCounter);

// --- Optional: handle the Post button ---
submitBtn.addEventListener("click", function () {
    alert(`Posted: "${textarea.value}"`);
});

// --- Run once on load so the display starts correct ---
updateCounter();