const { sendError } = require('./../helpers/responders');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
	const token = req.get('token');
	if (!token) return sendError('No Auth Token', 401, res);
	let verifiedAccessToken;
	try {
		verifiedAccessToken = jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (e) {
		console.log(e);
	}
	if (!verifiedAccessToken) return sendError('Invalid Auth Token', 401, res);
	if (!verifiedAccessToken.userId)
		return sendError('Invalid Auth Token', 401, res);

	const user = await User.findById(verifiedAccessToken.userId);
	if (!user) return sendError('Invalid Auth Token', 401, res);
	if (!user.isAdmin)
		return sendError(
			"You don't have the permission to access this route",
			403,
			res
		);
	next();
};

const userAuth = async (req, res, next) => {
	const token = req.get('token');
	if (!token) return sendError('No Auth Token', 401, res);
	let verifiedAccessToken;
	try {
		verifiedAccessToken = jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (e) {
		console.log(e);
	}
	if (!verifiedAccessToken) return sendError('Invalid Auth Token', 401, res);
	if (!verifiedAccessToken.userId)
		return sendError('Invalid Auth Token', 401, res);

	const user = await User.findById(verifiedAccessToken.userId);
	if (!user) return sendError('Invalid Auth Token', 401, res);
	req.user = user;
	next();
};

module.exports = {
	userAuth,
	adminAuth,
};
