//引入外部依赖
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const use = require('./bootstarp/use');

//全局设置
global.use = use;

//数据库连接
const db = require('./bootstarp/database');

//路由引入
// 主页
var home = require('./routes/home');
// 用户
var user = require("./routes/user");
// 购物
var shopping = require("./routes/shopping");
var book = require("./routes/book");

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
app.use(session({
    secret: 'keyboard cat', //一个String类型的字符串，作为服务器端生成session的签名
    resave: true, //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
    saveUninitialized: true //初始化session时是否保存到存储
}))
app.use(flash());

//使用路由
app.use('/', home);
app.use('/user', user);
app.use('/shopping', shopping);
app.use('/book', book);

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
