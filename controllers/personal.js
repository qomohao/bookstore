var personal = {
    // 渲染页面
    index: (req, res, next) => {
        res.render("personal/personal",
            {
                title: "个人中心",
            });
    }
}

module.exports = personal;