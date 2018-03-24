var express = require('express');
var router = express.Router();
var book = require("../controllers/book");


router.get('/', book.get);

module.exports = router;