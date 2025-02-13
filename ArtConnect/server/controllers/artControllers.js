const artModel = require("../models/artModel");

// add image
const uploadImageController = async (req, res) => {
    try {
        const { name, url } = req.body

        // validate url
        if (!url) {
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

        const art = await artModel({ name: name, url: url }).save()

        return res.status(201).send({
            success: true,
            message: `Image upload Successfully! \n Art id: ${art._id}`
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
                message: 'Image ID is required'
            })
        }

        const art = await artModel.findById(id)

        if (!art) {
            return res.status(404).send({
                success: false,
                message: 'Image not found',
            });
        }

        return res.status(201).send({
            success: true,
            message: `Image fetched Successfully! `,
            art,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in FETCH IMG API',
            error: error,
        })
    }
}

// TO DO: modify this func to get all arts by user

// fetch all image
const fetchAllImageController = async (req, res) => {
    try {

        const arts = await artModel.find({})

        if (!arts || arts.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Images not found',
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
            message: 'Error in FETCH ALL IMG API',
            error: error,
        })
    }
}

// TO DO: add all other elements except name and url to change
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

module.exports = { uploadImageController, fetchImageController, fetchAllImageController, updateImageController }