const mongoose = require('mongoose')

// TO DO: add other elements 

// -> user 
// -> description 
// -> img-story(optionl)

const artSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add art name'],
        trim: true,
    },
    category: {
        type: String,
        required: true
    },
    imgUrl: [
        {
            type: String,
            required: [true, 'Please add image URL']
        }
    ],
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    artistID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Art', artSchema)