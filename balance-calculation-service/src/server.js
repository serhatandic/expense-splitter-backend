const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/calculate_balances', (req, res) => {
	const { expenseGroupDetails, expensesForGroup } = req.body;

	// Calculate balances for each participant
	const balances = {};
	const totalExpenses = expensesForGroup.reduce(
		(total, expense) => total + expense.price,
		0
	);

	const paymentPerParticipant =
		totalExpenses / expenseGroupDetails.participants.length;

	expenseGroupDetails.participants.forEach((participant) => {
		const paid = expensesForGroup
			.filter((expense) => expense.paid_by === participant.name)
			.reduce((total, expense) => total + expense.price, 0);
		const shouldHavePaid = paymentPerParticipant;
		balances[participant.name] = paid - shouldHavePaid;
	});

	// Determine transactions to settle all debts
	function settleDebts(balances) {
		let debtors = [];
		let creditors = [];
		let transactions = [];

		// Classify participants as debtors or creditors
		for (const [name, balance] of Object.entries(balances)) {
			if (balance < 0) {
				debtors.push({ name, amount: -balance });
			} else if (balance > 0) {
				creditors.push({ name, amount: balance });
			}
		}

		// Match debtors with creditors
		let i = 0,
			j = 0;
		while (i < debtors.length && j < creditors.length) {
			const debtAmount = debtors[i].amount;
			const creditAmount = creditors[j].amount;
			const minAmount = Math.min(debtAmount, creditAmount);

			transactions.push({
				from: debtors[i].name,
				to: creditors[j].name,
				amount: minAmount,
			});

			// Update the amounts
			debtors[i].amount -= minAmount;
			creditors[j].amount -= minAmount;

			// Move to next debtor or creditor if settled
			if (debtors[i].amount === 0) i++;
			if (creditors[j].amount === 0) j++;
		}

		return transactions;
	}

	// Generate transactions to settle debts
	const settlement = settleDebts(balances);

	// Convert to JSON for the frontend
	const jsonOutput = JSON.stringify(settlement);

	res.json({
		balances,
		transactions: jsonOutput,
	});
});

app.listen(port, '0.0.0.0', () => {
	console.log(`Balance Calculation Service running on port ${port}`);
});
