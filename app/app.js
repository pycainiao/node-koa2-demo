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

let home = new Router();
home.get('/home',async (ctx) => {
    console.log(ctx.query)
    console.log(ctx, 'cxt')
    console.log(ctx.querystring)
    ctx.body = `这是home`
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
