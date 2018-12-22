const BookModel = require('../models/book');
const CategoryModel = require('../models/category');
const EvaluationModel = require('../models/evaluation');
/**
 * 书籍
 */
const book = {

    /**
     * 书籍详情
     */
    get: (req, res, next) => {
        //书籍ID
        //书籍详情
        //书籍分类畅销榜
        //作者书籍
        //书籍评价
        let id = req.query.id;
        let page = req.query.page ? req.query.page : 1;
        let totalPage = 0;
        let count = 0;
        let where = {};
        let bookWhere = {};
        let limit = 2;

        if (id) {
            where._id = id
            bookWhere.book_id = id;
        }

        BookModel.findOne(where).populate('author_id category_id').then(doc => {
            let bookData = doc;
            const CategoryFun = CategoryModel.findOne({category: bookData.category_id._id}).populate({
                path: 'category',
                select: 'name'
            });
            const EvaluationCount = EvaluationModel.find(bookWhere).count();
            const EvaluationFun = EvaluationModel.find(bookWhere).populate('user_id').limit(limit);
            Promise.all([CategoryFun, EvaluationCount, EvaluationFun]).then(([categoryData, countData, evaluationData]) => {
                count = countData;
                totalPage = Math.ceil(count / limit);
                res.render("details", {
                    title: "图书分类",
                    book: bookData,
                    category: categoryData,
                    evaluation: evaluationData,
                    count: count,
                    totalPage: totalPage,
                    page: page
                });
            }).catch(reject => {
                res.json({
                    status: 0,
                    msg: '网络异常'
                });
            })

        }).catch(err => {
            res.json({
                status: 0,
                msg: err
            });
        });
    }
}

module.exports = book;