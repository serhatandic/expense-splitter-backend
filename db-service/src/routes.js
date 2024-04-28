const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/expense_groups/:user_mail', async (req, res) => {
	const { user_mail } = req.params;
	const { data, error } = await db.fetchExpenseGroups(user_mail);
	if (error) return res.status(500).send(error);
	res.send(data);
});

router.post('/expense_group', async (req, res) => {
	const { owner_mail, name, creation_date, participants } = req.body;
	const year = Number(creation_date.split('-')[0]);
	const month = Number(creation_date.split('-')[1]);
	const day = Number(creation_date.split('-')[2]);

	const date = new Date(year, month - 1, day);

	const { data, error } = await db.createExpenseGroup(
		owner_mail,
		name,
		participants,
		date
	);
	if (error) return res.status(500).send;
	res.send(data);
});

router.get('/expenses/:expense_group', async (req, res) => {
	const { expense_group } = req.params;
	const { data, error } = await db.fetchExpensesByGroup(expense_group);
	if (error) return res.status;
	res.send(data);
});

router.post('/expense', async (req, res) => {
	const { expense_group, expense, price, group_owner, paid_by, date } =
		req.body;
	const year = Number(date.split('-')[0]);
	const month = Number(date.split('-')[1]);
	const day = Number(date.split('-')[2]);

	const new_date = new Date(year, month - 1, day);

	const { data, error } = await db.createExpense(
		expense_group,
		expense,
		price,
		group_owner,
		paid_by,
		new_date
	);
	if (error) return res.status(500).send(error);
	res.send(data);
});

router.get('/expense_group/:expense_group', async (req, res) => {
	const { expense_group } = req.params;
	const { data, error } = await db.fetchExpenseGroupDetails(expense_group);
	if (error) return res.status(500).send(error);
	res.send(data);
});

router.get('/expenses/expense_group/:expense_group', async (req, res) => {
	const { expense_group } = req.params;
	const { data, error } = await db.fetchExpensesByGroup(expense_group);
	if (error) return res.status(500).send;
	res.send(data);
});

router.get('/expenses/user/:user_mail', async (req, res) => {
	const { user_mail } = req.params;
	const { data, error } = await db.fetchExpensesByUser(user_mail);
	if (error) return res.status(500).send;
	res.send(data);
});

router.get('expenses', async (req, res) => {
	const { data, error } = await db.fetchExpenses();
	if (error) return res.status(500).send;
	res.send(data);
});

module.exports = router;
