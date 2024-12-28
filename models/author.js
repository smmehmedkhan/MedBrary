// Default dependencies
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		requied: true,
	},
});

module.exports = mongoose.model('Author', authorSchema);
