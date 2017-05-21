var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var path = require('path');
var UploadPic = require('../models/uploadPic');

router.get('/', function (req, res) {
    res.json({
        code: 0
    });
});

/**
 * 上传图片
 */

router.post('/upload', multipartMiddleware, function (req, res) {
    console.log('/upload');

    var files = req.files.files;

    console.log(files);

    var readFrom = fs.createReadStream(files.path);
    var fileName = path.basename(files.path);
    console.log(fileName);
    var saveTo = fs.createWriteStream(path.join('server/upload/uploadpic', fileName));
    readFrom.pipe(saveTo);

    readFrom.on('end', function () {
        fs.unlinkSync(files.path);

        var mypic = new UploadPic({
            username: req.session.user.username,
            originalFilename: files.originalFilename,
            filePath: '/uploadpic/' + fileName
        });

        mypic.save().then(function (picInfo) {
            console.log(picInfo);
            res.locals.message = '上传图片成功';
            res.locals.filePath = picInfo.filePath;
            res.json(res.locals);
        }).catch(function (err) {
            console.log(err);
            res.locals.code = 1;
            res.locals.message = '上传图片失败'; // 保存数据库失败
            res.json(res.locals);
        });
    });

    readFrom.on('error', function (err) {
        res.json({
            code: 1,
            message: '上传图片失败' // 本地上传失败
        });
    });

    // don't forget to delete all req.files when done
});


/**
 * 获取用户的上传图片
 */
router.get('/list', function (req, res) {
    UploadPic.find({'username': req.session.user.username}).sort({uploadTime: -1})
        .then(function (pics) {
            res.locals.message = '获取图片列表成功';
            res.locals.pics = pics;
            res.json(res.locals);
        })
        .catch(function (err) {
            console.log(err);
            res.locals.code = 1;
            res.locals.message = '获取图片列表失败';
            res.json(res.locals);
        });
});

/**
 * 删除图片
 */

router.post('/delete', function (req, res) {
    var id = req.body.id || '';
    console.log('id', id);

    UploadPic.findOne({
        _id: id,
        username: req.session.user.username
    }).then(function (pic) {
        var filePath = pic.filePath;
        filePath = path.join('server/upload', filePath);

        UploadPic.remove({
            _id: id
        }).then(function (picInfo) {

            // 删除数据库记录
            res.locals.message = '删除图片成功';
            res.json(res.locals);

            // 删除本地文件
            fs.unlink(filePath, function (err) {
                if (err) {
                    console.log('err', err);
                    console.log('删除本地图片失败');
                } else {
                    console.log('删除本地图片成功');
                }

            });

        }).catch(function (err) {
            console.log(err);
            res.locals.code = 1;
            res.locals.message = '删除图片失败';
            res.json(res.locals);
        });

    }).catch(function (err) {
        res.locals.code = 1;
        res.locals.message = '图片不存在';
        res.json(res.locals);
    });
});

module.exports = router;