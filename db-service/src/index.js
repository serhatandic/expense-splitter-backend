const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const dataRoutes = require('./routes');
app.use(cors());
app.use(express.json());
app.use('/', dataRoutes);
//allow cors
app.listen(port, '0.0.0.0', () => {
	console.log(`Database Service running on port ${port}`);
});
