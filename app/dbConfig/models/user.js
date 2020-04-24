/**
 * 用户相关
 * @type {Mongoose}
 */
const {Schema, model }= require('mongoose');

const User = new Schema({
    __v: { type: Number, select: false },
    userName: {type: String, require: true, default: '',},
    passWord: {type: String, require: true, },
    userType: {type:Number, default: 0}, // 用户权限 0 是普通用户, 1是管理员
    userImg: {type: String,default: ''}
    // createDate: {type:Date, default: Date.now()}
},{timestamps: true});  /*timestamps 使用默认的时间字段*/ // 即 createdAt updatedAt 目前看,应该是utc时间
module.exports = model('User', User);

