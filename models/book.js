/*
|--------------------------------------------------------------------------
| 建立书籍数据模型
|--------------------------------------------------------------------------
|
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const moment = require('moment');
const AuthorModel = require('./author');
const CategoryModel = require('./category');
const BookSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    author_id: {
        type: ObjectId,
        ref: 'Author'
    },
    category_id: {
        type: ObjectId,
        ref: 'Category'
    },
    content: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 0
    },
    is_tui: {
        type: Number,
        default: 0
    },
    order_cnt: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
    update_at: {
        type: Date,
        default: Date.now
    },
    delete_at: {
        type: Date,
        default: null
    }
});
const Book = mongoose.model('Book', BookSchema);
module.exports = Book;