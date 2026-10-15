const postModel = require('../model/post.model')
const Imagekit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')

const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostController(req, res) {

    const { caption, image } = req.body
    console.log(req.body, req.file)

    const token = req.cookies.token

    if (!token) {
        res.status(401).json({
            message: "unauthorized access"
        })
    }
    let decode = null

    try {
        decode = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        res.status(401).json({
            message: "unauthorized access"
        })
    }


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), req.file.originalname),
        fileName: req.file.originalname
    });
   
    // res.send(file)
    const post = await postModel.create({
        caption:caption,
        imgUrl:file.url,
        user:decode.id
    })

    res.status(201).json({
        message:'post created successfully',
        post
    })


}

async function getPostController(req,res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }
    
    let decoded =null;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
      return  res.status(401).json({
            message:'invalid token'
        })
    }
    const user=decoded.id

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

module.exports = {
    createpostController,
    getPostController
}