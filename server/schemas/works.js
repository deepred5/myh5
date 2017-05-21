/**
 * works表
 */

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    // 用户名
    username: {
        type: String,
        require: true
    },
    // 标题
    title: {
        type: String,
        require: true,
        default: 'myh5'
    },
    // 创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    // 封面
    thumbnail: {
        type: String,
        default: '/img/cover.jpg'
    },
    // 状态 1:发布 0:草稿
    status: {
        type: Number,
        default: 0
    },
    // 主内容
    mainCode: {
        type: Object,
        default: {
            wholeAttr: {
                bgmusic: ''
            },
            pages: [{
                pageMainAttr: {
                    background: ''
                },
                items: []
            }]
        }
    }
});