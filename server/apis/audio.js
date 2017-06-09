var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var path = require('path');
var UploadMusic = require('../models/uploadMusic');

router.get('/', function (req, res) {
    res.json({
        code: 0
    });
});

/**
 * 上传音频
 */

router.post('/upload', multipartMiddleware, function (req, res) {
    console.log('/upload');
    console.log(req.files);

    var files = req.files.files;

    var readFrom = fs.createReadStream(files.path);
    var fileName = path.basename(files.path);
    console.log(fileName);
    if (!fs.existsSync('server/upload/uploadmusic')) {
        fs.mkdirSync('server/upload/uploadmusic');
        console.log('创建server/upload/uploadmusic目录成功');
    }
    var saveTo = fs.createWriteStream(path.join('server/upload/uploadmusic', fileName));
    readFrom.pipe(saveTo);

    readFrom.on('end', function () {
        fs.unlinkSync(files.path);
        var myaudio = new UploadMusic({
            username: req.session.user.username,
            originalFilename: files.originalFilename,
            filePath: '/uploadmusic/' + fileName
        });

        myaudio.save().then(function (musicInfo) {
            console.log(musicInfo);
            res.locals.message = '上传音乐成功';
            res.json(res.locals);
        }).catch(function (err) {
            console.log(err);
            res.locals.code = 1;
            res.locals.message = '上传音乐失败'; // 保存数据库失败
            res.json(res.locals);
        });
    });

    readFrom.on('error', function (err) {
        res.json({
            code: 1,
            message: '上传音频失败'
        });
    });

    // don't forget to delete all req.files when done
});


/**
 * 获取用户的上传音乐
 */
router.get('/list', function (req, res) {
    UploadMusic.find({'username': req.session.user.username}).sort({uploadTime: -1})
        .then(function (musics) {
            res.locals.message = '获取音乐列表成功';
            res.locals.musics = musics;
            res.json(res.locals);
        })
        .catch(function (err) {
            console.log(err);
            res.locals.code = 1;
            res.locals.message = '获取音乐列表失败';
            res.json(res.locals);
        });
});

/**
 * 删除音乐
 */

router.post('/delete', function (req, res) {
    var id = req.body.id || '';
    console.log('id', id);

    UploadMusic.findOne({
        _id: id,
        username: req.session.user.username
    }).then(function (music) {
        var filePath = music.filePath;
        filePath = path.join('server/upload', filePath);

        UploadMusic.remove({
            _id: id
        }).then(function (musicInfo) {

            // 删除数据库记录
            res.locals.message = '删除音乐成功';
            res.json(res.locals);

            // 删除本地文件
            fs.unlink(filePath, function (err) {
                if (err) {
                    console.log('err', err);
                    console.log('删除本地音乐失败');
                } else {
                    console.log('删除本地音乐成功');
                }

            });

        }).catch(function (err) {
            console.log(err);
            res.locals.code = 1;
            res.locals.message = '删除音乐失败';
            res.json(res.locals);
        });

    }).catch(function (err) {
        console.log(err);
        res.locals.code = 1;
        res.locals.message = '音乐不存在';
        res.json(res.locals);
    });
});



module.exports = router;