var mongoose = require('mongoose');

var UsersSchema = mongoose.Schema({
	secret_phrase: String
});

mongoose.model('Secrets', UsersSchema);