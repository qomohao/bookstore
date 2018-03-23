/**
 * 排行榜中间件
 */
const BookModel = require('../models/book');
const ranking = (req, res, next) => {
    let limit = 10;

    let newestSort = {create_at: -1};
    let order_cntSort = {order_cnt: -1};
    const newestRank = BookModel.find({}).populate('author_id').limit(limit).sort(newestSort);
    const order_cntRank = BookModel.find({}).populate('author_id').limit(limit).sort(order_cntSort);
    Promise.all([newestRank, order_cntRank]).then(([newestData, order_cntData]) => {
        res.locals.newest = newestData;
        res.locals.order_cnt = order_cntData;
        next();
    }).catch(err => {

        res.json({
            status: 0,
            msg: err
        })
    });
}
module.exports = ranking;