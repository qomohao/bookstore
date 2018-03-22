const UserModel = require('../models/user');
const md5 = require("md5");
/**
 * 登录
 */
const login = {
    /**
     * 登录页面
     */
    index: (req, res, next) => {
        res.render("login",
            {
                title: "登录",
            });
    },
    /**
     * 登录
     */
    login: (req, res, next) => {
        //邮箱
        //密码
        //登录验证
        let email = req.body.email;
        let password = req.body.password;
        UserModel.findOne({email: email}).then(doc => {
            if (doc) {
                let user = doc;
                if (user.password == md5(password)) {
                    res.session.user = user;
                    res.redirect('/');
                } else {
                    res.json({
                        status: 0,
                        msg: '密码错误'
                    })
                }
            } else {
                res.json({
                    status: 0,
                    msg: '用户不存在'
                })
            }
        }).catch(err => {
            res.json({
                status: 0,
                msg: '网络异常'
            })
        });
    },
    /**
     * 登出
     */
    logout: (req, res, next) => {
        req.session.destroy(err => {
            if (err) {
                res.json({
                    status: 0,
                    msg: '退出失败！'
                });
            } else {
                res.json({
                    status: 1,
                    msg: '退出成功！'
                });
            }
        });
    }
}
module.exports = login;