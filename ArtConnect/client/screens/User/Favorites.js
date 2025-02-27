import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ArtCard from '@/components/Cards/ArtCard'
import { AuthContext } from '@/context/authContext'
import { PostContext } from '@/context/postContext'
import EventCard from '@/components/Cards/EventCard'

const Favorites = ({ navigation }) => {

    const { loading: authLoading, state, requiredUser, fetchUser, fetchUserFavorites } = useContext(AuthContext)
    const { fetchEvent, fetchArt } = useContext(PostContext);
    const [favoriteArts, setFavoriteArts] = useState([]);
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const getFvorites = async () => {
        if (favoriteArts.length === 0 || favoriteEvents.length === 0) {
            const { arts, events } = await fetchUserFavorites(state.user._id)
            setFavoriteArts(arts)
            setFavoriteEvents(events)
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await getFvorites()
            setRefreshing(false)
            console.log('Favorite page Refreshing done.');
        } catch (error) {
            console.error("Error refreshing favorite page:", error);
            setRefreshing(false);
        }
    }, [])

    useEffect(() => {
        if (!authLoading) {
            console.log("Favorites Screen");

            console.log(state.user.name);
            console.log("Favorites: ", state.user.favorites.length);
            getFvorites()
        }
    }, [authLoading])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'gray' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Text>Favorites</Text>
            <Text>Total: {favoriteArts.length}</Text>
            <Text>Total: {favoriteEvents.length}</Text>
            {favoriteArts.map((art, index) => (
                <ArtCard key={index} art={art} navigation={navigation} />
            ))}

            {favoriteEvents.map((event, index) => (
                <EventCard key={index} event={event} navigation={navigation} />
            ))}

        </ScrollView>
    )
}

export default Favorites