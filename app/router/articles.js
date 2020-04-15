const Router = require('koa-router');
const router = new Router();
const Article = require('../dbConfig/models/article');
const UserModels = require('../dbConfig/models/user')
const { checkUser } = require('../common')
/**
 * 2020年4月15日23:09:18.目前还少一个验证,就是验证用户的信息ID ,是不是存在这个表中的.? 删除,修改的时候,还没判定
 */
// 获取全部
router.get('/',checkUser,async (ctx,next) => {
    console.log('这里',ctx.state)
    let result = await Article.find({userId:ctx.state.user._id}).select('title');
    ctx.body = {
        code:200,
        data:result
    }
})
// 查看单个文章ID详情
router.get('/:id',async ctx => {
    console.log('查询的ID',ctx.params)
    try {
        const result = await Article.findById(ctx.params.id)
        ctx.body = {
            code:200,
            data:result
        }
    } catch(e){
        // 查询无用ID的时候,会报错.因此,直接默认返回[]
        ctx.body = {
            code:201,
            msg: '无数据'
        }
    }

})
// 提交文章测试
router.post('/add',async (ctx,next) => {
    ctx.verifyParams({
        title: {type: 'string', required: true},
        content: {type: 'string', required: true}
    });
    let userInfo = ctx.state.user;
    try {
        let user = await UserModels.findById(userInfo._id);
    } catch (e) {
        return ctx.body = {
            code:201,
            msg: '用户不存在,无法添加'
        }
    }
    // console.log(user,' 结果')
    let userId = userInfo._id;
    let {title, content} = ctx.request.body
    const saveReulst = await new Article({
        title,
        content,
        userId
    }).save();
    ctx.body = {
        code:200,
        msg: '添加成功'
    }
},)
// 删除文章.单个
router.delete('/:id', async ctx => {
    try {
        let result = await Article.findByIdAndRemove(ctx.params.id);
        console.log(result, '删除的结果')
        return ctx.body = {
            code:200,
            msg: '删除成功'
        }
    } catch (e) {
        return ctx.body = {
            code:201,
            msg: '文章不存在'
        }
    }
})
// 修改单个
router.put('/:id', async  ctx => {
    console.log('修改的参数',ctx.request.body);
    try {
        let result = await Article.findByIdAndUpdate(ctx.params.id, {...ctx.request.body});
        console.log(result, '更新的结果')
        if (result._id) {
            return ctx.body = {
                code:200,
                msg: '更新成功'
            }
        } else {
            return ctx.body = {
                code:202,
                msg: '更新失败'
            }
        }
    } catch (e) {
        console.log(e)
        return ctx.body = {
            code:201,
            msg: '文章不存在'
        }
    }

})
module.exports = router
