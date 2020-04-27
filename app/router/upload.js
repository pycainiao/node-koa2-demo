const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
// const jwt = require("koa-jwt");
// const { secret } = require('../config/config')
// const auth = jwt({ secret });
const {port} = require('../config/config')
//上次单个文件或者图片
router.post('/file' ,async ctx => {
    const file = ctx.request.files.file; // 获取上传文件
    const basename = path.basename(file.path);
    // const reader = fs.createReadStream(file.path); // 创建可读流
    // // 创建文件名
    // let myDate = new Date();
    // const fileNameList = file.name.split('.');
    // const newFileName = `${fileNameList[0]}_${myDate.getTime()}.${fileNameList[1]}`
    // let filePath = path.join(__dirname+`/${newFileName}`) //
    // const writeStream = fs.createWriteStream(filePath); //  // 创建可写流
    // reader.pipe(writeStream); // 可读流通过管道写入可写流
    ctx.body = {
        code: 200,
        msg: '上传成功',
        url: `${ctx.origin}:${port}/${basename}` // 这里测试环境可能不行
    }
})
module.exports = router
