const Alipay=require("../library/alipay");
const path=require("path");

// 订单信息
const Order = {
    // 订单确认 -- 提交订单
    create: (req, res, next) => {
        // 书籍id （数组）
        // 数量 （数组）
        // 地址
        // 生成订单
        res.render("account",
            {
                title: "提交订单",
            });
    },
    // 订单支付方式  -- 支付宝、微信
    pay: (req, res, next) => {
        // 订单号
        res.render("pay",
            {
                title: "支付方式",
            });
    },
    // 订单支付方式  -- 支付宝、微信
    paydemo: (req, res, next) => {
        console.log('1111111111111111111111111111')
        var ali = new Alipay({
            appId: '2016091100485094',
            notifyUrl: 'http://127.0.0.1:3000/',
            rsaPrivate: path.resolve('key/private_key.pem'),
            rsaPublic: path.resolve('key/alipay_public_key.pem'),
            sandbox: true,
            signType: 'RSA2'
        });
        var url = ali.webPay({
            body: "ttt",
            subject: "ttt1",
            outTradeId: new Date().toString(),
            timeout: '90m',
            amount: "0.1",
            sellerId: '',
            product_code: 'FAST_INSTANT_TRADE_PAY',
            goods_type: "1",
            return_url: "http://127.0.0.1:3000/",
        })
        var url_API = 'https://openapi.alipaydev.com/gateway.do?' + url;
        // 跳转支付页
        res.redirect(url_API);

    },
    // 支付成功  -- 界面
    paySuccess: (req, res, next) => {
        res.render("payok",
            {
                title: "支付成功",
            });
    }
};
module.exports = Order;