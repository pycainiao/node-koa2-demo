// 路由汇总
const Router = require('koa-router')({prefix:'/api/v1'}); /*这样可以加个统一的前缀*/
const userHandle = require('./user');

module.exports = Router.use('/users',userHandle.routes(),userHandle.allowedMethods());
