const eventModel = require("../models/eventModel");
const multer = require('multer');
const cloudinary = require('./../config/cloudinaryConfig.js');


const storage = multer.memoryStorage(); // temp memory to store image before upload
const upload = multer({ storage }).array('image', 10);

// TO DO: add functionality to get "EVENTS BY USER"

// post-event
const postEventController = async (req, res) => {
    try {

        const { name, price, category, location, description, date, artistID } = req.body
        const images = req.files;

        // existing event
        const existingEvent = await eventModel.findOne({ name, location, date, price })

        if (existingEvent) {
            return res.status(500).send({
                success: false,
                message: 'User Already posted simillar event',
                existingEvent
            })
        }

        //


        // validate images
        if (!images || images.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No images uploaded',
            });
        }

        // validate artistID
        if (!artistID) {
            return res.status(400).send({
                success: false,
                message: 'Artist ID not found!'
            })
        }

        // validate other details
        if (!name || !category || !description || !price || !location) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields!'
            })
        }


        // validate time
        try {
            console.log(date);

            const dateObject = new Date(date)

            if ((dateObject instanceof Date) || isNaN(dateObject.getTime()) || dateObject.getHours || dateObject.getMinutes) {
                console.log("Valid date formate", dateObject);
            }
            console.log("Valid Date: ", dateObject);

        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Date is not valid!!'
            })
        }

        // Upload images to Cloudinary
        const imageUploadPromises = images.map(image => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "artConncet_profile_pics" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                ).end(image.buffer);
            });
        });

        const imageUrls = await Promise.all(imageUploadPromises);

        // save user
        const event = await eventModel({
            name,
            location,
            price,
            category,
            image: imageUrls,
            description,
            date,
            artistID
        }).save()

        return res.status(201).send({
            success: true,
            message: 'Event Posted Successfully.',
            event
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in registration API',
            error: error,
        })
    }
}

// fetch-event
const fetchEventController = async (req, res) => {
    try {
        const id = req.params.id

        // validate ID
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Event ID is required!'
            })
        }

        const eventData = await eventModel.findById(id)

        const event = eventData.toObject({ virtuals: true }); // to access virtual fields

        if (!event) {
            return res.status(404).send({
                success: false,
                message: 'Event not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Event fetched successfully!',
            event,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in GET-EVENT API',
            error,
        })
    }
}

// fetch-all-events
const fetchAllEventController = async (req, res) => {
    try {
        const events = await eventModel
            .find()
            .populate('artistID', '_id name')
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: 'All Events fetched successfully!',
            events,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in GET-ALL-EVENTS API',
            error,
        })
    }
}

// fetch all events by user
const fetchAllEventByUserController = async (req, res) => {
    try {
        const { artistID } = req.body;

        if (!artistID) {
            return res.status(400).send({
                success: false,
                message: 'Artist ID is required',
            });
        }

        const events = await eventModel.find({ artistID })

        if (!events || events.length === 0) {
            return res.status(404).send({
                success: false,
                message: `No Arts found for ${artistID}`,
            });
        }

        return res.status(201).send({
            success: true,
            message: `ALL Events fetched Successfully! `,
            events,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in FETCH-ALL-EVENTS-BY-USER API',
            error: error,
        })
    }
}

// UPDATE EVENT ()
const updateEventController = async (req, res) => {
    try {
        const { name, price, category, location, description, date, image } = req.body
        const { eventId } = req.params

        // event find
        const event = await eventModel.findById({ _id: eventId }) // specify it's mongoDB id by "_id"

        // validate event
        if (!event) {
            return res.status(404).send({
                success: false,
                message: 'Event not found!'
            })
        }

        // updated user
        const updatedEvent = await eventModel.findByIdAndUpdate(eventId, {
            name: name || event.name,
            price: price || event.price,
            category: category || event.category,
            location: location || event.location,
            description: description || event.description,
            date: date || event.date,
            image: image || event.image
        }, { new: true })


        res.status(200).send({
            success: true,
            message: 'Event updated.',
            updatedEvent
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Event update API',
            error
        })
    }
}


module.exports = { postEventController, fetchEventController, fetchAllEventController, fetchAllEventByUserController, updateEventController }