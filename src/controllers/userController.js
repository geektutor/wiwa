const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const responders = require('./../helpers/responders');
const User = require('../models/user');
const Question = require('../models/question');

const { sendData, sendError, sendSuccess } = responders;

const QUESTIONS = {
	0: "What is your mother's maiden name",
	1: 'What is the name of your childhood street',
	2: 'What is the name of your childhood pet',
	3: "What is your maternal grandmother's maiden name?",
	4: 'What is the name of your favorite teacher',
};

const BCRYPT_SALT = 11;

const sanitizeUser = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
	shortBio: user.shortBio,
	fullBio: user.fullBio,
	cvLink: user.cvLink,
	skills: user.skills,
});

const getUserById = async (req, res) => {
	const { userId } = req.params;
	const user = await User.findById(userId);
	if (!user) sendError('User not found', 404, res);
	sendData(sanitizeUser(user), 200, res);
};

const getUsersByName = async (req, res) => {
	console.log('name');
	const { name } = req.params;
	if (!name) sendError('Name for searching was not provided', 400, res);

	try {
		let users = await User.find({ name: { $regex: name, $options: 'ig' } });
		console.log(users);
		users = users.map(sanitizeUser);
		sendData(users, 200, res);
	} catch (e) {
		console.log(e);
	}
};

const getUsers = async (req, res) => {
	let users = await User.find({});
	users = users.map(sanitizeUser);
	return sendData(users, 200, res);
};

const getUsersBySkill = async (req, res) => {
	const { skill } = req.params;
	if (!skill) sendError('Query Param of skill required', 400, res);
	try {
		let users = await User.find({
			skills: { $regex: skill, $options: 'ig' },
		});
		users = users.map(sanitizeUser);
		sendData(users, 200, res);
	} catch (e) {
		console.log(e);
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
			user: sanitizeUser(user),
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

	const verifiedRefToken = jwt.verify(
		refToken,
		process.env.REFRESH_TOKEN_SECRET
	);
	if (!verifiedRefToken) return sendError('Invalid Refresh Token', 401, res);

	const user = await User.findById(verifiedRefToken.userId);
	if (!user) return sendError('Invalid Refresh Token', 401, res);

	console.log(user);

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

	if (accessKey && accessKey === process.env.USER_ACCESS_KEY) {
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
	} else if (accessKey && accessKey === process.env.ADMIN_ACCESS_KEY) {
		const token = jwt.sign(
			{
				userType: 'admin',
			},
			process.env.TOKEN_SECRET,
			{
				expiresIn: 60 * 20,
			}
		);
		return sendData({ token }, 200, res);
	}

	sendError('Incorrect Access Key', 400, res);
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

	const isAdmin = verifiedToken.userType === 'admin';

	const { name, email, password, shortBio, fullBio, cvLink } = req.body;
	if (!name || !email || !password || !shortBio || !cvLink)
		return sendError(
			'Ensure you send all necessary info for signup',
			400,
			res
		);

	const userExists = await User.findOne({ email });
	if (userExists) return sendError('This email has been taken', 400, res);

	const salt = await bcrypt.genSalt(BCRYPT_SALT);
	const hash = await bcrypt.hash(password, salt);

	const user = new User({
		name,
		email,
		password: hash,
		shortBio,
		fullBio,
		cvLink,
		isAdmin,
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

	if (!verifiedToken.userType) sendError('Invalid Token', 401, res);

	const { userId, question1Id, answer1, question2Id, answer2 } = req.body;
	if (!question1Id || !answer1 || !question2Id || !answer2 || !userId)
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

const editUser = async (req, res) => {
	const { name, email, password, cvLink, bio, skills } = req.body;
	const { userId } = req.params;
	if (!req.user.isAdmin && req.user._id != userId)
		return sendError('Invalid Authorization', 403, res);

	if (password && password.length < 6)
		return sendError('Password must be 6 or more characters', 400, res);

	const user = await User.findById(userId);
	if (!user) sendError('User not found', 404, res);

	user.name = name || user.name;
	user.email = email || user.email;

	if (password) {
		const salt = await bcrypt.genSalt(BCRYPT_SALT);
		const hash = await bcrypt.hash(password, salt);
		user.password = hash;
	}

	user.cvLink = cvLink || user.cvLink;
	user.bio = bio || user.bio;
	user.skills = skills && skills.length > 0 ? skills : user.skills;

	await user.save();
	console.log(user);
	sendData(sanitizeUser(user), 202, res);
};

const deleteUser = async (req, res) => {
	const { userId } = req.params;
	const user = await User.findByIdAndDelete(userId);
	console.log('Deleted User', user);
	sendSuccess('User deleted', 202, res);
};

const changePassword = async (req, res) => {
	const { questionId, answer, email, password } = req.body;

	if (!questionId || !email || !answer || !password)
		return sendError(
			'Ensure questionId, email and answer are being sent',
			400,
			res
		);
	if (questionId > 4) return sendError('Invalid Question Id', 400, res);

	const user = await User.find({ email });
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
	getUserById,
	getUsersByName,
	getUsersBySkill,
	changePassword,
	getUsers,
	login,
	signupSecret,
	signupInfo,
	signupQuestions,
	editUser,
	deleteUser,
	refreshToken,
};
