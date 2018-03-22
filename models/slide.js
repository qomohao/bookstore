/*
|--------------------------------------------------------------------------
| 建立轮播数据模型
|--------------------------------------------------------------------------
|
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SlideSchema = new Schema({
    img:{
        type: String,
        default:''
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
const Slide = mongoose.model('Slide', SlideSchema);
module.exports = Slide;