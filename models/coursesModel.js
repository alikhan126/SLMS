var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var coursesSchema = new Schema({
	'name' : String
});

module.exports = mongoose.model('courses', coursesSchema);
