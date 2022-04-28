const express = require('express')
const router = express.Router();
const Friends = require('../models/friends')
const errorHandler = require('../middleware/serverError');



app.get('/:id', async(req, res)=>{
    try {
        const user = await Friends.findById(req.params.id)
        res.send({
            success: true,
            data: user
        })
    } catch (error) {
        return catchErr(err, res, error.message)
    }
})

app.put('/:id', async(req, res)=>{
    try {
        const friends = await Friends.findByIdAndUpdate(
            {
                _id :req.params.id
            },{
                $push: {
                    friends: req.body
                }
            }, {
                new:true
            }
        )
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
                        friends: req.body
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