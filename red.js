let items = [];

function addItem() {
    const name = document.getElementById("foodName").value;
    const date = document.getElementById("expiryDate").value;

    if (!name || !date) {
        showAlert("Please enter both food name and expiry date!");
        return;
    }

    const today = new Date();
    const expiry = new Date(date);
    const diffTime = expiry - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let statusClass = "";
    let statusText = "";

    if (daysLeft > 3) {
        statusClass = "green";
        statusText = `Fresh (${daysLeft} days left)`;
    } else if (daysLeft >= 1) {
        statusClass = "yellow";
        statusText = `Expiring Soon (${daysLeft} days)`;
    } else if (daysLeft === 0) {
        statusClass = "red";
        statusText = "Expires Today!";
    } else {
        statusClass = "red";
        statusText = "Expired!";
    }

    items.push({
        name,
        date,
        statusClass,
        statusText,
        priority: statusClass === "green" ? 1 : statusClass === "yellow" ? 2 : 3
    });

    sortCards();
    displayCards();

    if (daysLeft <= 1) {
        showAlert(`${name} is ${statusText}`);
    }

    document.getElementById("foodName").value = "";
    document.getElementById("expiryDate").value = "";
}


function sortCards() {
    items.sort((a, b) => a.priority - b.priority);
}


function displayCards() {
    document.getElementById("cards").innerHTML = "";

    items.forEach((item, index) => {
        document.getElementById("cards").innerHTML += `
            <div class="card">
                <button class="delete-btn" onclick="deleteItem(${index})">X</button>
                <h3>${item.name}</h3>
                <p>Expiry: ${item.date}</p>
                <span class="status ${item.statusClass}">${item.statusText}</span>
            </div>
        `;
    });
}


function deleteItem(index) {
    items.splice(index, 1);
    displayCards();
}


function showAlert(message) {
    const alertBox = document.getElementById("alert");
    alertBox.innerText = message;

    alertBox.classList.add("alert-show");

    setTimeout(() => {
        alertBox.classList.remove("alert-show");
    }, 2500);
}
