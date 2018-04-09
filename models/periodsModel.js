var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var periodsSchema = new Schema({
	'start' : Date,
	'end' : Date,
	'title' : String
});

module.exports = mongoose.model('periods', periodsSchema);
