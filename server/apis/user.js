var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


/**
 * 用户注册
 */
router.post('/signup', function (req, res) {
    var {password, repeatPwd, username, captcha} = req.body;
    if (!username) {
        res.locals.code = 1;
        res.locals.message = '用户名不能为空';
        res.json(res.locals);
        return;
    }
    if (!password) {
        res.locals.code = 1;
        res.locals.message = '密码不能为空';
        res.json(res.locals);
        return;
    }
    if (password !== repeatPwd) {
        res.locals.code = 1;
        res.locals.message = '两次密码输入不同';
        res.json(res.locals);
        return;
    }

    req.session.captcha = req.session.captcha || '';
    //console.log('user api 验证码: ', req.session.captcha);
    //console.log('user api 用户输入验证码: ', captcha);

    if (captcha.toUpperCase() !== req.session.captcha.toUpperCase()) {
        res.locals.code = 1;
        res.locals.message = '验证码错误';
        res.json(res.locals);
        return;
    }

    User.findOne({
        username: username
    }).then(function (userinfo) {
        if (userinfo) {
            res.locals.code = 1;
            res.locals.message = '用户名已被注册';
            res.json(res.locals);
            return Promise.reject();
        } else {
            var user = new User({
                username: username,
                password: bcrypt.hashSync(password, salt)
            });
            return user.save();
        }
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
        res.locals.message = '注册成功';
        res.json(res.locals);
    })

});


/**
 * 用户登录
 */

router.post('/login', function (req, res) {

    var {username, password, remember, freePassword} = req.body;

    if (!username) {
        res.locals.code = 1;
        res.locals.message = '用户名不能为空';
        res.json(res.locals);
        return;
    }
    if (!password) {
        res.locals.code = 1;
        res.locals.message = '密码不能为空';
        res.json(res.locals);
        return;
    }

    User.findOne({
        username: username
    }).then(function (userinfo) {
        if (!userinfo) {
            res.locals.code = 1;
            res.locals.message = '用户名不存在';
            res.json(res.locals);
            return;
        }

        if (!bcrypt.compareSync(password, userinfo.password)) {
            res.locals.code = 1;
            res.locals.message = '密码错误';
            res.json(res.locals);
            return;
        }

        if (freePassword) {
            // 一周免登陆，则设置session id有效期为7天
            // session id保存在cookie,也就是设置cookie有效期为7天
            req.session.cookie.maxAge = 24 * 60 * 60 * 1000 * 7;
        }
        req.session.user = userinfo;
        res.locals.message = '登陆成功';
        res.json(res.locals);
    })
});

/**
 * 修改密码
 */
router.post('/change', function (req, res) {

    var {password, newPwd} = req.body;

    if (!password) {
        res.locals.code = 1;
        res.locals.message = '原密码不能为空';
        res.json(res.locals);
        return;
    }

    if (!newPwd) {
        res.locals.code = 1;
        res.locals.message = '新密码不能为空';
        res.json(res.locals);
        return;
    }


    User.findOne({
        username: req.session.user.username || ''
    }).then(function (userinfo) {
        if (!userinfo) {
            res.locals.code = 1;
            res.locals.message = '未登陆';
            res.json(res.locals);
            return;
        }

        if (!bcrypt.compareSync(password, userinfo.password)) {
            res.locals.code = 1;
            res.locals.message = '原密码错误';
            res.json(res.locals);
            return;
        }

        return User.update({
            username: req.session.user.username
        }, {
            password: bcrypt.hashSync(newPwd, salt)
        });


    }).then(function (modifyUser) {
        res.locals.message = '修改密码成功';
        res.json(res.locals);
    });
});


/**
 * 验证是否登陆
 */

router.post('/auth', function (req, res) {
    if (req.session.user) {
        res.locals.message = '已经登陆';
    } else {
        res.locals.code = 1;
        res.locals.message = '没有登陆';
    }
    res.json(res.locals);

});


/**
 * 退出登陆
 */

router.post('/logout', function (req, res) {
    // 删除session
    delete req.session.user;
    // 设置session id保存时间为0
    // 则关闭浏览器后session id自动销毁
    req.session.cookie.maxAge = 0;
    res.locals.message = '退出成功';
    res.json(res.locals);
});


module.exports = router;

