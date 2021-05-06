const { formatString } = require('./helpers');

const sendError = (errorMessage, statusCode, res) => {
	res.status(statusCode).send({
		status: 'Failed',
		message: formatString(errorMessage),
	});
};

const sendSuccess = (successMessage, statusCode, res) => {
	res.status(statusCode).send({
		status: 'Success',
		message: formatString(successMessage),
	});
};

const sendData = (data, statusCode, res) => {
	res.status(statusCode).send({
		status: 'Success',
		data,
	});
};

module.exports = {
	sendError,
	sendData,
	sendSuccess,
};
