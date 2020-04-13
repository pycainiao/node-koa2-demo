const Router = require('koa-router');
const router = new Router();
const Article = require('../dbConfig/models/article');
// 提交文章测试
router.post('/add',async (ctx,next) => {
    let user = await UserModels.findOne({'userName': 'admin'});
    console.log(user,' 结果')
    let userId = user._id;
    const saveReulst = await new Article({
        ...ctx.request.body,
        userId
    }).save();
    ctx.body = {
        result: saveReulst
    }
},)
module.exports = router
