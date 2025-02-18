const express = require('express')
const { registerController, loginController, updateUserController, requireSignIn, updateProfileImgController, updateUserFavoriteListController } = require('../controllers/userControllers')

// ROUTER OBJ
const router = express.Router()

// ROUTES

// register-user 
router.post('/register', registerController)

// login-user
router.post('/login', loginController)

// update-user
router.put('/update-user', requireSignIn, updateUserController)

// update-user-profile
router.put('/update-user-profile', requireSignIn, updateProfileImgController)

// update-user-profile
router.put('/update-user-favorites', requireSignIn, updateUserFavoriteListController)

module.exports = router