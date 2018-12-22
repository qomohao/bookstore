var express = require('express');
var router = express.Router();
var login = require("../controllers/login");
var register = require("../controllers/register");
var user = require("../controllers/personal/user");
var personal = require("../controllers/personal");
var address = require("../controllers/personal/address");
// 设置图片上传位置
const upload = require('../library/upload');

// 用户 -- 登录、登出、注册、购物车
// 登录页面
router.get('/login', login.index);
// 登录验证
router.post('/login', login.login);
// 注册页面
router.get('/register', register.index);
// 注册
router.post('/register', register.register);
// 获取个人信息
router.get('/index', user.index);
// 保存个人信息修改
router.post('/usersave', upload.single('avatar'), user.save);
// 修改个人密码
router.post('/password', user.password);
// 个人中心 -- 页面渲染
router.get('/personal', personal.index);
// 个人中心 -- 获取收货地址列表
router.get('/address', address.index);
// 个人中心 -- 添加收货地址
router.post('/add', address.add);
// 个人中心 -- 删除收货地址
router.post('/delete', address.delete);
// 个人中心 -- 修改收货地址
router.post('/update', address.update);
// 登录认证
router.post('/login', login.login);
//登出操作
router.get('/logout', login.logout);

module.exports = router;
