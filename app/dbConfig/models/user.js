/**
 * 用户相关
 * @type {Mongoose}
 */
const {Schema, model }= require('mongoose');

const User = new Schema({
    __v: { type: Number, select: false },
    userName: {type: String, require: true, default: ''},
    passWord: {type: String, require: true, }
});
module.exports = model('User', User);

