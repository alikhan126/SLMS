var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Schema   = mongoose.Schema;


var profileSchema = new Schema({
	'name' : String,
	'description' : String,
	'status' : String,
});

profileSchema.plugin(timestamps);
module.exports = mongoose.model('profile', profileSchema);
