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
     * 登录验证
     */
    login: (req, res, next) => {
        //邮箱
        //密码
        //登录验证
        let email = req.body.email;
        let password = req.body.password;
        UserModel.findOne({email: email}).then(doc => {
            let user = doc;
            if (user) {
                if (user.password == md5(password)) {
                    if(req.body.remember==1){
                        res.cookie('user', user._id, {
                            expires:new Date(Date.now()+(1000*60*60*24*7)),
                            httpOnly:true
                        })
                    }
                    // 用户名、密码验证通过  -- 用户数据存入session
                    req.session.user = user;
                    // 设置闪存信息
                    req.flash("success", '登陆成功！');
                    //登录成功后跳转到主页
                    res.redirect('/');
                } else {
                    req.flash("error", '密码错误！');
                    res.redirect('/user/login');
                }
            } else {
                req.flash("error", '用户不存在！');
                res.redirect('/user/login');
            }
        }).catch(err => {
            res.json({
                status: 0,
                msg: '网络异常'
            })
        })
    },
    /**
     * 登出
     */
    logout: (req, res, next) => {
        // 清空session
        req.session.destroy(err => {
            if (err) {
                res.json({
                    status:0,
                    msg:"退出失败"
                });
            } else {
                res.cookie("user","",{
                    expires:new Date(Date.now()),
                    httpOnly:true
                });
            }
        });
    }
};
module.exports = login;