const express = require('express')
const PaymentReq = require('../controllers/paymentController.js')

// ROUTER OBJ
const router = express.Router()

// post event
router.post('/purchase-item', PaymentReq)

// Export
module.exports = router