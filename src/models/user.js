const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		username_lower: {
			type: String,
			required: true,
		},
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
		cvChanged: {
			type: Date,
			default: new Date(Date.now()),
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
		active: {
			type: Boolean,
			default: true,
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
