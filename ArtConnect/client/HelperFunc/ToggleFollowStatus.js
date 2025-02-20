import axios from "axios";

const toggleFollowStatus = async ({ CurrentUserId, userId }) => {
    try {
        console.log(CurrentUserId, userId);

        if (!CurrentUserId || !userId) {
            console.log('Provide CurrentUserId or userId.');
            alert('Id required!')
            return;
        }

        const { data } = await axios.put('/auth/update-user-following', { CurrentUserId, userId });
        alert('SUCCESS')
    } catch (error) {
        alert(error.response?.data?.message)
    }
}

export { toggleFollowStatus }