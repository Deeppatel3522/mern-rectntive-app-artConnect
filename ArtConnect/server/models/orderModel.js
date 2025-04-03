const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    itemDetails: {
        type: Object,
        required: true
    },
    userInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        userId: { type: String, required: true }
    },
    deliveryAddress: {
        streetNumber: { type: String, required: true },
        streetName: { type: String, required: true },
        unitNumber: { type: String, required: false },
        postalCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)