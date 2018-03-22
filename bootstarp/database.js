/**
 * 数据库连接
 */

const mongoose = require('mongoose');
const config = require('../config/index')

let uri = ''
if (config.mongodb.auth == true) {
    //认证数据库
    uri = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbname}`;
} else {
    //非认真数据库
    uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbname}`;
}

const db = mongoose.connect(uri).then(() => {
    console.log('数据库连接成功');
}).catch(err => {
    console.log('ERROR:数据连接失败' + err);
});
module.exports = db;