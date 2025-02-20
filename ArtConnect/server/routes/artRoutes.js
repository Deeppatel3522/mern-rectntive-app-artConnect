const express = require('express')
const { uploadImageController, fetchImageController, fetchAllImageController, updateImageController, fetchAllImageByUserController } = require('../controllers/artControllers')
const multer = require('multer');
const upload = multer();

// ROUTER OBJ
const router = express.Router()

// ROUTES

// upload image
router.post('/upload-img', upload.array('image'), uploadImageController)

// fetch-image
router.get('/fetch-img/:id', fetchImageController)

// fetch-all-images
router.get('/fetch-all-img', fetchAllImageController)

// fetch-all-images-by-user
router.get('/fetch-all-img-by-user', fetchAllImageByUserController)

// update-image
router.put('/update-img/:id', updateImageController)

module.exports = router