const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		cvLink: {
			type: String,
			required: true,
		},
		shortBio: {
			type: String,
			required: true,
		},
		fullBio: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		questions: [
			{
				questionIndex: {
					type: Number,
				},
				answer: {
					type: String,
				},
			},
		],
		skills: [{ type: String }],
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
