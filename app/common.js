const userModels = require('./dbConfig/models/user')
class CommentController {
    async checkUser(ctx, next) {
        console.log(ctx.query, '请求的参数')
        let result = await userModels.findOne({'userName':ctx.request.body.userName || ''});
        console.log(result, '查找的结果')
        // await next();
        await next(); /*这里为什么要加await* 因为下个回调函数是个异步的.不等待它执行完毕的话,那么,koa是会返回的404的.此时链接已经断开了.后面哪怕查到结果了,也无法响应*/
    }
}
module.exports = new CommentController()
