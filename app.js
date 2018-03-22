//引入外部依赖
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const use = require('./bootstarp/use');

//全局设置
global.use = use;

//数据库连接
const db = require('./bootstarp/database');

//路由引入
// 主页
var home = require('./routes/home');
// 用户
var user=require("./routes/user");
// 购物
var shopping=require("./routes/shopping");

//实例化对象
var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//设置中间件
//挂载静待文件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//使用路由
app.use('/', home);
app.use('/user', user);
app.use('/shopping', shopping);

// 404处理
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误处理
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
