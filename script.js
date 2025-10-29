// Retrieve inventory from localStorage or create empty array
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let editIndex = null;

const form = document.getElementById("inventoryForm");
const tableBody = document.querySelector("#inventoryTable tbody");
const clearBtn = document.getElementById("clearAll");

// Display initial inventory
displayInventory();

// Add or Update Item
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    sku: document.getElementById("sku").value.trim(),
    name: document.getElementById("name").value.trim(),
    category: document.getElementById("category").value.trim(),
    quantity: parseInt(document.getElementById("quantity").value),
    supplier: document.getElementById("supplier").value.trim(),
    price: parseFloat(document.getElementById("price").value),
    location: document.getElementById("location").value.trim()
  };

  // Validation
  if (!item.sku || !item.name || !item.category || !item.supplier || !item.location) {
    alert("Please fill in all required fields!");
    return;
  }

  // Prevent duplicate SKU
  const exists = inventory.findIndex(i => i.sku === item.sku);

  if (editIndex !== null) {
    // Update existing item
    inventory[editIndex] = item;
    editIndex = null;
    alert("Item updated successfully!");
  } else if (exists >= 0) {
    alert("Item with this SKU already exists!");
    return;
  } else {
    // Add new item
    inventory.push(item);
    alert("Item added successfully!");
  }

  saveInventory();
  displayInventory();
  form.reset();
});

// Display items in table
function displayInventory() {
  tableBody.innerHTML = "";
  inventory.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.sku}</td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>${item.supplier}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${item.location}</td>
      <td>
        <button class="action-btn edit" onclick="editItem(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit an item
function editItem(index) {
  const item = inventory[index];
  document.getElementById("sku").value = item.sku;
  document.getElementById("name").value = item.name;
  document.getElementById("category").value = item.category;
  document.getElementById("quantity").value = item.quantity;
  document.getElementById("supplier").value = item.supplier;
  document.getElementById("price").value = item.price;
  document.getElementById("location").value = item.location;
  editIndex = index;
}

// Delete an item
function deleteItem(index) {
  if (confirm("Are you sure you want to delete this item?")) {
    inventory.splice(index, 1);
    saveInventory();
    displayInventory();
  }
}

// Clear all items
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all inventory?")) {
    inventory = [];
    saveInventory();
    displayInventory();
  }
});

// Save to localStorage
function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

