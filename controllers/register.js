const UserModel = require('../models/user');
const md5 = require("md5");
/**
 * 注册
 */
const register = {
    /**
     * 注册页面
     */
    index: (req, res, next) => {
        res.render('register', {
            title: "注册页"
        });
    },
    /**
     * 注册操作
     */
    register: (req, res, next) => {
        //邮箱
        //昵称
        //密码
        //确认密码
        //注册操作
        //登录操作
        let email = req.body.email;
        let nickname = req.body.nickname;
        let password = req.body.password;
        let repassword = req.body.repassword;

        UserModel.findOne({email: email}).then(doc => {
            let user = doc;
            if (user) {
                // 设置闪存信息
                req.flash("error", '该邮箱已被注册！');
                //登录成功后跳转到主页
                res.redirect('/user/register');
            } else {
                if (password == repassword) {
                    UserModel.create({
                        email: email,
                        nickname: nickname,
                        password: md5(password)
                    }).then(doc => {
                        req.session.user = doc;
                        // 设置闪存信息
                        req.flash("success", '注册成功,请登录！');
                        // 注册成功后跳转到主页
                        res.redirect('/');
                    }).catch(err => {
                        req.flash('error', '注册失败');
                        res.redirect('/user/register');
                    });
                }
                else {
                    req.flash("error", '两次密码不一致！');
                    res.redirect('/user/register');
                }
            }
        })
    },
}
module.exports = register;