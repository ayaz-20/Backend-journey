const followModel = require('../model/follow.model')
const userModel = require('../model/user.model')


async function followUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    const isUserExists = await userModel.findOne({username : followeeUsername})

    if(!isUserExists){
         return res.status(404).json({
            message:`User you are trying to follow doesn't exists`
        })
    }

    if(followeeUsername===followerUsername){
        return res.status(409).json({
            message:`you can't follow yourself`
        })
    }

    const isAlreadyExists = await followModel.findOne({
        follower: followerUsername,
       followee: followeeUsername
    })

    if(isAlreadyExists){
         return res.status(409).json({
            message:`you already follow ${followeeUsername}`
        })
    }

    const followRecord = await followModel.create({
        follower : followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        mesaage:`you are now following ${followerUsername}`,
        followRecord
    })

}


module.exports = followUserController