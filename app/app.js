// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
const staticResources = require('koa-static');
const koaBody = require('koa-body'); // 替代koa-bodyparser 同时 这个支持文件,图片上传
const path = require('path');
const error = require("koa-json-error");
const compress = require('koa-compress'); // 开启服务器压缩
const {port} = require('./config/config')
const parameter = require("koa-parameter");
// const jwt = require("koa-jwt");
// const { secret } = require('./config/config')
app.use(parameter(app));

// 错误处理
app.use(
    error({
        postFormat: (e, { stack, ...rest }) => {
            return rest
            // return process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
        }
    })
);
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 20*1024*1024,    // 设置上传文件大小最大限制，默认2M 改为20M
        uploadDir: __dirname + '/static', // 偷懒了.先这样写吧,不自己写存文件的操作了
        keepExtensions: true, // 保留文件后缀名
        hash: 'md5'
    },
}));
app.use(staticResources(
    path.join(__dirname, 'static')
))
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ngaCJZ',{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

// app.use(jwt({secret}).unless({
//     path:[/^\/api\/v1\/users\/login/, /^\/api\/v1\/users\/sign/,/^\/api\/v1\/articles/]
// })); // 只有登录页,注册不需要验证

// 装载所有子路由
const Router = require('koa-router')({prefix:'/api/v1'}); /*这样可以加个统一的前缀*/
const userHandle = require('./router/user');
const articlesHandle = require('./router/articles')
const uploadHandle = require('./router/upload')
Router.use('/users',userHandle.routes(),userHandle.allowedMethods());
Router.use('/articles',articlesHandle.routes(),articlesHandle.allowedMethods());
Router.use('/upload',uploadHandle.routes(),uploadHandle.allowedMethods());
app.use(Router.routes()).use(Router.allowedMethods());


const options = { threshold: 2048 };//当数据超过2kb的时候，可以压缩
app.use(compress(options));
// 在端口监听:
app.listen(port);
console.log(`app started at port ${port}...`);
