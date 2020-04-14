// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
// const staticResources = require('koa-static');
const koaBody = require('koa-body'); // 替代koa-bodyparser 同时 这个支持文件,图片上传
// const path = require('path');
const error = require("koa-json-error");
const compress = require('koa-compress'); // 开启服务器压缩
app.use(koaBody({}));
const parameter = require("koa-parameter");
app.use(parameter(app));

// 错误处理
app.use(
    error({
        postFormat: (e, { stack, ...rest }) => {
            // return rest
            return process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
        }
    })
);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ngaCJZ',{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

// 装载所有子路由
const Router = require('koa-router')({prefix:'/api/v1'}); /*这样可以加个统一的前缀*/
const userHandle = require('./router/user');
const articlesHandle = require('./router/articles')
Router.use('/users',userHandle.routes(),userHandle.allowedMethods());
Router.use('/articles',articlesHandle.routes(),articlesHandle.allowedMethods());
app.use(Router.routes()).use(Router.allowedMethods());


const options = { threshold: 2048 };//当数据超过2kb的时候，可以压缩
app.use(compress(options));
// 在端口监听:
app.listen(8088);
console.log('app started at port 8088...');
