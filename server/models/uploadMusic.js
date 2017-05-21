var mongoose = require('mongoose');
var uploadMusicSchema = require('../schemas/uploadMusics');

module.exports = mongoose.model('uploadMusic', uploadMusicSchema);