const Router = require('koa-router');
// const router = new Router({ prefix: "/user" }); // prefix 代表的是前缀
const router = new Router(); //
const UserModels = require('../dbConfig/models/user'); // 引入用户相关的models

router.get('/', async (ctx, next) => {
    // let result = await UserModels.find();
    let result = await UserModels.aggregate([
        {
            $lookup: {
                from: 'articles',  // 从哪个Schema中查询（一般需要复数，除非声明Schema的时候专门有处理）
                localField: '_id',  // 本地关联的字段
                foreignField: 'userId', // articles中用的关联字段
                as: 'gereneshi' // 查询到所有articles后放入的字段名，这个是自定义的，是个数组类型。
            }
        }
    ])
    // let result = await Article.find().populate('userId','userName') ;
    ctx.body = {
        result :200,
        data: result
    }
});
router.post('/sign',async ctx => {
    // ctx.verifyParams({
    //     name: { type: 'string', required: true },
    //     age: { type: 'number', required: false }
    // });
    // 校验必须的参数
    console.log('注册相关',ctx.request.body);
    const saveResult = await new UserModels({
        ...ctx.request.body
    }).save();
    ctx.body = {
        result :200,
        code:2,
        saveData: saveResult
    }
});
router.put('/edit', async ctx => {
    console.log(ctx.request.body);
    let data = ctx.request.body;
    console.log(data, 'data')
    let result = await UserModels.findOneAndUpdate({'userName':data.userName}, {$set:{'passWord': data.passWord}},{new:true}) // 直接返回修改后的数据
    ctx.body ={
        code: 'ok',
        'result': result
    }

})
module.exports = router;
