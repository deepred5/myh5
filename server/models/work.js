var mongoose = require('mongoose');
var worksSchema = require('../schemas/works');

module.exports = mongoose.model('Work', worksSchema);