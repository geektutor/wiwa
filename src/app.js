const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const dbConnector = require('./utils/db');
const userRouter = require('./routes/userRouter');
const questionRouter = require('./routes/questionRouter');
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

// app.use('/questions', questionRouter);
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
