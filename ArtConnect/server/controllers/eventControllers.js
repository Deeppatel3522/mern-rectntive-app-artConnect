const eventModel = require("../models/eventModel");


// TO DO: add functionality 


// post-event
const postEventController = async (req, res) => {
    return res.status(204).send({
        success: false,
        message: 'Functionality not found',
    });
}

// fetch-event
const fetchEventController = async (req, res) => {
    return res.status(204).send({
        success: false,
        message: 'Functionality not found',
    });
}

// fetch-all-events
const fetchAllEventController = async (req, res) => {
    return res.status(204).send({
        success: false,
        message: 'Functionality not found',
    });
}
// update-event
const updateEventController = async (req, res) => {
    return res.status(204).send({
        success: false,
        message: 'Functionality not found',
    });
}


module.exports = { postEventController, fetchEventController, fetchAllEventController, updateEventController }