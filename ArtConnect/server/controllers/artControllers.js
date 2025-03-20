const cloudinary = require('../config/cloudinaryConfig.js');
const artModel = require("../models/artModel");

// add image
const uploadImageController = async (req, res) => {
    try {
        const { name, category, price, description, artistID } = req.body;
        const images = req.files;

        // existing Art
        const existingArt = await artModel.findOne({ name, category, price, artistID })

        if (existingArt) {
            return res.status(500).send({
                success: false,
                message: 'User Already posted simillar Art',
                existingArt
            })
        }

        // validate images
        if (!images || images.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'At least one image is required'
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
        if (!name || !category || !description || !price) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields!'
            })
        }

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

        const art = await artModel({
            name,
            image: imageUrls,
            category,
            price,
            description,
            artistID
        }).save()

        return res.status(201).send({
            success: true,
            message: `Image upload Successfully! \n Art id: ${art._id}`,
            art
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in UPLOAD IMG API',
            error: error,
        })
    }
}

// fetch image
const fetchImageController = async (req, res) => {
    try {
        const id = req.params.id

        // validate url
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Art ID is required'
            })
        }

        const art = await artModel.findById(id)

        if (!art) {
            return res.status(404).send({
                success: false,
                message: 'Art not found',
            });
        }

        return res.status(201).send({
            success: true,
            message: `Art fetched Successfully! `,
            art,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in FETCH ART API',
            error: error,
        })
    }
}

// fetch all image
const fetchAllImageController = async (req, res) => {
    try {

        const arts = await artModel.find({})

        if (!arts || arts.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Arts not found',
            });
        }

        return res.status(201).send({
            success: true,
            message: `ALL Arts fetched Successfully! `,
            arts,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in FETCH ALL ARTS API',
            error: error,
        })
    }
}

// fetch all images by user
const fetchAllImageByUserController = async (req, res) => {
    try {
        const { artistID } = req.body;

        if (!artistID) {
            console.log("Id is unavailable!");
            
            return res.status(400).send({
                success: false,
                message: 'Artist ID is required',
            });
        }

        const arts = await artModel.find({ artistID })

        if (!arts || arts.length === 0) {
            return res.status(404).send({
                success: false,
                message: `No Arts found for ${artistID}`,
            });
        }

        return res.status(201).send({
            success: true,
            message: `ALL Images fetched Successfully! `,
            arts,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in FETCH-ALL-IMG-BY-USER API',
            error: error,
        })
    }
}

// update-art
const updateImageController = async (req, res) => {
    try {
        const { name, url } = req.body
        const { id } = req.params

        // validate url
        if (!id || id.trim() === '') {
            return res.status(400).send({
                success: false,
                message: 'Image ID is required'
            })
        }

        // validate url
        if (!url || url.trim() === "") {
            return res.status(400).send({
                success: false,
                message: 'Image URL is required'
            })
        }

        // validate name
        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'Image name is required'
            })
        }

        // art find
        const art = await artModel.findOne({ _id: id })

        // updated art
        const updatedArt = await artModel.findOneAndUpdate({ _id: id }, {
            name: name || art.name,
            url: url || art.url,
        }, { new: true })


        res.status(200).send({
            success: true,
            message: 'Art updated!',
            updatedArt
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Art update API',
            error
        })
    }
}

module.exports = { uploadImageController, fetchImageController, fetchAllImageController, fetchAllImageByUserController, updateImageController }