const express = require('express')
const router = express.Router();
const Friends = require('../models/friends')
const catchErr = require('../middleware/serverError');
const mongoose = require('mongoose')



router.get('/', async(req, res)=>{
    try {
        const user = await Friends.findOne({user :req.user._id})
        res.send({
            success: true,
            data: user
        })
    } catch (error) {
        return catchErr(error, res, error.message)
    }
})

router.get('/:id', async(req, res)=>{
    try {
        const user = await Friends.findById(req.params.id)
        res.send({
            success: true,
            data: user
        })
    } catch (error) {
        return catchErr(error, res, error.message)
    }
})


router.put('/:id', async(req, res)=>{
    try {
        const oldFriends =  await Friends.findById(req.params.id)
        const newFriend = req.body.friend
        const otherFrineds = () =>{
            if(!oldFriends.friends.length) return false
            let posFriend = false
            const allFriends = oldFriends.friends
            for(const friend of frid){
                console.log(frid, newFriend)
                if(mongoose.Types.ObjectId(newFriend) === allFriends) return posFriend = true
            }
            return posFriend
        }
        if(otherFrineds()) return catchErr("duplicate", res, "no new friends here")
        const data = await Friends.findByIdAndUpdate(
            {
                _id : oldFriends._id
            },{
                $push: {
                    friends: mongoose.Types.ObjectId(req.body.friend)
                }
            }, {
                new:true
            }
        ).populate("user")
        return res.send({
            success: true,
            data: data
        })
    } catch (error) {
        return catchErr(error, res, error.message)
    }
})


router.delete('/remove/:id', async (req, res) => {
	try {
            const friends = await Friends.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    $pull: {
                        friends: req.body.friend
                    }
                },{
                    new:true
                }
            )
            return res.send({
                success: true,
                data: friends
            })
    }catch(err){
        return catchErr(err, res, 'Failed to make new playlist')
    }
})


module.exports = router;