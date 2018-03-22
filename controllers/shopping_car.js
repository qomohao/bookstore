// 购物车
const ShoppingCar = {
    // 购物车页面（单独的一个页面）
    index: (req, res, next) => {
        // 购物车列表
        res.render("shopping_car",
            {
                title: "购物车",
            });
    },
    // 添加购物车
    add: (req, res, next) => {
        // 书籍id
        // 数量
        let book_id = req.body.book_id;
        let count = req.body.count;

    },
    // 删除购物车
    delete: (req, res, next) => {
        // 购物车id || 书籍id
    }

};
module.exports = ShoppingCar;