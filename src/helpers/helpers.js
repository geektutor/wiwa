const formatString = (text) => {
	const lastIndex = text.length - 1;
	if (text[lastIndex] !== '.') return text + '.';
	return text;
};

const sanitizeUser = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
	shortBio: user.shortBio,
	fullBio: user.fullBio,
	cvLink: user.cvLink,
	skills: user.skills,
});

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

module.exports = {
	formatString,
	sanitizeUser,
	sanitizeKey,
	sanitizeFeedback,
};
