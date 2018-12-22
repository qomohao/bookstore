const UserModel = require("../../models/user");
const md5 = require("md5");
/**
 * 用户
 */

const user = {

    /**
     * 用户信息
     */
    index: (req, res, next) => {
        UserModel.findOne({_id: req.session.user._id}).then(doc => {
            req.session.user = doc;
            res.locals.user = req.session.user;
            res.json({
                user: doc
            })
        });
    },

    /**
     * 保存信息
     */
    save: (req, res, next) => {
        //用户ID
        //昵称
        //性别
        //头像
        //联系方式
        var user = req.session.user;
        UserModel.update({_id: user._id}, {
            email: req.body.email,
            nickname: req.body.nickname,
            phone: req.body.phone,
            sex: req.body.sex,
            info: req.body.info,
        }).then(doc => {
            res.json({
                status: 1,
                msg: "修改成功！"
            })
        }).catch(err => {
            res.json({
                status: 0,
                msg: "修改失败！"
            })
        })
    },

    /**
     * 修改密码
     */
    password: (req, res, next) => {
        //用户ID
        //旧密码
        //新密码
        //确认密码
        //用户ID
        //昵称
        //性别
        //头像
        //联系方式
        var user=req.session.user;
        var password = user.password;
        var oldpassword = req.body.oldpassword;
        var newpassword = req.body.newpassword;
        var repassword = req.body.repassword;
        if (md5(oldpassword) != password) {
            res.json({
                status: 0,
                msg: "原密码错误！"
            })
        } else {
            if (newpassword != repassword) {
                res.json({
                    status: 0,
                    msg: "两次密码不一致！"
                })
            } else {
                UserModel.update({_id: user._id}, {
                    password: md5(newpassword)
                }).then(doc => {
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
                            res.json({
                                status:1,
                                msg:"修改密码成功！"
                            });
                        }
                    });
                }).catch(err => {
                    res.json({
                        status: 0,
                        msg: "密码修改失败！"
                    })
                })
            }
        }
    }
};
module.exports = user;