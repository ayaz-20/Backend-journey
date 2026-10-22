const followModel = require('../model/follow.model')
const userModel = require('../model/user.model')


async function followUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    const isUserExists = await userModel.findOne({ username: followeeUsername })

    if (!isUserExists) {
        return res.status(404).json({
            message: `User you are trying to follow doesn't exists`
        })
    }

    if (followeeUsername === followerUsername) {
        return res.status(409).json({
            message: `you can't follow yourself`
        })
    }

    const isAlreadyExists = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (isAlreadyExists) {
        return res.status(409).json({
            message: `you already follow ${followeeUsername}`
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        mesaage: `you are now following ${followerUsername}`,
        followRecord
    })

}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if (!isFollowing) {
        return res.status(404).json({
            message: `you do not follow ${followeeUsername} `
        })
    }

    await followModel.findByIdAndDelete(isFollowing._id)
    res.status(200).json({
        message: `YOU SUCCESSFULLY UNFOLLOW ${followeeUsername}`
    })
}

async function statusUserController(req, res) {
    const username = req.user.username


    const allRequest = await followModel.find({ followee: username, status: "Pending" })


    const isAnyRequest = allRequest.length === 0

    if (isAnyRequest) {
        return res.status(200).json(
            {
                message: "you don't have any pending request"
            }
        )
    }

    res.status(200).json({
        allRequest
    })
}

async function updateStatusUserController(req, res) {
    const username = req.user.username
    const follower = req.params.username
    const { status } = req.body

    const isExist = await followModel.findOne({
        followee: username,
        follower: follower,
        status: "Pending"
    })


    if (!isExist) {
        return res.status(404).json(
            {
                message: "you don't have pending request"
            }
        )
    }

    if (!["Accepted", "Rejected"].includes(status)) {
  return res.status(400).json({
    message: "Invalid status"
  });
}

 const updated = await followModel.updateOne(
        {
            followee: username,
            follower: follower,
            status: "Pending"
        },
        { status: `${status}` }
    )

    res.status(200).json({
        message: `Request is ${status}`,
        updated
    })


}



module.exports = {
    followUserController,
    unfollowUserController,
    statusUserController,
    updateStatusUserController


}