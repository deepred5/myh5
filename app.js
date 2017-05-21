var express = require('express');
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var log4js = require('log4js');
var mongoose = require('mongoose');
var dbConfig = require('./server/db/config');
// var multipart = require('connect-multiparty');


var app = express();
var port = 9099;

log4js.configure(require('./config'));
var logger = log4js.getLogger();

// app.use(multipart({uploadDir: './temp'}));

app.engine('html', ejs.renderFile);
app.set("view engine", "html");
app.set('views', path.join(__dirname, 'server/views'));

app.use(express.static(path.join(__dirname, 'server/public')));
app.use(express.static(path.join(__dirname, 'server/upload')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'deepred5',
    resave: false,
    saveUninitialized: true
}));

/*app.use(function(req, res, next) {
 logger.info('Incoming request ', req.path);
 next();
 });*/


require('./server/routers')(app);

mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, function (err) {
    if (err) {
        console.log('连接数据库失败');
    } else {
        console.log('连接数据库成功', `${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
        app.listen(port);
        if (process.env.NODE_ENV === 'development') {
            console.log('development mode')
        }
        console.log(`Listening at http://localhost:${port}`);
    }

});



