const express = require('express')
const { registerController, loginController, updateUserController, requireSignIn, updateProfileImgController, updateUserFavoriteListController, updateUserProfileController, fetchUserController, updateUserFollowingListController } = require('../controllers/userControllers')
const multer = require('multer');
const upload = multer();

// ROUTER OBJ
const router = express.Router()

// ROUTES

// register-user 
router.post('/register', registerController)

// login-user
router.post('/login', loginController)

// fetch-user
router.get('/fetch-user/:id', fetchUserController)

// update-user
router.put('/update-user', requireSignIn, updateUserController)

// update-user-profile
router.put('/update-user-profile', upload.single('image'), requireSignIn, updateUserProfileController)

// update-user-profile
router.put('/update-user-favorites', requireSignIn, updateUserFavoriteListController)

// update-user-following
router.put('/update-user-following', updateUserFollowingListController)

module.exports = router