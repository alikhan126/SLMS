var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var yearSchema = new Schema({
	'name' : String
});

module.exports = mongoose.model('year', yearSchema);
