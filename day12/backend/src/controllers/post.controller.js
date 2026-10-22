const postModel = require('../model/post.model')
const likeModel = require('../model/like.model')
const Imagekit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const  mongoose= require('mongoose')


const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostController(req, res) {

    const { caption, image } = req.body
    console.log(req.body, req.file)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), req.file.originalname),
        fileName: req.file.originalname
    });
   
    // res.send(file)
    const post = await postModel.create({
        caption:caption,
        imgUrl:file.url,
        user:req.user.id
    })

    res.status(201).json({
        message:'post created successfully',
        post
    })


}

async function getPostController(req,res){
   
    const user=req.user.id;

    const post = await postModel.find({user})  
    const length = post.length

    if(!length){
      return  res.status(404).json({
            message:"post not found"
        })
    }

    res.status(200).json({
        message:'posts fetched successfully',
        post
    })
}

async function getPostDetails(req,res){
    const postId = req.params.postId
    const userId=req.user.id

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:'post not found'
        })
    }

    const isvalidUser = userId === post.user.toString()

    if(!isvalidUser){
       return res.status(403).json({
            message:"forbidden content"
        })
    }

    res.status(200).json({
        message:'post fetched successfully',
        post
    })

}



async function likePostController(req,res){
    const username=req.user.username
    const postId = req.params.postId

    if (!mongoose.isValidObjectId(req.params.postId)) {
    return res.status(400).json({
        message: "Invalid post ID"
    });
}

    const isPostExists = await postModel.findById(postId)

    if(!isPostExists){
        return res.status(404).json({
            message:"post doesn't exist"
        })
    }

    const like = await likeModel.create({
       postId:postId,
        username:username
    })

    res.status(200).json({
        message:"post liked successfully",
        like
    })

}
module.exports = {
    createpostController,
    getPostController,
    getPostDetails,
    likePostController
}
