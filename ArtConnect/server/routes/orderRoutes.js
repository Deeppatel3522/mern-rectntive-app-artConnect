const express = require('express')
const { orderSaveController } = require('../controllers/orderControllers')

// ROUTER OBJ
const router = express.Router()

// ROUTES

// save-order
router.post('/save-order', orderSaveController)



module.exports = router