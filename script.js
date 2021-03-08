const Modal = {
	open() {
		//Abrir modal
		// Adicionbar a class active ao modal
		document.querySelector(".modal-overlay").classList.add("active");
	},

	close() {
		//Fechar o modal
		// Remover a class active do modal
		document.querySelector(".modal-overlay").classList.remove("active");
	}
};

const transactions = [
	{
		id: 1,
		description: "Luz",
		amount: -50001,
		date: "07-03-2021", 
	},
	{
		id: 2,
		description: "Website",
		amount: 500000,
		date: "07-03-2021", 
	},
	{
		id: 3,
		description: "Internet",
		amount: -20012,
		date: "07-03-2021", 
	},
	{
		id: 4,
		description: "App",
		amount: 200000,
		date: "07-03-2021", 
	},
];

const Transaction = {
	incomes() {
		let income = 0;
		// pegar todas as transações
		//para cada transacao
		transactions.forEach(transaction => {
			// se ela for maior que 0
			if (transaction.amount > 0) {
				// somar a uma variavel e retornar a variavel
				income = income + transaction.amount;
			}
		});
		//verificar se a transacao é maior que 0
		return income;
		// somar as entradas
	},
	expenses() {
		let expense = 0;
		// pegar todas as transações
		//para cada transacao
		transactions.forEach(transaction => {
			// se ela for maior que 0
			if (transaction.amount < 0) {
				// somar a uma variavel e retornar a variavel
				expense = expense + transaction.amount;
			}
		});
		//verificar se a transacao é menor que 0
		
		return expense;
		// somar as saídas
	},
	total() {
		return Transaction.incomes() + Transaction.expenses();
	}

};

// substituir os dados do html com os dados do js
// eu preciso pegar as minhas transações do meu objeto aqui no js
// e colocar la no html

const DOM = {
	transactionsContainer: document.querySelector("#data-table tbody"),
	addTransaction(transaction, index) {
		const tr = document.createElement("tr");
		tr.innerHTML = DOM.innerHTMLTransaction(transaction);

		DOM.transactionsContainer.appendChild(tr);
	},
	innerHTMLTransaction(transaction) {
		const CSSclass = transaction.amount > 0 ? "income" : "expense";

		const amount = Utils.formatCurrency(transaction.amount);

		const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="remover transação">
            </td>
        `;

		return html;
	},

	updateBalance() {
		document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes());
		document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses());
		document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total());
	}
};

const Utils = {
	formatCurrency(value) {
		const signal = Number(value) < 0 ? "-" : "";

		value = String(value).replace(/\D/g, "");

		value = Number(value) / 100;

		value = value.toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL"
		});

		return signal + value;
	}
};

transactions.forEach(function(transaction) {
	DOM.addTransaction(transaction);
});

DOM.updateBalance();