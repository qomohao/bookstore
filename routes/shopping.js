var express = require('express');
var router = express.Router();
var shopping_car=require("../controllers/shopping_car");
var order=require("../controllers/order");
var clean=require("../controllers/clean");

// 购物车页面
router.get('/', shopping_car.index);
// 结算页面
router.post('/clean', clean.index);
// 提交订单页面
router.get('/order', order.create);
//支付页面
router.get('/paydemo', order.paydemo);
// 支付方式页面
router.get('/pay', order.pay);
// 支付成功页面
router.get('/payok', order.paySuccess);
//添加到购物车
router.post('/addcar', shopping_car.add);
//删除购物车商品
router.post('/delete', shopping_car.delete);
//获取购物车数量
router.get('/count', shopping_car.count);

module.exports = router;