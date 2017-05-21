var mongoose = require('mongoose');
var uploadPicsSchema = require('../schemas/uploadPics');

module.exports = mongoose.model('UploadPic', uploadPicsSchema);