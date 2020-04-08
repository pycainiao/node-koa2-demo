const Router = require('koa-router');
const router = new Router({ prefix: "/user" }); // prefix 代表的是前缀
const UserModels = require('../dbConfig/models/user'); // 引入用户相关的models

router.get('/', async ctx => {
    let result = await UserModels.find({})
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
module.exports = router;
