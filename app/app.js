// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
const Router = require('koa-router');
// const staticResources = require('koa-static');
const koaBody = require('koa-body'); // 替代koa-bodyparser 同时 这个支持文件,图片上传
// const path = require('path');
const compress = require('koa-compress'); // 开启服务器压缩
app.use(koaBody({}));
const parameter = require("koa-parameter");
app.use(parameter(app));
const userRoute = require('./routerConfig/userHandle');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ngaCJZ',{useNewUrlParser: true, useUnifiedTopology: true});




// 装载所有子路由
// let routerTotal = new Router();
// routerTotal.use(userRoute.routes(),userRoute.allowedMethods());
// 加载路由中间件
app.use(userRoute.routes()).use(userRoute.allowedMethods());
const options = { threshold: 2048 };//当数据超过2kb的时候，可以压缩
app.use(compress(options));
// 在端口监听:
app.listen(8088);
console.log('app started at port 8088...');
