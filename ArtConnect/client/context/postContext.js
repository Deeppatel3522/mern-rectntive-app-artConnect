import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './authContext'

// context
const PostContext = createContext()


const PostProvider = ({ children }) => {
    const { state, requiredUser, fetchUser } = useContext(AuthContext)
    // state
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [arts, setArts] = useState([])
    const [myEvents, setMyEvents] = useState([])
    const [myArts, setMyArts] = useState([])
    const [requiredArt, setRequiredArt] = useState()
    const [requiredEvent, setRequiredEvent] = useState()
    const [isFavorite, setIsFavorite] = useState(false)

    const currentUserID = state?.user?._id

    if (!currentUserID) {
        console.log("Current USer ID not available: ", currentUserID);
    }
    console.log("Current USer ID is available: ", currentUserID);

    const getAllEvents = async () => {
        try {
            console.log(state?.User?._id);
            setLoading(true)
            const { data } = await axios.get('/event/fetch-all-event');
            setLoading(false);
            setEvents(data?.events);
        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }

    const getAllEventsByUser = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/event/fetch-all-event-by-user', { artistID: currentUserID.toString() });
            setLoading(false);
            setMyEvents(data?.events);
        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }
    const getAllArts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/art/fetch-all-img');
            setLoading(false);
            setArts(data?.arts);
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    const getAllArtsByUser = async () => {
        try {
            console.log(currentUserID);
            setLoading(true)
            const { data } = await axios.get('/art/fetch-all-img-by-user', { artistID: currentUserID.toString() });
            setLoading(false);
            setMyArts(data?.arts);
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const fetchArt = async (artId) => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/art/fetch-img/${artId}`);
            setLoading(false);
            setRequiredArt(data?.art);

            // fetch new data of user
            const result = await fetchUser(state?.user?._id)
            const favoriteStatus = result?.favorites.some(fav => fav.toString() === data?.art?._id.toString());
            setIsFavorite(favoriteStatus)
            console.log("=====> Update: ", isFavorite);

            return data?.art;
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const fetchEvent = async (eventId) => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/event/fetch-event/${eventId}`);
            setLoading(false);
            setRequiredEvent(data?.event);
            const favoriteStatus = state.user.favorites.some(fav => fav.toString() === data?.event?._id.toString());
            setIsFavorite(favoriteStatus)
            return data?.event;
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    // initial events 

    useEffect(() => {
        getAllEvents()
        getAllArts()
    }, [])

    return (
        <PostContext.Provider value={{ events, myEvents, setEvents, getAllEvents, getAllEventsByUser, arts, myArts, setArts, getAllArts, getAllArtsByUser, fetchArt, requiredArt, setRequiredArt, fetchEvent, requiredEvent, setRequiredEvent }}>
            {children}
        </PostContext.Provider>
    )
}


export { PostContext, PostProvider }