/*
|--------------------------------------------------------------------------
| 建立作者数据模型
|--------------------------------------------------------------------------
|
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
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
const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;