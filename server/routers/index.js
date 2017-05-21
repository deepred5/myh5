var testData = require('../docs/data');

var Work = require('../models/work');

module.exports = function (app) {

    /**
     * 统一返回格式
     * code: 0成功 1失败
     * message: 提示信息
     */
    app.use(function (req, res, next) {
        res.locals.code = 0;
        res.locals.message = '';
        next();
    });

    // 验证登陆
    function handleAuth(req, res, next) {
        if (!req.session.user) {
            res.json({code: 1, message: '未登录'});
            return
        }
        next();
    }

    app.get('/', function (req, res) {
        console.log(req.session.captcha);
        res.send('hello tc');
    });

    app.get('/show/:id', function (req, res) {
        var id = req.params.id;
        Work.findOne({
            _id: id
        }).then(function (work) {
            console.log('mywork');
            console.log(work);
            if (work.status === 0 && !req.session.user) {
                // 未发布的作品需要登陆才能查看
                res.redirect('/');
            }
            work.mainCode.pages.forEach(function (page) {
                var html = '';
                page.items.forEach(function (item) {
                    if (item.type === 'pic') {
                        html += `<div style="position:${item.style.position};left:${item.style.left + '%'};top:${item.style.top + '%'};width:${item.style.width + 'px'};height:${item.style.height + 'px'};opacity:${item.style.opacity}" class="content">
                                    <img src="${item.src}" class="ani" width="100%" height="100%" swiper-animate-effect="${item.animate.effect}" swiper-animate-duration="${item.animate.duration + 's'}" swiper-animate-delay="${item.animate.delay + 's'}" style="animation-iteration-count:${item.animate.count};">
                                </div>`;
                    } else if (item.type === 'txt') {
                        html += `<div style="position:absolute;left:${item.style.left + '%'};top:${item.style.top + '%'};font-size:${item.style.fontSize + 'px'};min-width: 100px;color:${item.style.color};opacity:${item.style.opacity}" class="content">
                                    <div class="ani" swiper-animate-effect="${item.animate.effect}"  swiper-animate-duration="${item.animate.duration + 's'}" swiper-animate-delay="${item.animate.delay + 's'}" style="animation-iteration-count:${item.animate.count};">${item.content}</div>
                                </div>`;
                    }
                });
                page.pageContent = html;
            });
            var renderData = {};
            renderData.title = work.title;
            renderData.pages = work.mainCode.pages.slice();
            renderData.bgmusic = work.mainCode.wholeAttr.bgmusic;
            res.render('index', renderData);
        }).catch(function (err) {
            console.log(err);
            res.locals.code = 1;
            res.locals.message = '出错';
            res.json(res.locals);
        });
    });

    app.use('/apis/captcha', require('../apis/captcha'));
    app.use('/apis/user', require('../apis/user'));
    app.use('/apis/work', handleAuth, require('../apis/work'));
    app.use('/apis/list', handleAuth, require('../apis/list'));
    app.use('/apis/img', handleAuth, require('../apis/img'));
    app.use('/apis/audio', handleAuth, require('../apis/audio'));
    //app.use('/apis/demo', handleAuth, require('../apis/demo'));

};