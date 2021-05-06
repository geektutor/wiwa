const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const responders = require('./../helpers/responders');
const User = require('../models/user');
const Question = require('../models/question');

const { sendData, sendError, sendSuccess } = responders;

const BCRYPT_SALT = 11;

const sanitizeUser = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
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

const signup = async (req, res) => {
	const {
		name,
		email,
		password,
		questionId,
		answer,
		accessKey,
		adminKey,
	} = req.body;
	if (!name || !email || !password)
		return sendError(
			'User requires a name, email, and password for signup',
			400,
			res
		);
	if (!(questionId && answer) && !accessKey)
		return sendError(
			'User requires question & answer, or Access Key',
			400,
			res
		);

	if (!accessKey) {
		const question = Question.findById(questionId);
		if (!question) return sendError('Question Not Found', 404, res);

		if (question.answer !== answer)
			return sendError('Incorrect Answer', 400, res);
	} else {
		if (accessKey !== process.env.USER_ACCESS_KEY)
			return sendError('Incorrect Access Key', 400, res);
	}

	const salt = await bcrypt.genSalt(BCRYPT_SALT);
	const hash = await bcrypt.hash(password, salt);

	const isAdmin = adminKey === process.env.ADMIN_ACCESS_KEY;

	const user = new User({
		name,
		email,
		password: hash,
		isAdmin,
	});
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

const forgotPassword = async (req, res) => {
	//SEND MAIL TO USER EMAIL
};

const changePassword = async (req, res) => {
	// const { password } = req.body;
	// if (!password) return sendError('You have to send a password', 400, res);
	// const isPassSame = await bcrypt.compare(password, req.user.password);
	// if (isPassSame) return sendError("You can't use this password", 400, res);
	// const salt = await bcrypt.genSalt(BCRYPT_SALT);
	// const hash = await bcrypt.hash(password, salt);
	// req.user.password = hash;
	// await req.user.save();
};

module.exports = {
	getUserById,
	getUsersByName,
	getUsersBySkill,
	changePassword,
	forgotPassword,
	getUsers,
	login,
	signup,
	editUser,
	deleteUser,
	refreshToken,
};
