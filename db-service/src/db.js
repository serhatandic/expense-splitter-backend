require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ufalunfgcpipyoqsdxzk.supabase.co';
const SUPABASE_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmYWx1bmZnY3BpcHlvcXNkeHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzUzODUsImV4cCI6MjAyOTgxMTM4NX0.vk3tQWRx7JtLdoE9z0xRTCjsK_QbbGd5cJK2WhidkDY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchExpenseGroups(user_mail) {
	const { data, error } = await supabase.from('expense_groups').select('*');
	let new_data = [];
	data.forEach((group) => {
		Object.values(group.participants).forEach((participant) => {
			if (participant.email === user_mail) {
				new_data.push(group);
			}
		});
	});
	return { data: new_data, error };
}

async function createExpenseGroup(
	owner_mail,
	name,
	participants,
	creation_date
) {
	const { data, error } = await supabase
		.from('expense_groups')
		.insert([{ creator: owner_mail, name, participants, creation_date }]);
	return { data, error };
}

async function fetchExpensesByGroup(expense_group) {
	const { data, error } = await supabase
		.from('expenses')
		.select('*')
		.eq('expense_group', expense_group);
	return { data, error };
}

async function fetchExpensesByUser(user_mail) {
	const { data, error } = await supabase
		.from('expenses')
		.select('*')
		.eq('paid_by', user_mail);
	return { data, error };
}

async function createExpense(
	expense_group,
	expense,
	price,
	group_owner,
	paid_by,
	date
) {
	const { data, error } = await supabase
		.from('expenses')
		.insert([
			{ expense_group, expense, price, group_owner, paid_by, date },
		]);
	return { data, error };
}

async function fetchExpenseGroupDetails(expense_group) {
	const { data, error } = await supabase
		.from('expense_groups')
		.select('*')
		.eq('name', expense_group);
	return { data, error };
}

async function fetchExpenses() {
	const { data, error } = await supabase.from('expenses').select('*');
	return { data, error };
}
// Additional functions for other data interactions

module.exports = {
	fetchExpenseGroups,
	createExpenseGroup,
	fetchExpenses,
	createExpense,
	fetchExpenseGroupDetails,
	fetchExpensesByGroup,
	fetchExpensesByUser,
};
