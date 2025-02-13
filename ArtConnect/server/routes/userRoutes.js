const express = require('express')
const { registerController, loginController, updateUserController, requireSignIn } = require('../controllers/userControllers')

// ROUTER OBJ
const router = express.Router()

// ROUTES

// register-user 
router.post('/register', registerController)

// login-user
router.post('/login', loginController)

// update-user
router.put('/update-user', requireSignIn, updateUserController)

module.exports = router