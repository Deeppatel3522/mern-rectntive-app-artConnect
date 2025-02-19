const express = require('express')
const { postEventController, updateEventController, fetchAllEventController, fetchEventController } = require('../controllers/eventControllers')
const multer = require('multer');
const upload = multer();

// ROUTER OBJ
const router = express.Router()

// ROUTES

// post event
router.post('/post-event', upload.array('image'), postEventController)

// fetch-event
router.get('/fetch-event/:id', fetchEventController)

// fetch-all-events
router.get('/fetch-all-event', fetchAllEventController)

// update-event
router.put('/update-event/:eventId', updateEventController)

module.exports = router