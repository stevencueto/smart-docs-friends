
const mongoose = require('mongoose')
const Schema = mongoose.Schema



const friendSchema = new Schema({
        user: {
            required: true,
            unique: true,
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        friends:[ 
            {
            type: Schema.Types.ObjectId,
            ref: 'Friends',
            sparse:true,
            unique: false,

            }
        ],
    }
)

const Friends = mongoose.model('Friends', friendSchema);

module.exports = Friends;