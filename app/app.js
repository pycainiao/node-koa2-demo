// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
const Router = require('koa-router');
const staticResources = require('koa-static');
const bodyParser = require('koa-bodyparser'); // 处理post请求的
const path = require('path');
const compress = require('koa-compress'); // 开启服务器压缩
app.use(bodyParser());

const staticPath = './static';
app.use(staticResources(
    path.join( __dirname,  staticPath)
));
const mongoose = require('mongoose');
const Schema = mongoose.Schema
// setTimeout(() => {
    mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology: true});
    // console.log('开始连接')
// },6000)
// mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology: true});
let userSchema  = new Schema({
    name: String,
    data: Boolean
},{ collection:'usera' })
// const Cat = mongoose.model('cat', { name: String }); // 为什么 集合是cats 默认生成的集合是复数的.吊 因为在创建 Schema的时候,没有指定集合名,默认就是复数的
// const Cat = mongoose.model('cat', userSchema); // 为什么 集合是cats 默认生成的集合是复数的.吊
const Cat = mongoose.model('cat3123123', userSchema); // 为什么 集合是cats 默认生成的集合是复数的.吊

const kitty = new Cat({ name: 'Zildjian1',data: true });
kitty.save().then(() => console.log('meow','插入成功'));
let home = new Router();
home.get('/home',async (ctx) => {
    // console.log(ctx.query)
    // console.log(ctx, 'cxt')
    // console.log(ctx.querystring)
    const ceshiMoudel = mongoose.model('wqeqewqw',userSchema);
    // const ceshiMoudel = mongoose.model('usera');
    let result = await ceshiMoudel.find();
    ctx.body = {
        msg:'ok',
        result: result
    }
    // ceshiMoudel.find({}).then( res => {
    //     console.log('新的查询结果', res)
    //     ctx.body =  res
    // })
    // ceshiMoudel.find(,res => {
    //     console.log('查询结果', res);
    // })
    // ctx.body = `这是home`
});
home.get('/bac',async ctx => {
    const html = `
        <img src="./wechat.jpg" />
    `;
    ctx.body = html
})
home.get('/',async (ctx) => {
    ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>Hello, 半生23!</h1>';
    ctx.body = '<h1>Hello, 半生23!</h1>';
});
home.post('/',async ctx => {
    console.log(ctx.request.body); // 获取请求体中数据
    ctx.body=  {'result':200,code:300}
});


// 装载所有子路由
let routerTotal = new Router();
routerTotal.use(home.routes(),home.allowedMethods());
// 加载路由中间件
app.use(routerTotal.routes()).use(routerTotal.allowedMethods());
const options = { threshold: 2048 };//当数据超过2kb的时候，可以压缩
app.use(compress(options));
// 在端口监听:
app.listen(8088);
console.log('app started at port 8088...');
