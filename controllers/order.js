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
    // 支付成功  -- 界面
    paySuccess: (req, res, next) => {
        res.render("payok",
            {
                title: "支付成功",
            });
    }
};
module.exports = Order;