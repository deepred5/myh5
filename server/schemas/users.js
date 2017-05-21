/**
 * users表
 */

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    // 用户名
    username: {
        type: String,
        require: true
    },
    // 密码
    password: {
        type: String,
        require: true
    },
    // 注册时间
    signupTime: {
        type: Date,
        default: Date.now
    }
});