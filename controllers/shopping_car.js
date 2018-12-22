// 购物车

const ShoppingcarModel = require('../models/shoppingcar');
const ShoppingCar = {
    // 购物车页面（单独的一个页面）
    index: (req, res, next) => {
        // 购物车列表
        let user = req.session.user;
        let where = {};
        let sumCount = 0;
        where.user_id = user._id
        ShoppingcarModel.find(where).populate('book_id').then(doc => {
           /* res.json({
                shoppingcar:doc
            })*/
            res.render("shopping_car",
                {
                    title: "购物车",
                    shoppingcar: doc,
                    sumCount: sumCount
                });
        }).catch(err => {
            res.json({
                status: 0,
                msg: err
            });
        });


    },
    // 添加购物车
    add: (req, res, next) => {
        // 书籍id
        // 数量
        let book_id = req.body.book_id;
        let num = req.body.num ? req.body.num : 1;
        let user_id = req.session.user._id;
        ShoppingcarModel.findOne({book_id: book_id}).then(doc => {
            if (doc) {
                ShoppingcarModel.update({book_id: doc.book_id}, {
                    num: parseInt(num) + doc.num,
                }).then(doc => {
                    res.json({
                        status: 1,
                        msg: '成功添加到购物车'
                    });
                }).catch(err => {
                    res.json({
                        status: 0,
                        msg: '添加购物车失败'
                    })
                });
            }
            else {
                let shoppingcarmodel = new ShoppingcarModel({
                    user_id: user_id,
                    book_id: book_id,
                    num: parseInt(num)
                });
                shoppingcarmodel.save().then(doc => {
                    res.json({
                        status: 1,
                        msg: '成功添加到购物车'
                    });
                }).catch(err => {
                    res.json({
                        status: 0,
                        msg: '添加购物车失败'
                    })
                });
            }
        });
    },
    /**
     * 获取购物车数量
     */
    count: (req, res, next) => {
        let user_id = req.session.user._id
        ShoppingcarModel.find({user_id: user_id}).then(doc => {
            let sum = 0;
            for (let i = 0; i < doc.length; i++) {
                sum += parseInt(doc[i].num);
            }
            res.json({
                status: 1,
                total_num: sum
            });
        });
    },
    // 删除购物车
    delete: (req, res, next) => {
        // 购物车id || 书籍id
        let id = req.body.id;
        ShoppingcarModel.remove({_id: id}).then(doc => {
            res.json({
                status: 1,
                msg: '移除商品成功'
            })
        }).catch(err => {
            res.json({
                status: 0,
                msg: '移除商品失败'
            })
        });
    },
}


module.exports = ShoppingCar;