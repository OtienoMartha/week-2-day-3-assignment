// Task 2 — Dynamic Shopping List
// Items are built with document.createElement() — no innerHTML.

// --- Element references ---
const nameInput = document.querySelector("#item-name");
const quantityInput = document.querySelector("#item-quantity");
const addBtn = document.querySelector("#add-btn");
const errorMessage = document.querySelector("#error-message");
const remainingCount = document.querySelector("#remaining-count");
const shoppingList = document.querySelector("#shopping-list");

/**
 * updateRemainingCount()
 * Counts how many list items do NOT have the "bought" class
 * and updates the display at the top.
 */
function updateRemainingCount() {
    const allItems = shoppingList.querySelectorAll("li");
    let remaining = 0;

    allItems.forEach(function (item) {
        if (!item.classList.contains("bought")) {
            remaining++;
        }
    });

    const word = remaining === 1 ? "item" : "items";
    remainingCount.textContent = `${remaining} ${word} remaining`;
}

/**
 * createListItem(name, quantity)
 * Builds one <li> with a name span, quantity span,
 * a Bought button, and a Delete button.
 * Returns the finished element.
 */
function createListItem(name, quantity) {
    // --- Create the <li> container ---
    const li = document.createElement("li");

    // --- Item name ---
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("item-name");
    nameSpan.textContent = name;
    li.appendChild(nameSpan);

    // --- Quantity ---
    const quantitySpan = document.createElement("span");
    quantitySpan.classList.add("item-quantity");
    quantitySpan.textContent = `x${quantity}`;
    li.appendChild(quantitySpan);

    // --- Bought button ---
    const boughtBtn = document.createElement("button");
    boughtBtn.classList.add("bought-btn");
    boughtBtn.textContent = "Bought";
    boughtBtn.type = "button";

    boughtBtn.addEventListener("click", function () {
        // Toggle the "bought" class on the parent <li>
        li.classList.toggle("bought");

        // Update the button label so it reads well both ways
        if (li.classList.contains("bought")) {
            boughtBtn.textContent = "Undo";
        } else {
            boughtBtn.textContent = "Bought";
        }

        updateRemainingCount();
    });

    li.appendChild(boughtBtn);

    // --- Delete button ---
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateRemainingCount();
    });

    li.appendChild(deleteBtn);

    return li;
}

/**
 * addItem()
 * Reads the inputs, validates, creates a list item,
 * and clears the form.
 */
function addItem() {
    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value, 10) || 1;

    // --- Validation ---
    if (name === "") {
        errorMessage.textContent = "Please enter an item name.";
        return;
    }

    // Clear any previous error
    errorMessage.textContent = "";

    // --- Build and append the list item ---
    const li = createListItem(name, quantity);
    shoppingList.appendChild(li);

    // --- Reset the form ---
    nameInput.value = "";
    quantityInput.value = "1";
    nameInput.focus();

    updateRemainingCount();
}

// --- Wire up the Add button ---
addBtn.addEventListener("click", addItem);

// --- Allow pressing Enter in the name field to add the item ---
nameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addItem();
    }
});

// --- Initial counter ---
updateRemainingCount();