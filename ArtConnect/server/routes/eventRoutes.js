const express = require('express')
const { postEventController, updateEventController, fetchAllEventController, fetchEventController } = require('../controllers/eventControllers')
// ROUTER OBJ
const router = express.Router()

// ROUTES

// post event
router.post('/post-event', postEventController)

// fetch-event
router.get('/fetch-event/:id', fetchEventController)

// fetch-all-events
router.get('/fetch-all-event', fetchAllEventController)

// update-event
router.put('/update-event/:id', updateEventController)

module.exports = router