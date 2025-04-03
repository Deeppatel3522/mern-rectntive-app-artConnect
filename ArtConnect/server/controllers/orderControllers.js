const { hashPassword, comparePassword } = require("../helper/authHelper")
const userModel = require("../models/userModel")
const ArtModel = require("../models/artModel.js")
const EventModel = require("../models/eventModel.js")
const JWT = require('jsonwebtoken');
var { expressjwt: jwt } = require("express-jwt");
const { toggleFavoriteArt, toggleFollowing } = require("../helper/userHelper");
const cloudinary = require('../config/cloudinaryConfig.js');
const { default: mongoose } = require("mongoose");
const orderModel = require("../models/orderModel.js");

// MIDDLEWARE
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})

// SAVE ORDER
const orderSaveController = async (req, res) => {
    try {
        const { orderData } = req.body

        // validate info
        if (!orderData) {
            return res.status(400).send({
                success: false,
                message: 'Order Details are required!'
            })
        }

        const { itemDetails, userInfo, deliveryAddress, subtotal, tax, total, date } = orderData;

        if (!itemDetails || !userInfo || !deliveryAddress || subtotal == null || tax == null || total == null || !date) {
            return res.status(400).send({
                success: false,
                message: 'All order details are required!'
            });
        }

        // save order
        const savedOrder = await orderModel(orderData).save()

        return res.status(201).send({
            success: true,
            message: 'Orde Successfull saved in Database!',
            orderId: savedOrder._id
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Order saving API',
            error: error,
        })
    }
}

// // GET USER
// const fetchUserController = async (req, res) => {
//     try {
//         const id = req.params.id

//         // validate ID
//         if (!id) {
//             return res.status(400).send({
//                 success: false,
//                 message: 'User ID is required!'
//             })
//         }

//         const user = await userModel.findById(id)

//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'User not found',
//             });
//         }

//         res.status(200).send({
//             success: true,
//             message: 'User fetched successfully!',
//             user,
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error in GET-USER API',
//             error,
//         })
//     }
// }

// GET USER ORDERS
const fetchUserOrdersController = async (req, res) => {
    try {
        const { userId } = req.params
        console.log(`Chcecking User ORders for :${userId} `, userId);

        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "User Email is required!",
            });
        }


        const userOrders = await orderModel.find({ "userInfo.userId": userId });

        if (!userOrders) {
            return res.status(404).send({
                success: false,
                message: 'User orders not found!',
            });
        }

        return res.status(200).send({
            success: true,
            message: `User Orders fetched successfully! TOTAL Orders: ${userOrders.length}`,
            userOrders,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in GET-USER_ORDERS API',
            error,
        })
    }
}

module.exports = { orderSaveController, fetchUserOrdersController }