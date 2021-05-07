const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const dbConnector = require('./utils/db');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/admin', adminRouter);
app.use('/users', userRouter);

app.use('/', (req, res) => {
	res.send('Contact the Admins to get access to this API');
});

const PORT = process.env.PORT || 3000;

dbConnector(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});
