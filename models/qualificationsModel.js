var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var qualificationsSchema = new Schema({
	'Title' : String
});

module.exports = mongoose.model('qualifications', qualificationsSchema);
