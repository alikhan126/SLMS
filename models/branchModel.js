var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Schema   = mongoose.Schema;

var branchSchema = new Schema({
	'name' : String,
	'address' : String,
	'contactPerson' : String,
	'contactNumber' : String,
	'email' : String
});

branchSchema.plugin(timestamps);
module.exports = mongoose.model('branch', branchSchema);
