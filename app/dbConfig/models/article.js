/**
 * 文章列表
 */
const {Schema,model} = require('mongoose')

const Article = new Schema({
    __v: { type: Number, select: false },
    title: {type: String,require: true, default:''},
    content: {type: String, require: true, default: ""},
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        require: true,
        select: false
    }
})

module.exports = model('article', Article);
