const mongoose = require('mongoose');

const keySchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Key = mongoose.model('Key', keySchema);

module.exports = Key;
