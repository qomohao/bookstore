/*
|--------------------------------------------------------------------------
| 建立评价数据模型
|--------------------------------------------------------------------------
|
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const UserModel = require('./user');
const BookModel = require('./book');
const OrderModel = require('./order');
const EvaluationSchema = new Schema({
    user_id: {
        type: ObjectId,
        ref: 'User'
    },
    book_id: {
        type: ObjectId,
        ref: 'Book'
    },
    order_id: {
        type: ObjectId,
        ref: 'Order'
    },
    content: {
        type: String,
        default: ''
    },
    score: {
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
const Evaluation = mongoose.model('Evaluation', EvaluationSchema);
module.exports = Evaluation;