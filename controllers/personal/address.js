const UserModel = require("../../models/user");
/**
 * 地址管理
 */
const address = {
    /**
     * 地址列表
     */
    index: (req, res, next) => {
        let user = req.session.user;
        UserModel.findOne({_id: user._id}).then(doc => {
            res.json({
                status: 1,
                msg: "获取成功！",
                result: doc
            })
        }).catch(err => {
            res.json({
                status: 0,
                msg: "获取失败！"
            })
        })
    },
    // 添加地址
    add: (req, res, next) => {
        var user = req.session.user;
        UserModel.update({_id: user._id}, {
            $push: {
                address: {
                    name: req.body.name,
                    phone: req.body.phone,
                    address: req.body.address,
                }
            }
        }).then(doc => {
            res.json({
                status: 1,
                msg: "添加地址成功！",
            })
        }).catch(err => {
            res.json({
                status: 0,
                msg: "添加地址失败！"
            })
        })
    },
    // 更新地址
    update: (req, res, next) => {
        var address_id = req.query.address_id;
        var user = req.session.user;
        UserModel.update(
            {
                _id: user._id,
                'address._id': address_id
            },
            {
                $set: {
                    'address.$': [{
                        name: req.body.name,
                        phone: req.body.phone,
                        address: req.body.address,
                    }]
                }
            }).then(doc => {
            res.json({
                status: 1,
                msg: "更新地址成功！"
            })
        }).catch(err => {
            res.json({
                status: 0,
                msg: "更新地址失败！"
            })
        })
    },
    /**
     * 删除地址
     */
    delete: (req, res, next) => {
        var address_id = req.query.address_id;
        var user = req.session.user;
        UserModel.update({_id: user._id}, {
            $pull: {
                address: {
                    _id: address_id
                }
            }
        }).then(doc => {
            res.json({
                status: 1,
                msg: "删除地址成功！"
            })
        }).catch(err => {
            res.json({
                status: 0,
                msg: "删除地址失败！"
            })
        })

    }
};
module.exports = address;

