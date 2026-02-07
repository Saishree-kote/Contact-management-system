const form = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const search = document.getElementById("search");
const noResults = document.getElementById("noResults");

// Load contacts from MySQL when page opens
window.addEventListener("DOMContentLoaded", loadContacts);

function loadContacts() {
    fetch('http://localhost:3000/api/contacts')
        .then(response => response.json())
        .then(contacts => {
            contactList.innerHTML = ""; 
            contacts.forEach(contact => renderContactRow(contact));
            checkEmptyState();
        })
        .catch(err => console.error("Could not load contacts:", err));
}

// Add Contact Logic
form.addEventListener("submit", e => {
    e.preventDefault();

    const contactData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value || "N/A",
        phone: document.getElementById("phone").value
    };

    fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
    })
    .then(response => response.json())
    .then(newContact => {
        // Create a full object to render, including the ID from MySQL
        renderContactRow({
            id: newContact.id,
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone
        });
        form.reset();
        checkEmptyState();
    })
    .catch(err => console.error("Error saving contact:", err));
});

// Render Logic
function renderContactRow(contact) {
    const row = document.createElement("tr");
    row.setAttribute("data-id", contact.id); 
    
    row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td style="text-align: right;"><button class="delete">Delete</button></td>
    `;

    row.querySelector(".delete").onclick = () => {
        if (confirm(`Delete ${contact.name}?`)) {
            deleteContact(contact.id, row);
        }
    };

    contactList.appendChild(row);
}

// Delete Logic
function deleteContact(id, rowElement) {
    fetch(`http://localhost:3000/api/contacts/${id}`, { method: 'DELETE' })
    .then(() => {
        rowElement.style.opacity = "0";
        setTimeout(() => {
            rowElement.remove();
            checkEmptyState();
        }, 200);
    })
    .catch(err => console.error("Error deleting contact:", err));
}

// Search & UI Helpers
search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    const rows = document.querySelectorAll("#contactList tr");
    let visibleCount = 0;

    rows.forEach(row => {
        const nameText = row.children[0].textContent.toLowerCase();
        const matches = nameText.includes(value);
        row.style.display = matches ? "" : "none";
        if (matches) visibleCount++;
    });

    noResults.classList.toggle("hidden", visibleCount > 0 || rows.length === 0);
});

function checkEmptyState() {
    const rows = document.querySelectorAll("#contactList tr");
    noResults.classList.toggle("hidden", rows.length > 0);
    if (rows.length === 0) noResults.textContent = "Your contact list is empty.";
}