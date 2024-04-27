const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const dataRoutes = require('./routes');

app.use('/api', dataRoutes);
//allow cors
app.use(cors());
app.listen(port, () => {
	console.log(`Database Service running on port ${port}`);
});
