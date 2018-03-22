var express = require('express');
var router = express.Router();
var home=require("../controllers/home")

// 主页
router.get('/',home.index);
// 文章分类
router.get('/category',home.category);
// 文章排行榜
router.get('/rank',home.ranking);
// 文章排行榜
router.get('/newest',home.newest);
// 文章排行榜
router.get('/recommend',home.recommend);

module.exports = router;
