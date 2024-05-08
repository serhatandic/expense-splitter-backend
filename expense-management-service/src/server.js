const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

app.get('/expenses', async (req, res) => {
	const response = await axios.get('http://db-service:3000/expenses');
	res.send(response.data);
});

app.get('/expenses/user/:user_mail', async (req, res) => {
	const { user_mail } = req.params;
	const response = await axios.get(
		`http://db-service:3000/expenses/user/${user_mail}`
	);
	res.send(response.data);
});

app.get('/expenses/expense_group/:expense_group', async (req, res) => {
	const { expense_group } = req.params;
	const response = await axios.get(
		`http://db-service:3000/expenses/expense_group/${expense_group}`
	);
	res.send(response.data);
});

app.post('/expense', async (req, res) => {
	const { expense_group, expense, price, group_owner, paid_by, date } =
		req.body;
	const response = await axios.post('http://db-service:3000/expense', {
		expense_group,
		expense,
		price,
		group_owner,
		paid_by,
		date,
	});
	res.send(response.data);
});

app.listen(port, '0.0.0.0', () => {
	console.log(`Expense Management Service running on port ${port}`);
});
