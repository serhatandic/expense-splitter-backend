require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ufalunfgcpipyoqsdxzk.supabase.co';
const SUPABASE_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmYWx1bmZnY3BpcHlvcXNkeHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzUzODUsImV4cCI6MjAyOTgxMTM4NX0.vk3tQWRx7JtLdoE9z0xRTCjsK_QbbGd5cJK2WhidkDY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchExpenseGroups(owner_mail) {
	const { data, error } = await supabase
		.from('expense_groups')
		.select('name')
		.eq('creator', owner_mail);
	return { data, error };
}

// Additional functions for other data interactions

module.exports = { fetchExpenseGroups };
