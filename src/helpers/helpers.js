const formatString = (text) => {
	const lastIndex = text.length - 1;
	if (text[lastIndex] !== '.') return text + '.';
	return text;
};

module.exports = {
	formatString,
};
