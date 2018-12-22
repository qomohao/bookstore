var express = require('express');
var router = express.Router();
var book = require("../controllers/book");
var ranking = require("../middleware/ranking");


router.get('/', ranking,book.get);

module.exports = router;