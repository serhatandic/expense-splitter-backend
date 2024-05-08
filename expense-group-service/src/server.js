const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.get('/expense_groups/:user_mail', (req, res) => {
	const { user_mail } = req.params;
	axios
		.get(`http://db-service:3000/expense_groups/${user_mail}`)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.status(500);
		});
});

app.post('/expense_group', (req, res) => {
	const { owner_mail, name, creation_date, participants } = req.body;
	axios
		.post('http://db-service:3000/expense_group', {
			owner_mail,
			name,
			creation_date,
			participants,
		})
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.status(500);
		});
});

app.get('/expense_group/:expense_group', (req, res) => {
	const { expense_group } = req.params;
	axios
		.get(`http://db-service:3000/expense_group/${expense_group}`)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.status(500);
		});
});

app.listen(port, '0.0.0.0', () => {
	console.log(`Group Management Service running on port ${port}`);
});
