document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const totalExpense = document.getElementById('totalExpense');
    let expenses = [];

    // Load expenses from local storage
    if (localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        renderExpenses();
    }

    // Handle form submission
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const expenseName = document.getElementById('expenseName').value;
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

        if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
            const newExpense = {
                name: expenseName,
                amount: expenseAmount
            };

            expenses.push(newExpense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            clearForm();
        } else {
            alert('Please enter a valid expense name and amount.');
        }
    });

    // Render expenses
    function renderExpenses() {
        expenseList.innerHTML = '';
        let total = 0;

        expenses.forEach(function(expense) {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense');
            expenseItem.innerHTML = `
                <span>${expense.name}</span>
                <span>$${expense.amount.toFixed(2)}</span>
                <button class="delete" data-name="${expense.name}">&times;</button>
            `;
            expenseList.appendChild(expenseItem);
            total += expense.amount;
        });

        totalExpense.textContent = total.toFixed(2);
    }

    // Clear form fields
    function clearForm() {
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
    }

    // Delete expense
    expenseList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const expenseName = event.target.dataset.name;
            expenses = expenses.filter(expense => expense.name !== expenseName);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        }
    });
});