/*
|--------------------------------------------------------------------------
| 建立分类数据模型
|--------------------------------------------------------------------------
|
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const ShoppingcarSchema = new Schema({
    user_id:{
        type: ObjectId,
        ref: 'User'
    },
    order_id: {
        type: ObjectId,
        ref: 'Order'
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