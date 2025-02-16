const { hashPassword, comparePassword } = require("../helper/authHelper")
const userModel = require("../models/userModel")
const JWT = require('jsonwebtoken');
var { expressjwt: jwt } = require("express-jwt");
const { toggleFavoriteArt } = require("../helper/userHelper");

// MIDDLEWARE
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})

// REGISTER
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body

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
        const user = await userModel({ name, email, password: hashedPassword }).save()

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

const updateProfileImgController = async (req, res) => {
    try {
        const { imgUrl, email } = req.body
        // user find
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Profile not found!',
            })
        }

        // updated user
        const updatedUser = await userModel.findOneAndUpdate({ email }, {
            image: imgUrl || user.image
        }, { new: true })

        updatedUser.password = undefined;

        res.status(200).send({
            success: true,
            message: 'Profile Image updated!',
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in User profile Image update API',
            error
        })
    }
}

const updateUserFavoriteListController = async (req, res) => {
    try {
        const { userId, artId } = req.body

        // user find
        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Profile not found!',
            })
        }

        // toggle result
        const result = await toggleFavoriteArt(userId, artId)

        if (!result.success) {
            return res.status(500).send({
                success: false,
                message: `Error in toggleFavorite function!: ${result.error}`,
            })
        }

        const newUser = result.updatedUser
        updatedUser.password = undefined;

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

module.exports = { requireSignIn, registerController, loginController, updateUserController, updateProfileImgController, updateUserFavoriteListController }