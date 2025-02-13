const mongoose = require('mongoose')


// TO DO: add arrays
// 
// -> arts
// -> events
// -> favorites

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
    },
    role: {
        type: String,
        default: 'user',

    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)