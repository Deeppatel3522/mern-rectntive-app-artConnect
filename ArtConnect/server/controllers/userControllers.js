const { hashPassword, comparePassword } = require("../helper/authHelper")
const userModel = require("../models/userModel")
const JWT = require('jsonwebtoken');
var { expressjwt: jwt } = require("express-jwt");
const { toggleFavoriteArt } = require("../helper/userHelper");
const cloudinary = require('../config/cloudinaryConfig.js');

// MIDDLEWARE
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})

// REGISTER
const registerController = async (req, res) => {
    try {
        const { name, email, password, type } = req.body

        // validate info
        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required'
            })
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'Email is required'
            })
        }
        if (!password || password.length < 6) {
            return res.status(400).send({
                success: false,
                message: 'Password is required and must be 6 cahracters'
            })
        }
        if (!type) {
            return res.status(400).send({
                success: false,
                message: 'Invalid user type!'
            });
        }

        // existing user
        const existingUSer = await userModel.findOne({ email: email })

        if (existingUSer) {
            return res.status(500).send({
                success: false,
                message: 'User Already Registered with this email'
            })
        }

        //HASH PASSWORD
        const hashedPassword = await hashPassword(password);

        // save user
        const user = await userModel({ name, email, password: hashedPassword, type }).save()

        return res.status(201).send({
            success: true,
            message: 'Registration Successfull please Login'
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

// Login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please provide Email or Password'
            })
        }

        //find user 
        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'User not found'
            })
        }

        //match password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(500).send({
                success: false,
                message: 'Invalid username or password'
            })
        }

        //TOKEN JWT

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d', })

        // undefined password
        user.password = undefined
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            token,
            user,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login API'
        })
    }
}

// UPDATE USER (name || password)
const updateUserController = async (req, res) => {
    try {
        const { name, password, email, type } = req.body
        // user find
        const user = await userModel.findOne({ email })
        // password validate
        if (password && password.length < 6) {
            return res.status(400).send({
                success: false,
                message: 'Password is required and must be 6 cahracters'
            })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined

        // type validate 
        if (type && !['Artist', 'User'].includes(type)) {
            return res.status(404).send({
                success: false,
                message: 'Invalid user type'
            })
        }

        // updated user
        const updatedUser = await userModel.findOneAndUpdate({ email }, {
            name: name || user.name,
            password: hashedPassword || user.password,
            type: type || user.type
        }, { new: true })

        updatedUser.password = undefined;

        res.status(200).send({
            success: true,
            message: 'Profile updated, Please Login',
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in User update API',
            error
        })
    }
}

// UPDATE || (PROFILE IMG)
const updateUserProfileController = async (req, res) => {
    const { email } = req.body;

    // Validate the uploaded file
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No image uploaded",
        });
    }

    try {
        // Upload image to Cloudinary
        const cloudResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "artConncet_profile_pics" },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }).end(req.file.buffer);
        });

        const user = await userModel.findOneAndUpdate(
            { email },
            { image: cloudResult.secure_url },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// UPDATE || (FAVORITE LIST) 
const updateUserFavoriteListController = async (req, res) => {
    try {
        const { userId, postId } = req.body

        if (!userId || !postId) {
            return res.status(400).send({
                success: false,
                message: 'User or post ID not found!',
            })
        }

        // user find
        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Profile not found!',
            })
        }

        // toggle result
        const result = await toggleFavoriteArt(userId, postId)

        if (!result.success) {
            return res.status(500).send({
                success: false,
                message: `Error in toggleFavorite function!: ${result.error}`,
            })
        }

        const newUser = result.updatedUser
        newUser.password = undefined;

        return res.status(200).send({
            success: true,
            message: 'Favorite list updated!',
            newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in favorite list update API',
            error
        })
    }
}

module.exports = { requireSignIn, registerController, loginController, updateUserController, updateUserFavoriteListController, updateUserProfileController }