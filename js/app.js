document.addEventListener('DOMContentLoaded', () => {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }

    // Fetch cached data or initialize an empty array
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Display initial data
    updateTable();
    updateBalance();

    // Function to add a new transaction
   // Function to add a new transaction
function addTransaction()  {
    const date = document.getElementById('date').value;
    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (date && type && !isNaN(amount)) {
        const transaction = { date, type, amount };
        transactions.push(transaction);

        // Update local storage and UI
        localStorage.setItem('transactions', JSON.stringify(transactions));
        updateTable();
        updateBalance();

        // Clear input fields
        document.getElementById('date').value = '';
        document.getElementById('amount').value = '';
    }
};


    // Function to update the transaction table
    function updateTable() {
        const tableBody = document.querySelector('#expense-table tbody');
        tableBody.innerHTML = '';

        transactions.forEach(transaction => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = transaction.date;
            row.insertCell().textContent = transaction.type;
            row.insertCell().textContent = `$${transaction.amount.toFixed(2)}`;
        });
    }

    // Function to update the balance
    function updateBalance() {
        const balanceElement = document.getElementById('balance');
        const balance = transactions.reduce((acc, transaction) => {
            return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);

        balanceElement.textContent = `Balance: $${balance.toFixed(2)}`;
    }
});
