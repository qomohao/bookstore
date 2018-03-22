/**
 * 订单
 */
const order = {

    /**
     * 订单列表
     */
    index: (req, res, next) => {
        //状态
    },

    /**
     * 订单详情
     */
    get: (req, res, next) => {
        //订单ID
    },

    /**
     * 取消订单
     */
    cancel: (req, res, next) => {
        //订单ID
        //验证
    },

    /**
     * 确认订单
     */
    receive: (req, res, next) => {
        //订单ID
    },

    /**
     * 订单评价
     */
    evaluation: (req, res, next) => {
        //订单id
        //书籍id
        //等级
        //评价内容
    },

    /**
     * 删除订单
     */
    delete: (req, res, next) => {
        //订单id
    }

}
module.exports = order