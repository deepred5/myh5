/**
 * uploadMusics表
 * 上传音乐
 */

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    // 用户名
    username: {
        type: String,
        require: true
    },
    // 音乐原始名称
    originalFilename: {
        type: String,
        require: true
    },
    // 上传时间
    uploadTime: {
        type: Date,
        default: Date.now
    },
    // 保存路径
    filePath: {
        type: String,
        require: true
    }
});