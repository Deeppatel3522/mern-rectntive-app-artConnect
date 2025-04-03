const express = require('express')
const { orderSaveController, fetchUserOrdersController } = require('../controllers/orderControllers')

// ROUTER OBJ
const router = express.Router()

// ROUTES

// save-order
router.post('/save-order', orderSaveController)

// fetch-orders
router.get('/fetch-orders/:userId', fetchUserOrdersController)


module.exports = router