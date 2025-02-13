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
        default: '',
    },
    url: {
        type: String,
        required: [true, 'Please add image URL']
    }
}, { timestamps: true })

module.exports = mongoose.model('Art', artSchema)