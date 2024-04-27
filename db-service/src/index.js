const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const dataRoutes = require('./routes');
app.use(cors());

app.use('/api', dataRoutes);
//allow cors
app.listen(port, () => {
	console.log(`Database Service running on port ${port}`);
});
