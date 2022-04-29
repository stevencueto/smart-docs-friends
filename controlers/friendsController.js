const express = require('express')
const router = express.Router();
const Friends = require('../models/friends')
const catchErr = require('../middleware/serverError');



router.get('/', async(req, res)=>{
    try {
        const user = await Friends.findOne({user :req.user._id}).populate('friends', '_id username name')
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
        const user = await Friends.findById(req.params.id).populate('friends', '_id username')
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
        const olfFriends =  await Friends.findById(req.params.id)
        const otherFrineds = () =>{
            if(olfFriends.friends.length === 0) return false
            let posMovie = false
            for(const friend of olfFriends.friend){
                if(friend === req.body.friend) return posMovie = true
            }
            return posMovie
        }
        if(otherFrineds()) return catchErr(addMovie, res, "no new friends here")
        const friends = await Friends.findByIdAndUpdate(
            {
                _id : olfFriends._id
            },{
                $push: {
                    friends: req.body.friend
                }
            }, {
                new:true
            }
        ).populate('friends', '_id username')
        res.send({
            success: true,
            data: friends
        })
    } catch (error) {
        return catchErr(err, res, error.message)
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