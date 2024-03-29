const balance = document.getElementById("balance");
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
    { id: 1, text: "flower", amount: -20 },
    { id: 2, text: "salary", amount: 300 },
    { id: 3, text: "book", amount: -10 },
    { id: 4, text: "camera", amount: 150 },
];

let transactions = dummyTransactions;

// Add transaction
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter text and value");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

// Generate ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
  
    list.appendChild(item);
}

// Update values
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `RS ${total}`;
    money_plus.innerText = `RS ${income}`;
    money_minus.innerText = `RS ${expense}`;
}

// Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

// Initialize app
function init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener("submit", addTransaction);
