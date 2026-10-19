const mongoose = require('mongoose')
const { applyTimestamps } = require('./post.model')

const likeSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'post id is required']
    },
    username:{
        type:String,
        required:[true,'username is required']
    }
},{
    timestamps:true
})

likeSchema.index({postid:1,username:1},{unique:true})

const likeModel = mongoose.model("likes",likeSchema)

module.exports = likeModel