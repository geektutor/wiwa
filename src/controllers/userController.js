const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendData, sendError, sendSuccess } = require('./../helpers/responders');
const {
	sanitizeUser,
	sanitizeUserForLogin,
	getUsername,
} = require('./../helpers/helpers');
const User = require('../models/user');
const Key = require('../models/key');
const Feedback = require('./../models/feedback');

const WEEK_IN_MILLISECONDS = 604800000;

const QUESTIONS = {
	0: "What is your mother's maiden name",
	1: 'What is the name of your childhood street',
	2: 'What is the name of your childhood pet',
	3: "What is your maternal grandmother's maiden name?",
	4: 'What is the name of your favorite teacher',
};

const BCRYPT_SALT = 11;

const getUserByUsername = async (req, res) => {
	const { username } = req.params;
	const user = await User.findOne({
		username,
		active: true,
	});
	if (!user) return sendError('User not found', 404, res);
	sendData(sanitizeUser(user), 200, res);
};

const getUsersByName = async (req, res) => {
	const { name } = req.params;
	if (!name) sendError('Name for searching was not provided', 400, res);

	if (name === '*' || name === '.*')
		return sendError('Invalid Name Provided', 400, res);

	try {
		let users = await User.find({
			name: { $regex: name, $options: 'ig' },
			active: true,
		});
		users = users.map(sanitizeUser);
		sendData(users, 200, res);
	} catch (e) {
		console.log(e.message);
	}
};

const getUsers = async (req, res) => {
	let users = await User.find({ active: true });
	users = users.map(sanitizeUser);
	return sendData(users, 200, res);
};

const getUsersBySkill = async (req, res) => {
	const { skill } = req.params;
	if (!skill) sendError('Query Param of skill required', 400, res);

	if (skill === '*' || skill === '.*')
		return sendError('Invalid Skill Provided', 400, res);
	try {
		let users = await User.find({
			skills: { $regex: skill, $options: 'ig' },
			active: true,
		});
		users = users.map(sanitizeUser);
		sendData(users, 200, res);
	} catch (e) {
		console.log(e.message);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user)
		return sendError('Invalid Email & Password Combination', 400, res);

	const isPassCorrect = await bcrypt.compare(password, user.password);

	if (!isPassCorrect)
		return sendError('Invalid Email & Password Combination', 400, res);

	const token = jwt.sign(
		{
			userId: user._id.toString(),
		},
		process.env.TOKEN_SECRET,
		{
			expiresIn: '1hr',
		}
	);

	const refToken = jwt.sign(
		{
			userId: user._id.toString(),
		},
		process.env.REFRESH_TOKEN_SECRET
	);

	sendData(
		{
			user: {
				...sanitizeUserForLogin(user),
				areQuestionsAnswered: user.questions.length > 0,
			},
			token,
			refToken,
		},
		200,
		res
	);
};

const refreshToken = async (req, res) => {
	const refToken = req.get('refresh_token');
	if (!refToken) return sendError('No Refresh Token', 401, res);
	let verifiedRefToken;
	try {
		verifiedRefToken = jwt.verify(
			refToken,
			process.env.REFRESH_TOKEN_SECRET
		);
	} catch (e) {
		console.log(e.message);
		return sendError('Invalid Refresh Token', 401, res);
	}
	if (!verifiedRefToken) return sendError('Invalid Refresh Token', 401, res);

	const user = await User.findById(verifiedRefToken.userId);
	if (!user) return sendError('Invalid Refresh Token', 401, res);

	const token = jwt.sign(
		{
			userId: user._id.toString(),
		},
		process.env.TOKEN_SECRET,
		{
			expiresIn: '1hr',
		}
	);

	const newRefToken = jwt.sign(
		{
			userId: user._id.toString(),
		},
		process.env.REFRESH_TOKEN_SECRET
	);

	sendData(
		{
			user: sanitizeUser(user),
			token,
			refToken: newRefToken,
		},
		200,
		res
	);
};

const signupSecret = async (req, res) => {
	const { accessKey } = req.body;
	if (!accessKey) return sendError('Access Key Required', 400, res);
	if (accessKey === '*' || accessKey === '.*')
		return sendError('Invalid Access Key Provided', 400, res);

	let key;
	try {
		var regex = new RegExp(['^', accessKey, '$'].join(''), 'ig');
		key = await Key.find({
			key: regex,
		});
	} catch (e) {
		return sendError('Invalid Access Key Provided', 400, res);
	}

	const token = jwt.sign(
		{
			userType: 'user',
		},
		process.env.TOKEN_SECRET,
		{
			expiresIn: 60 * 20,
		}
	);
	return sendData({ token }, 200, res);
};

const signupInfo = async (req, res) => {
	const token = req.get('token');
	if (!token) return sendError('No Token Provided', 401, res);
	let verifiedToken;
	try {
		verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (e) {
		console.log(e.message);
		return sendError('Invalid Token', 401, res);
	}

	if (!verifiedToken.userType) return sendError('Invalid Token', 401, res);

	const {
		name,
		email,
		password,
		shortBio,
		fullBio,
		cvLink,
		skills,
	} = req.body;
	if (
		!name ||
		!email ||
		!password ||
		!shortBio ||
		!cvLink ||
		(skills && skills.length == 0)
	)
		return sendError(
			'Ensure you send all necessary info for signup',
			400,
			res
		);

	const username = await getUsername(name);

	const isEmailTaken = await User.findOne({ email });
	if (isEmailTaken) return sendError('This email has been taken', 400, res);

	const salt = await bcrypt.genSalt(BCRYPT_SALT);
	const hash = await bcrypt.hash(password, salt);

	const user = new User({
		name,
		email,
		username,
		password: hash,
		shortBio,
		fullBio,
		cvLink,
		isAdmin: false,
		skills,
	});
	await user.save();
	sendData(sanitizeUser(user), 201, res);
};

const signupQuestions = async (req, res) => {
	const token = req.get('token');
	if (!token) return sendError('No Token Provided', 401, res);
	let verifiedToken;
	try {
		verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (e) {
		console.log(e.message);
		return sendError('Invalid Token', 401, res);
	}

	if (!verifiedToken.userType && !verifiedToken.userId)
		sendError('Invalid Token', 401, res);

	const { userId, question1Id, answer1, question2Id, answer2 } = req.body;
	if (
		question1Id === undefined ||
		!answer1 ||
		question2Id === undefined ||
		!answer2 ||
		!userId
	)
		return sendError(
			'User requires questionIds and answers for signup',
			400,
			res
		);

	if (question1Id === question2Id)
		return sendError('Question Ids must be different', 400, res);

	if (parseInt(question1Id) > 4 || parseInt(question2Id) > 4)
		return sendError('Invalid Question Id', 400, res);

	let user;
	try {
		user = await User.findById(userId);
	} catch (e) {
		console.log(e.message);
		return sendError('User not found', 404, res);
	}

	const questions = [
		{
			questionIndex: parseInt(question1Id),
			answer: answer1,
		},
		{
			questionIndex: parseInt(question2Id),
			answer: answer2,
		},
	];

	user.questions = questions;
	await user.save();
	sendData(sanitizeUser(user), 201, res);
};

const createFeedback = async (req, res) => {
	const { title, message } = req.body;
	if (!title || !message)
		return sendError('Title and/or Message not included', 400, res);

	let feedback = new Feedback({
		title,
		message,
		user: req.user._id,
	});

	try {
		await feedback.save();
	} catch (e) {
		console.log(e.message);
		return sendError('Server Error', 500, res);
	}

	sendSuccess('Feedback Created', 201, res);
};

const editUser = async (req, res) => {
	const { name, password, cvLink, shortBio, fullBio, skills } = req.body;
	const { userId } = req.params;
	if (!req.user.isAdmin && req.user._id != userId)
		return sendError('Invalid Authorization', 403, res);

	if (password && password.length < 6)
		return sendError('Password must be 6 or more characters', 400, res);

	const user = await User.findById(userId);
	if (!user) sendError('User not found', 404, res);

	user.name = name || user.name;

	if (password) {
		const salt = await bcrypt.genSalt(BCRYPT_SALT);
		const hash = await bcrypt.hash(password, salt);
		user.password = hash;
	}
	if (cvLink) {
		const lastCvChange = new Date(user.cvChanged);
		const currentDay = new Date(Date.now());
		const dateDifference = currentDay - lastCvChange;
		if (dateDifference <= WEEK_IN_MILLISECONDS)
			return sendError('Minimum of 1 week between changing CV', 403, res);
		user.cvLink = cvLink;
		user.cvChanged = currentDay;
	}

	user.shortBio = shortBio || user.shortBio;
	user.fullBio = fullBio || user.fullBio;
	user.skills = skills && skills.length == 0 ? skills : user.skills;

	await user.save();
	sendData(sanitizeUser(user), 202, res);
};

const deleteUser = async (req, res) => {
	const { userId } = req.params;
	const user = await User.findByIdAndDelete(userId);
	console.log('Deleted User', user);
	sendSuccess('User deleted', 202, res);
};

const forgotPassword = async (req, res) => {
	const { questionId, answer, email, password } = req.body;
	if (questionId === undefined || !email || !answer || !password)
		return sendError(
			'Ensure questionId, email and answer are being sent',
			400,
			res
		);
	if (questionId > 4) return sendError('Invalid Question Id', 400, res);

	const user = await User.findOne({ email });
	if (!user) return sendError('User not found', 404, res);

	let shouldChangePassword = false;
	user.questions.forEach((questionObj) => {
		if (
			questionObj.questionIndex === parseInt(questionId) &&
			questionObj.answer === answer
		)
			shouldChangePassword = true;
	});

	if (!shouldChangePassword)
		return sendError('Wrong Question / Answer Combination', 400, res);

	const salt = await bcrypt.genSalt(BCRYPT_SALT);
	const hash = await bcrypt.hash(password, salt);

	user.password = hash;
	await user.save();

	sendSuccess('Password Changed', 202, res);
};

module.exports = {
	getUserByUsername,
	getUsersByName,
	getUsersBySkill,
	createFeedback,
	forgotPassword,
	getUsers,
	login,
	signupSecret,
	signupInfo,
	signupQuestions,
	editUser,
	deleteUser,
	refreshToken,
};
