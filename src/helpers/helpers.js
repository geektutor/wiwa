const { sendError } = require('./responders');
const User = require('./../models/user');

const formatString = (text) => {
	const lastIndex = text.length - 1;
	if (text[lastIndex] !== '.') return text + '.';
	return text;
};

const isCharacterALetter = (char) => /[a-zA-Z]/.test(char);

const sanitizeUser = (user) => ({
	id: user._id,
	username: user.username,
	name: user.name,
	email: user.email,
	shortBio: user.shortBio,
	fullBio: user.fullBio,
	cvLink: user.cvLink,
	skills: user.skills,
});

const sanitizeUserForLogin = (user) => ({
	id: user._id,
	isAdmin: user.isAdmin,
	username: user.username,
	name: user.name,
	email: user.email,
	shortBio: user.shortBio,
	fullBio: user.fullBio,
	cvLink: user.cvLink,
	skills: user.skills,
});

const getUsername = async (name) => {
	let username = name.replace(/ /g, '').toLowerCase();

	let isUsernameTaken = true;
	let count = 0;

	while (isUsernameTaken) {
		isUsernameTaken = await User.findOne({
			username,
		});

		if (isUsernameTaken) {
			let lastChar = username[username.length - 1];

			if (isCharacterALetter(lastChar)) {
				username = username + `${count}`;
			} else {
				//remove the number if it was there before
				const usernameArr = username.split('');
				usernameArr.pop();
				username = usernameArr.join('');

				const prevNumber = parseInt(lastChar);
				username = username + `${prevNumber + 1}`;
				console.log(username, usernameArr);
			}
		}
		count++;
	}
	return username;
};

const sanitizeKey = (key) => ({
	id: key._id,
	key: key.key,
});

const sanitizeFeedback = (feedback) => ({
	id: feedback._id,
	title: feedback.title,
	message: feedback.message,
	user: feedback.user.email,
});

const jsonParserErrorHandler = (err, req, res, next) => {
	console.log(err);
	sendError('Invalid JSON Sent', 400, res);
};

module.exports = {
	formatString,
	sanitizeUser,
	sanitizeKey,
	sanitizeFeedback,
	sanitizeUserForLogin,
	getUsername,
	jsonParserErrorHandler,
};
