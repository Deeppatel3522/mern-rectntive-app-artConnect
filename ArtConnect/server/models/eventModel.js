const mongoose = require('mongoose')

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
    },
    category: {
        type: String,
        required: true
    },
    image: [
        {
            type: String,
            required: true
        }
    ],
    description: {
        type: String,
        required: true,
        default: ''
    },
    date: {
        type: Date,
        required: true
    },
    artistID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })

// Virtual fields
eventSchema.virtual('isOpen').get(function () {
    return this.date >= new Date();  // Returns true if event date is in the future
});

module.exports = mongoose.model('Event', eventSchema)