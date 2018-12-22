var BookModel=require("../models/book");
var personal = {
    // 渲染页面
    index: (req, res, next) => {
        const booklist=BookModel.find().populate('author_id');
        Promise.all([booklist]).then(([booklist])=>{
            res.render("personal/personal",
                {
                    title: "个人中心",
                    booklist:booklist,
                });
        }).catch(err=>{
            res.json({
                status:0,
                msg:"获取数据失败！"
            })
        });
    },
};






module.exports = personal;