var express = require('express');
var router = express.Router();
var Work = require('../models/work');

/**
 * 创建作品
 */


router.post('/create', function (req, res) {
    var title = req.body.title || '';
    var work = new Work({
        title: title,
        username: req.session.user.username
    });
    work.save().then(function (workInfo) {
        console.log(workInfo);
        res.locals.message = '创建成功';
        res.locals.id = workInfo._id;
        res.json(res.locals);
    }).catch(function (err) {
        console.log(err);
        res.locals.code = 1;
        res.locals.message = '创建失败';
        res.json(res.locals);
    });
});

/**
 * 删除作品
 */

router.post('/delete', function (req, res) {
    var id = req.body.id || '';
    Work.remove({
        _id: id,
        username: req.session.user.username
    }).then(function (work) {
        res.locals.message = '删除成功';
        res.json(res.locals);
    }).catch(function (err) {
        console.log(err);
        res.locals.code = 1;
        res.locals.message = '删除失败';
        res.json(res.locals);
    })
});

/**
 * 修改保存作品
 */

router.post('/save', function (req, res) {
    var id = req.body.id || '';
    var mainCode = req.body.mainCode;
    var title = req.body.title;
    var thumbnail = req.body.thumbnail;
    console.log('id: ', id);
    console.log('mainCode: ', mainCode);

    Work.update({
        _id: id,
        username: req.session.user.username,
    }, {
        mainCode: mainCode,
        title: title,
        thumbnail: thumbnail
    }).then(function (result) {
        console.log(result);
        res.locals.message = '保存成功';
        res.json(res.locals);
    }).catch(function (err) {
        console.log(err);
        res.locals.code = 1;
        res.locals.message = '保存失败';
        res.json(res.locals);
    });
});

/**
 * 查询作品
 */

router.get('/info', function (req, res) {
    var id = req.query.id;
    Work.findOne({
        _id: id
    }).then(function (work) {
        console.log(work);
        res.locals.message = '获取作品信息成功';
        res.locals.work = work;
        res.json(res.locals);
    })
});

/**
 * 发布作品
 */

router.post('/release', function (req, res) {
    var id = req.body.id || '';
    Work.update({
        _id: id
    }, {
        status: 1
    }).then(function (result) {
        console.log('result', result);
        res.locals.message = '发布成功';
        res.json(res.locals);
    }).catch(function (err) {
        console.log(err);
        res.locals.code = 1;
        res.locals.message = '发布失败';
        res.json(res.locals);
    });
});

module.exports = router;