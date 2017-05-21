/**
 * 获取验证码
 */

var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
svgCaptcha.options.height = 36;
svgCaptcha.options.width = 120;

router.get('/', function (req, res) {
    var captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    //console.log('captcha api: ', req.session.captcha);
    res.set('Content-Type', 'image/svg+xml');
    res.status(200).send(captcha.data);
});

module.exports = router;