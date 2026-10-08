const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
    type:String,
    unique:[true,"username already exist"],
    required:[ true,"username is required"]
    },
    email:{
    type:String,
    unique:[true,"email already exist"],
    required:[ true,"email is required"]
    },
    password:{
    type:String,
    required:[ true,"username is required"]
    },
    bio:String,
    profilephoto:String
})

const UserModel = mongoose.model("users",userSchema)

module.exports = UserModel