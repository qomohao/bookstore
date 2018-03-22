const BookModel = require("../models/book")
const UserModel = require("../models/user")
/**
 * 结算
 */
const clean = {
    /**
     * 结算页面
     */
    index: (req, res, next) => {
        //书籍ID （数组）
        //书籍数量（数组）
        //用户地址
        res.render("clean",
            {
                title: "确认支付",
                // result:doc,
            })
        // let book_id_arr = req.query.book_id_arr;
        // let user = req.session.user;
        //
        // UserModel.find({user:user._id}).then(doc=>{
        //     res.render("clean",
        //         {
        //         title: "确认支付",
        //         result:doc,
        //     })
        // }).catch(err=>{
        //     res.json({
        //         status: 0,
        //         msg: 'err'
        //     })
        // })
    }
}
module.exports = clean