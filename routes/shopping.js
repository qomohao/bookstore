var express = require('express');
var router = express.Router();
var shopping_car=require("../controllers/shopping_car");
var order=require("../controllers/order");
var clean=require("../controllers/clean");

// 购物车页面
router.get('/',shopping_car.index);
// 提交订单页面
router.get('/account',order.create);
// 结算页面
router.get('/clean',clean.index);
// 支付方式页面
router.get('/pay',order.pay);
// 支付成功页面
router.get('/payok',order.paySuccess);

module.exports = router;