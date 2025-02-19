import axios from "axios";

const toggleFavorite = async ({ postId, userId }) => {
    try {
        if (!postId || !userId) {
            console.log('Provide userId or PostId');
            alert('Id required!')
            return;
        }

        const { data } = await axios.put('/auth/update-user-favorites', { userId, postId });
        alert('SUCCESS')
    } catch (error) {
        alert(error.response?.data?.message)
    }
}

export { toggleFavorite }