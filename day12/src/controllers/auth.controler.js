// make api callbacks as a function and all the logic will be written here
const userModel = require("../model/user.model")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

async function registerController (req,res) {
    const {username,email,password,bio,profilephoto}= req.body

    // const emailCheck =await userModel.findOne({email})

    // if(emailCheck){
    //     return res.status(409).json({
    //         message:"User exist with this email"
    //     })
    // }
    // const usernameCheck = await userModel.findOne({username})

    // if(usernameCheck){
    //     return res.status(409).json({
    //         message:"User exist with this username"
    //     })
    // }

    //new way to find multiple conditions

    const isUserAlreadyExists= await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User already exists" + (isUserAlreadyExists.email == email ? " email already exists": " Username already exists")
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const user =await userModel.create({
        username,
        email,
        bio,
        profilephoto,
        password:hash
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET ,{expiresIn:"1d"})


    res.cookie("token",token)

    res.status(200).json({
        message:"User successfully registered",
        user
    })
}

async function loginController (req,res){
    const {username,email,password}=req.body
    //username and password
    //email and password

    const user =await userModel.findOne({
        $or:[
            {
                email:email
            },
            {
                username:username
            }
        ]
    })
    if(!user){
       return res.status(404).json({
            message:'user not exists with this credentials'
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    
    if(!(user.password == hash)){
        return res.status(401).json({
            message:"Incoorect password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"welcome" +(user.username),
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio
        }
    })

}

module.exports = {
    registerController,
    loginController
}