var express = require('express');
var router = express.Router();
const home = require('../controllers/home')

router.get('/', home.index);
router.get('/recommend', home.recommend);
router.get('/news', home.news);
router.get('/category', home.category);
router.get('/ranking', home.ranking);
router.get('/search', home.search);

module.exports = router;
