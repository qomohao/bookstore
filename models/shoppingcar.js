/*
|--------------------------------------------------------------------------
| 建立分类数据模型
|--------------------------------------------------------------------------
|
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const UserModel = require('./user');
const BookModel = require('./book');
const ShoppingcarSchema = new Schema({
    user_id: {
        type: ObjectId,
        ref: 'User'
    },
    book: [
        {
            book_id: {
                type: ObjectId,
                ref: 'Book'
            },
            num: Number,
            total_price: Number
        }
    ],
    total_price: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    create_at: {
        type: Date,
        default: Date.now
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
const Shoppingcar = mongoose.model('Shoppingcar', ShoppingcarSchema);
module.exports = Shoppingcar;