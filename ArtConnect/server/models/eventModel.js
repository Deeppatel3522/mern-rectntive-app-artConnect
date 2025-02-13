const mongoose = require('mongoose')

// TO DO: add other elements 

// -> user 
// -> description 

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add art name'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Please add event locationL']
    },
    price: {
        type: Number,
        required: [true, 'Please add price for event']
    }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)