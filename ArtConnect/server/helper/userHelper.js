const { default: mongoose } = require("mongoose");
const userModel = require("../models/userModel");
const ArtModel = require("../models/artModel.js")
const EventModel = require("../models/eventModel.js")

const toggleFavoriteArt = async (userId, artId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            return {
                success: false,
                message: 'User not found!',
            }
        }

        // Check if artId belongs to Art or Event
        const isArt = await ArtModel.exists({ _id: artId });
        const isEvent = await EventModel.exists({ _id: artId });

        if (!isArt && !isEvent) {
            return {
                success: false,
                message: 'The provided ID does not belong to either an Art or Event!',
            };
        }

        const type = isArt ? 'Art' : 'Event';
        

        // convert string to Objcet-Id
        const artObjId = new mongoose.Types.ObjectId(artId);
        const isAlreadyFavorite = user.favorites.some(fav => fav.postId.toString() === artObjId.toString());


        if (isAlreadyFavorite) {
            user.favorites = user.favorites.filter(fav => fav.postId.toString() !== artObjId.toString())
        } else {
            user.favorites.push({ postId: artId, type })
        }

        const updatedUser = await user.save();

        // const list = updatedUser.favorites

        return {
            success: true,
            message: 'Favorite list updated!',
            updatedUser
        }
    } catch (error) {
        console.log(`ERROR in toggle-Fvorite-Art: ${error}`);
        return {
            success: false,
            message: 'ERROR in toggle-Fvorite-Art API',
            error
        }
    }
}

const toggleFollowing = async (CurrentUserId, userId) => {
    try {
        const user = await userModel.findById(CurrentUserId)

        if (!user) {
            return {
                success: false,
                message: 'User not found!',
            }
        }

        // convert string to Objcet-Id (for person whome user gonna follow)
        const userObjId = new mongoose.Types.ObjectId(userId);
        const isAlreadyFollowed = user.following.some(fav => fav.toString() === userObjId.toString());


        if (isAlreadyFollowed) {
            user.following = user.following.filter(fav => fav.toString() !== userObjId.toString())
        } else {
            user.following.push(userObjId)
        }

        const updatedUser = await user.save();

        // const list = updatedUser.favorites

        return {
            success: true,
            message: 'Following list updated!',
            updatedUser
        }
    } catch (error) {
        console.log(`ERROR in toggle-Following-Status: ${error}`);
        return {
            success: false,
            message: 'ERROR in toggle-Following-Status API',
            error
        }
    }
}

module.exports = { toggleFavoriteArt, toggleFollowing }