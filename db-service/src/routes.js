const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/expense_groups/:owner_mail', async (req, res) => {
	const { owner_mail } = req.params;
	const { data, error } = await db.fetchExpenseGroups(owner_mail);
	if (error) return res.status(500).send(error);
	res.send(data);
});

// Define additional routes for other operations

module.exports = router;
