const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		user: {
			ref: 'User',
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{ timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
