const UserModel = require('../models/user')
/**
 * 注册
 */
const register = {
    /**
     * 注册页面
     */
    index: (req, res, next) => {
        res.render('register', {});
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
        let password_confirmation = req.body.password_confirmation;
        UserModel.find({email: email}).then(doc => {
            if (doc) {
                res.json({
                    status: 0,
                    msg: '邮箱已被使用'
                });
            } else {
                if (password == password_confirmation) {
                    let usermodel = new UserModel({
                        email: email,
                        nickname: nickname,
                        password: password
                    });
                    usermodel.save().then(doc => {
                        res.session.user = doc;
                    });
                    res.json({
                        status: 1,
                        msg: '注册成功'
                    });
                }
                else {
                    res.json({
                        status: 0,
                        msg: '两次密码不一致'
                    });
                }
            }
        }).catch(err => {
            res.json({
                status: 0,
                msg: '网络异常'
            })
        });
    },
}
module.exports = register;