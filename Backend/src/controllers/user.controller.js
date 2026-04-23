const followModel = require('../models/follow.model');
 
async function followUserController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isFolloweeExist = await followModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExist) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    if(followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }



    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}

async function unfollowUserConrtoller(req, res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

}

module.exports = {
    followUserController,
    unfollowUserConrtoller
}
