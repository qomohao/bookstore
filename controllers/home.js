const SlideModel = require('../models/slide');
const BookModel = require('../models/book');
const AdModel = require('../models/ad');
const CategoryModel = require('../models/category');
/**
 * Home控制器
 */
const Home = {

    /**
     * 主页
     */
    index: (req, res, next) => {
        // 推荐
        let rec_limit = 4;
        // 新书
        let new_limit = 18;
        // 查找条件
        let where = {};
        where.is_tui = 1;
        // 排序
        let sort = {};
        // 倒叙
        sort.create_at = -1;

        const slide = SlideModel.find();//幻灯
        const recommend = BookModel.find(where).populate('author_id').limit(rec_limit); //推荐
        const ad = AdModel.find();//广告
        const newest = BookModel.find().populate('author_id').limit(new_limit).sort(sort); //最新
        // 导入 -- 结构
        Promise.all([slide, recommend, ad, newest]).then(([slideData, recommendData, adData, newestData]) => {
            res.render("index", {
                title: "主页",
                slide: slideData,
                recommend: recommendData,
                ad: adData,
                newest: newestData
            });
        }).catch(err => {
            res.json({
                status: 0,
                msg: err
            })
        });

    },

    /**
     * 推荐
     */
    recommend: (req, res, next) => {
        //书籍列表（分页）
        //分页查询
        let count = 0;
        let limit = 12;
        let page = req.query.page ? req.query.page : 1;
        let totalPage = 0;
        let where = {};
        let sort = {};
        where.is_tui = 1;
        sort.create_at = -1;

        const recommendCount = BookModel.find(where).count();
        const recommendFun = BookModel.find(where).populate('author_id').skip((page - 1) * limit).limit(limit).sort(sort); //推荐
        Promise.all([recommendCount, recommendFun]).then(([countData, recommendData]) => {
            count = countData;
            totalPage = Math.ceil(count / limit);
            res.render("recommend", {
                title: "推荐好书",
                recommend: recommendData,
                totalPage: totalPage,
                page: page,
                count: count
            });
        }).catch(reject => {
            res.json({
                status: 0,
                msg: '获取失败！'
            })
        });
    },

    /**
     * 新书
     */
    newest: (req, res, next) => {
        //书籍列表（分页，畅销/新书）

        //书籍列表（分页）
        let count = 0;
        let limit = 12;
        let page = req.query.page ? req.query.page : 1;
        let totalPage = 0;
        let where = {};
        where.is_tui = 1;

        const newestCount = BookModel.find(where).count();
        const newestFun = BookModel.find(where).populate('author_id').skip((page - 1) * limit).limit(limit).sort({create_at: 'desc'}); //推荐
        Promise.all([newestCount, newestFun]).then(([countdata, newestData]) => {
            count = countdata;
            totalPage = Math.ceil(count / limit);
            res.render("newest", {
                title: "最新上架",
                newest: newestData,
                totalPage: totalPage,
                page: page,
                count: count
            });
        }).catch(reject => {
            res.json({
                status: 0,
                msg: '获取失败！'
            })
        });
    },

    /**
     * 分类
     */
    category: (req, res, next) => {
        //分类列表
        //分类书籍（分页，销量，评分，时间）

        let id = req.query.id;
        // 通过query判断 1.销量排行 2.价格排行
        let order_cnt = req.query.order_cnt;
        // 判断销量排行
        let price = req.query.price;
        // 判断价格排行
        let score = req.query.score;
        let count = 0;
        let limit = 12;
        let page = req.query.page ? req.query.page : 1;
        let totalPage = 0;
        let where = {};
        let sort = {};
        if (id) {
            where.category_id = id;
        }
        if (order_cnt) {
            sort.order_cnt = -1;
        }
        if (price) {
            sort.price = 'desc';
        }
        if (score) {
            sort.score = -1;
        }
        const category = CategoryModel.find({category:{$ne:[]}}).populate("category");
        const newestCount = BookModel.find(where).count();
        const newestFun = BookModel.find(where).populate('author_id').skip((page - 1) * limit).limit(limit).sort(sort); //推荐
        Promise.all([category, newestCount, newestFun]).then(([categoryData, countdata, newestData]) => {
            count = countdata;
            totalPage = Math.ceil(count / limit);
            res.render("category",
                {
                    title: "分类",
                    category: categoryData,
                    newest: newestData,
                    totalPage: totalPage,
                    page: page,
                    count: count
                });
        }).catch(reject => {
            res.json({
                status: 0,
                msg: '获取失败！'
            })
        });
    },

    /**
     * 排行
     */
    ranking: (req, res, next) => {

        //书籍列表（分页，畅销/新书）
        // 判断新书排行
        let query = req.query.order_cnt;
        let create_at = req.query.create_at;
        let count = 0;
        let limit = 12;
        let page = req.query.page ? req.query.page : 1;
        let totalPage = 0;
        let sort = {};
        // 畅销排行 -- 默认显示畅销排行
        sort.order_cnt = -1
        if (create_at) {
            // 新书排行
            sort.create_at = -1;
        }
        const rankCount = BookModel.find().count();
        const rankFun = BookModel.find().populate('author_id').skip((page - 1) * limit).limit(limit).sort(sort); //推荐
        Promise.all([rankCount, rankFun]).then(([countdata, rankData]) => {
            count = countdata;
            totalPage = Math.ceil(count / limit);
            res.render("rank",
                {
                    title: "排行榜",
                    ranking: rankData,
                    totalPage: totalPage,
                    page: page,
                    count: count,
                    query:query
                });
        }).catch(reject => {
            res.json({
                status: 0,
                msg: '获取失败！'
            })
        });
    },

    /**
     * 搜索
     */
    search: (req, res, next) => {
        //书籍列表(分页)
        let key = req.query.key;
        let count = 0;
        let limit = 12;
        let page = req.query.page ? req.query.page : 1;
        let totalPage = 0;
        let where = {};
        let sort = {};
        if (key) {
            where.key = key;
        }
        sort.create_at = 1;
        const searchCount = BookModel.find(where).count();
        const searchFun = BookModel.find(where).skip((page - 1) * limit).limit(limit).sort(sort); //推荐
        Promise.all([searchCount, searchFun]).then(([countdata, searchData]) => {
            count = countdata;
            totalPage = Math.ceil(count / limit);
            res.json({
                search: searchData,
                totalPage: totalPage,
                page: page,
                count: count
            });
        }).catch(reject => {
            res.json({
                status: 0,
                msg: '获取失败！'
            })
        });
    }
}
module.exports = Home;