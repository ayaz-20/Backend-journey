const express = require('express')
const {followUserController,
    unfollowUserController} = require('../controllers/user.controller')

const identifyUser = require('../middlewares/auth.middleware')

const userRouter = express.Router()
console.log(typeof followUserController);
console.log(typeof unfollowUserController);
console.log(typeof identifyUser);

userRouter.post("/follow/:username",identifyUser,followUserController)
userRouter.post("/unfollow/:username",identifyUser,unfollowUserController)


module.exports= userRouter