/*
|--------------------------------------------------------------------------
| 建立分类数据模型
|--------------------------------------------------------------------------
|
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const CategorySchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    category: [
        {
            type: ObjectId,
            ref: 'Category'
        }
    ],
    sort: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
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
const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;