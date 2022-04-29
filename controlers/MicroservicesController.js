const express = require('express')
const router = express.Router();
const Friends = require('../models/friends')
const catchErr = require('../middleware/serverError');



router.post('/', async(req, res)=>{
    try {
        const user = await Friends.create({user: req.user._id})
        res.send({
            success: true,
            data: user._id
        })
    } catch (error) {
        return catchErr(error, res, error.message)
    }
})


router.delete('/remove/:id', async (req, res) => {
	try {
            Friends.findByIdAndDelete(req.params.id)
            return res.send({
                success: true,
                data: "Deleted"
            })
    }catch(err){
        return catchErr(err, res, 'Failed to make new playlist')
    }
})


module.exports = router;