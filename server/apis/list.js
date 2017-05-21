var express = require('express');
var router = express.Router();
var Work = require('../models/work');

/**
 * 获取用户作品列表
 */

router.get('/', function (req, res) {
    Work.find({'username': req.session.user.username}).sort({createTime: -1})
        .then(function (works) {
            console.log(works);
            res.locals.message = '获取作品列表成功';
            res.locals.works = works;
            res.json(res.locals);
        })
        .catch(function (err) {
            console.log(err);
            res.locals.code = 1;
            res.locals.message = '获取作品列表失败';
            res.json(res.locals);
        });
});


module.exports = router;