var express = require('express');
var router = express.Router();
var home = require("../controllers/home");
var ranking = require("../middleware/ranking");

// 主页
router.get('/', ranking, home.index);
// 文章分类
router.get('/category', home.category);
// 文章排行榜
router.get('/rank', home.ranking);
// 文章排行榜
router.get('/newest', ranking, home.newest);
// 文章排行榜
router.get('/recommend', ranking, home.recommend);
// 文章搜索
router.get('/search', home.search);

module.exports = router;
