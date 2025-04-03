import axios from "axios";

const toggleFollowStatus = async ({ CurrentUserId, userId, userName }) => {
    try {
        console.log(CurrentUserId, userId, userName);

        if (!CurrentUserId || !userId || !userName) {
            console.log('Provide CurrentUserId or userId.');
            alert('Id required!')
            return;
        }

        const { data } = await axios.put('/auth/update-user-following', { CurrentUserId, userId, userName });
        alert('SUCCESS')
    } catch (error) {
        alert(error.response?.data?.message)
    }
}

export { toggleFollowStatus }