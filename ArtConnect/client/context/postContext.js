import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './authContext'

// context
const PostContext = createContext()


const PostProvider = ({ children }) => {
    const { loading: authLoading, state, requiredUser, fetchUser } = useContext(AuthContext)

    // state
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [arts, setArts] = useState([])
    const [myEvents, setMyEvents] = useState([])
    const [myArts, setMyArts] = useState([])


    const getAllEvents = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/event/fetch-all-event');
            setEvents(data?.events);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }

    const getAllEventsByUser = async (currentUserID) => {
        try {
            setLoading(true)
            const { data } = await axios.post('/event/fetch-all-event-by-user', { artistID: currentUserID.toString() });
            setMyEvents(data?.events);
            setLoading(false);
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

    const getAllArtsByUser = async (currentUserID) => {
        try {
            setLoading(true)
            const { data } = await axios.post('/art/fetch-all-img-by-user', { artistID: currentUserID });
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
            return data?.event;
        } catch (error) {
            console.log(error);
            setLoading(false)
            return error;
        }
    }


    // initial events 
    useEffect(() => {
        if (!authLoading && state?.user) {
            const getPosts = async () => {
                await getAllArts()
                await getAllEvents()
            }
            getPosts()
        }
    }, [authLoading])

    useEffect(() => {
        if (!authLoading && state?.user) {
            const getAllPostsByUser = async () => {
                await getAllArtsByUser(state?.user?._id)
                await getAllEventsByUser(state?.user?._id)
            }
            getAllPostsByUser()
        }
    }, [authLoading])

    useEffect(() => {
        setLoading(true)
        // console.log("Total Arts: ", arts.length);
        // console.log("Total Evetns: ", events.length);
        setLoading(false)
    }, [arts, events])

    return (
        <PostContext.Provider value={{ loading, events, myEvents, setEvents, getAllEvents, getAllEventsByUser, arts, myArts, setArts, getAllArts, getAllArtsByUser, fetchEvent, fetchArt }}>
            {children}
        </PostContext.Provider>
    )
}


export { PostContext, PostProvider }