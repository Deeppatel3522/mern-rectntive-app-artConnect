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
            type: mongoose.Schema.Types.Mixed,
            ref: 'Art',
            default: []

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
        default: 'https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg'
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)