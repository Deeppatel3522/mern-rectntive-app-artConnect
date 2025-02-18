import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

// context
const PostContext = createContext()

const PostProvider = ({ children }) => {
    // state
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [arts, setArts] = useState([])
    const [requiredArt, setRequiredArt] = useState()
    const [requiredEvent, setRequiredEvent] = useState()

    const getAllEvents = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/event/fetch-all-event');
            setLoading(false);
            setEvents(data?.events);
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

    const fetchArt = async (artId) => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/art/fetch-img/${artId}`);
            setLoading(false);
            setRequiredArt(data?.art);
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
        <PostContext.Provider value={{ events, setEvents, getAllEvents, arts, setArts, getAllArts, fetchArt, requiredArt, setRequiredArt, fetchEvent, requiredEvent, setRequiredEvent }}>
            {children}
        </PostContext.Provider>
    )
}


export { PostContext, PostProvider }