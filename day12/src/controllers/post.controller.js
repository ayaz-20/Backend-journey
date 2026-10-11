const postModel = require('../model/post.model')
const Imagekit = require('@imagekit/nodejs')
const {toFile} =require('@imagekit/nodejs')

const imagekit= new Imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function postController(req,res){
   
    const {caption,image} = req.body
    console.log(req.body,req.file)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), req.file.originalname),
        fileName:req.file.originalname
    });
    res.send(file)
}

module.exports = {
    postController
}