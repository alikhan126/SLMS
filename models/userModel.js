var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'firstName' : String,
	'lastName' : String,
	'email' : { type : String, unique : true },
	'contactNumber' : { type : String, unique : true },
	'photo' : String,
	'address' : String,
	'dateOfBirth' : Date,
	'placeOfBirth' : String,
	'branch' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'branch'
	},
	'profile' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'profile'
	},
	'password' : { type: String , select : false}
});

userSchema.plugin(timestamps)

module.exports = mongoose.model('user', userSchema);
