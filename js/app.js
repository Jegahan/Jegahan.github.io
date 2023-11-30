// app.js
document.addEventListener('DOMContentLoaded', () => {
  // Check for cached transactions and load them
  const cachedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const transactionTableBody = document.getElementById('transactionTableBody');
  const currentBalanceSpan = document.getElementById('currentBalance');

  let transactions = cachedTransactions;

  // Display transactions from cache
  displayTransactions();

  // Display current balance
  updateBalance();

  // Function to add a new transaction
  window.addTransaction = function () {
    const transactionInput = document.getElementById('transaction');
    const amountInput = document.getElementById('amount');

    const transaction = transactionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (transaction && !isNaN(amount)) {
      const newTransaction = {
        date: new Date().toLocaleDateString(),
        transaction,
        amount,
      };

      transactions.push(newTransaction);
      saveTransactionsToLocalStorage();
      displayTransactions();
      updateBalance();

      // Clear input fields
      transactionInput.value = '';
      amountInput.value = '';
    } else {
      alert('Please enter valid transaction details.');
    }
  };

  // Function to display transactions in the table
  function displayTransactions() {
    transactionTableBody.innerHTML = '';

    transactions.forEach((transaction) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.transaction}</td>
        <td>${transaction.amount}</td>
      `;
      transactionTableBody.appendChild(row);
    });
  }

  // Function to update the current balance
  function updateBalance() {
    const totalBalance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    currentBalanceSpan.textContent = totalBalance.toFixed(2);
  }

  // Function to save transactions to local storage
  function saveTransactionsToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
});
