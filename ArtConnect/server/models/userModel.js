const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'please add email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please add password'],
        min: 6,
        max: 64,
    }, favorites: [
        {
            postId: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: 'type',
                required: true
            },
            type: {
                type: String,
                enum: ['Art', 'Event'],  // Only allow Art or Event
                required: true
            }
        }
    ],
    following: [
        {
            creatorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                default: null
            },
            creatorName: {
                type: String,
                default: ''
            }

        }
    ],
    type: {
        type: String,
        enum: ['Artist', 'User'],
        required: true,
        default: 'User'
    },
    image: {
        type: String,
        default: 'https://console.cloudinary.com/pm/c-282ea2cb1a566eba60954111f9972d/media-explorer/artConncet_profile_pics?assetId=a472e33452254494191e205ba1a0f2eb'
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)