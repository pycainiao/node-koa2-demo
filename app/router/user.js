const Router = require('koa-router');
// const router = new Router({ prefix: "/user" }); // prefix 代表的是前缀
const router = new Router(); //
const UserModels = require('../dbConfig/models/user'); // 引入用户相关的models

const jsonwebtoken = require("jsonwebtoken");
const jwt = require("koa-jwt");
const { secret } = require('../config/config')
const auth = jwt({ secret });
// console.log(auth, 'auton')
router.get('/',auth,async (ctx, next) => {
    console.log('获取用户信息', ctx.state)
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
// 登录操作
router.post('/login',async (ctx) => {
    // console.log('SECRET', SECRET);
    console.log('ctx.request.body', ctx.request.body);
    ctx.verifyParams({
        userName: {type: 'string', required: true},
        passWord: {type: 'string', required: true}
    });
    const findCondition = {
        userName: ctx.request.body.userName,
        passWord: ctx.request.body.passWord
    }
    const user = await UserModels.findOne(findCondition).select('userName');
    console.log(user, 'user');
    if (!user) {
        console.log('无结果')
        return ctx.body = {
            code: 101,
            msg:'用户名,密码错误'
        }
    }
    let { _id, userName } = user;
    ctx.body = {
        code:200,
        token: jsonwebtoken.sign(
            { _id, userName },  // 加密
            secret,
        {expiresIn: '12h' } // 有效时长12小时 测试就是10s
        ),
        userInfo:user
    }
})

// 注册
router.post('/sign',async ctx => {
    ctx.verifyParams({
        userName: {type: 'string', required: true},
        passWord: {type: 'string', required: true}
    });
    // 校验必须的参数
    console.log('注册相关',ctx.request.body);
    let {userName, passWord} = ctx.request.body
    let isHaveUser = await UserModels.find({userName});
    console.log(isHaveUser, 'isHaveUser')
    if (isHaveUser.length > 0) {
        return ctx.body = {
            code:201,
            msg: '用户名已存在'
        }
    }
    await new UserModels({
        userName,passWord
    }).save();
    ctx.body = {
        code:200,
        msg: '注册成功'
    }
});
// router.put('/edit', async ctx => {
//     console.log(ctx.request.body);
//     let data = ctx.request.body;
//     console.log(data, 'data')
//     let result = await UserModels.findOneAndUpdate({'userName':data.userName}, {$set:{'passWord': data.passWord}},{new:true}) // 直接返回修改后的数据
//     ctx.body ={
//         code: 'ok',
//         'result': result
//     }
// })
module.exports = router;
