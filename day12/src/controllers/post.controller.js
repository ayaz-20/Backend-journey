const postModel = require('../model/post.model')

async function postController(req,res){
   
    const {caption,image} = req.body
    console.log(req.body,req.file)
}

module.exports = {
    postController
}