var express = require('express');
var router = express.Router();
var login=require("../controllers/login");
var register=require("../controllers/register");
var personal=require("../controllers/personal")

// 用户 -- 登录、登出、注册、购物车
// 登录
router.get('/login',login.index);
// 注册
router.get('/register',register.index);
// 个人中心
router.get('/personal', personal.index);
// 登录认证
router.post('/login', login.login);

module.exports = router;
