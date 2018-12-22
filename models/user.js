/*
|--------------------------------------------------------------------------
| 建立用户数据模型
|--------------------------------------------------------------------------
|
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    info:{
      type:String,
      default:"这个人很懒，什么也没留下。。。"
    },
    nickname: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    sex: {
        type: String,
        default: '男'
    },
    phone: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 1
    },
    address: [
        {
            name: String,
            phone: String,
            address: String,
            is_mo:Number
        }
    ],
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
const User = mongoose.model('User', UserSchema);
module.exports = User;