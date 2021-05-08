const { sendData, sendError, sendSuccess } = require('./../helpers/responders');
const Key = require('../models/key');
const {
	sanitizeKey,
	sanitizeFeedback,
	sanitizeUser,
} = require('../helpers/helpers');
const User = require('../models/user');
const Feedback = require('../models/feedback');

const getAllKeys = async (req, res) => {
	try {
		let keys = await Key.find({});
		keys = keys.map(sanitizeKey);
		sendData(keys, 200, res);
	} catch (e) {
		console.log(e);
		sendError('Server Error', 500, res);
	}
};

const getKey = async (req, res) => {
	const { keyId } = req.params;
	try {
		const key = await Key.findById(keyId);
		if (!key) return sendError('Key not found', 404, res);
		sendData(sanitizeKey(key), 200, res);
	} catch (e) {
		console.log(e);
		sendError('Server Error', 500, res);
	}
};

const createKey = async (req, res) => {
	const { key } = req.body;
	if (!key) return sendError('Key must be provided', 400, res);
	const dbKey = new Key({
		key,
	});
	await dbKey.save();
	sendData(sanitizeKey(dbKey), 201, res);
};

const editKey = async (req, res) => {
	const { key } = req.body;
	const { keyId } = req.params;
	if (!key) return sendError('Key must be sent', 400, res);
	const dbKey = await Key.findById(keyId);
	if (!dbKey) return sendError('Key not found', 404, res);
	dbKey.key = key;
	await dbKey.save();
	sendData(sanitizeKey(dbKey), 202, res);
};

const deleteKey = async (req, res) => {
	const { keyId } = req.params;
	const key = await Key.findByIdAndDelete(keyId);
	console.log('Deleted Question', key);
	//if(!question) return sendError('Question not found', 404, res)
	sendSuccess('Question Deleted', 202, res);
};

const getAllUsers = async (req, res) => {
	let users = await User.find({});
	users = users.map((user) => ({
		id: user._id,
		name: user.name,
		username: user.username,
		email: user.email,
		shortBio: user.shortBio,
		fullBio: user.fullBio,
		cvLink: user.cvLink,
		skills: user.skills,
		active: user.active,
		isAdmin: user.isAdmin,
	}));
	return sendData(users, 200, res);
};

const getUser = async (req, res) => {
	const { username } = req.params;
	if (!username) return sendError('Username must be sent', 400, res);
	let user = await User.findOne({ username_lower: username.toLowerCase() });
	if (!user) return sendError('User Not Found', 404, res);
	user = {
		id: user._id,
		name: user.name,
		username: user.username,
		email: user.email,
		shortBio: user.shortBio,
		fullBio: user.fullBio,
		cvLink: user.cvLink,
		skills: user.skills,
		active: user.active,
		isAdmin: user.isAdmin,
	};
	return sendData(user, 200, res);
};

const enlistUser = async (req, res) => {
	const { userId } = req.params;
	if (!userId) return sendError('userId must be sent', 400, res);
	let user;
	try {
		user = await User.findById(userId);
	} catch (e) {
		console.log(e);
		return sendError('User not found', 404, res);
	}
	user.active = true;
	await user.save();
	sendSuccess('User Enlisted', 202, res);
};

const delistUser = async (req, res) => {
	const { userId } = req.params;
	if (!userId) return sendError('userId must be sent', 400, res);
	let user;
	try {
		user = await User.findById(userId);
	} catch (e) {
		console.log(e);
		return sendError('User not found', 404, res);
	}
	user.active = false;
	await user.save();
	sendSuccess('User Delisted', 202, res);
};

const makeAdmin = async (req, res) => {
	const { userId } = req.params;
	if (!userId) return sendError('userId must be sent', 400, res);
	let user;
	try {
		user = await User.findById(userId);
	} catch (e) {
		console.log(e);
		return sendError('User not found', 404, res);
	}
	user.isAdmin = true;
	await user.save();
	sendSuccess('User has been made an Admin', 202, res);
};

const removeAdmin = async (req, res) => {
	const { userId } = req.params;
	if (!userId) return sendError('userId must be sent', 400, res);
	let user;
	try {
		user = await User.findById(userId);
	} catch (e) {
		console.log(e);
		return sendError('User not found', 404, res);
	}
	user.isAdmin = false;
	await user.save();
	sendSuccess('User is no longer an Admin', 202, res);
};

const getAllFeedback = async (req, res) => {
	let feedback = await Feedback.find({}).populate('user');
	console.log(feedback);
	feedback = feedback.map(sanitizeFeedback);
	return sendData(feedback, 200, res);
};

const getAFeedback = async (req, res) => {
	const { feedbackId } = req.params;
	if (!feedbackId) return sendError('feedbackId must be sent', 400, res);
	let feedback;
	try {
		feedback = await Feedback.findById(feedbackId).populate('user');
	} catch (e) {
		console.log(e);
		return sendError('Feedback not found', 404, res);
	}
	return sendData(sanitizeFeedback(feedback), 200, res);
};

module.exports = {
	getAllKeys,
	getKey,
	createKey,
	editKey,
	deleteKey,
	getAllUsers,
	getUser,
	enlistUser,
	delistUser,
	makeAdmin,
	removeAdmin,
	getAllFeedback,
	getAFeedback,
};
