const mongoose = require('mongoose')


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
    image: [
        {
            type: String,
            required: true
        }
    ]
    ,
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
    artistName: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Art', artSchema)