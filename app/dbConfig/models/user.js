/**
 * 用户相关
 * @type {Mongoose}
 */
const mongosse = require('mongoose');
const {Schema, model } = mongosse;

const User = new Schema({
    __v: { type: Number, select: false },
    userName: {type: String, require: true, default: ''},
    passWord: {type: String, require: true, }
});
module.exports = model('User', User);

