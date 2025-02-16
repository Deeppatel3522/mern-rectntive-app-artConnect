const { default: mongoose } = require("mongoose");
const userModel = require("../models/userModel");

const toggleFavoriteArt = async (userId, artId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            return {
                success: false,
                message: 'User not found!',
            }
        }

        // convert string to Objcet-Id
        const artObjId = new mongoose.Types.ObjectId(artId);
        const isAlreadyFavorite = user.favorites.some(fav => fav.toString() === artObjId.toString());


        if (isAlreadyFavorite) {
            user.favorites = user.favorites.filter(fav => fav.toString() !== artObjId.toString())
        } else {
            user.favorites.push(artObjId)
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

module.exports = { toggleFavoriteArt }