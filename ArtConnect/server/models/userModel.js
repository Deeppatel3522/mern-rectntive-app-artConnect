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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Art',
            default: []

            // // to store both "ART" and "EVENTS" in a same array
            // type: mongoose.Schema.Types.Mixed, 
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
        default: ''
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)