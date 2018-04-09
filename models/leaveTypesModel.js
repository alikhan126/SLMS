var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var leaveTypesSchema = new Schema({
	'title' : String
});

module.exports = mongoose.model('leaveTypes', leaveTypesSchema);
