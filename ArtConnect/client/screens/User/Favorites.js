import { View, Text, ScrollView, RefreshControl, Platform, Button } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ArtCard from '@/components/Cards/ArtCard';
import { AuthContext } from '@/context/authContext';
import EventCard from '@/components/Cards/EventCard';
import DateTimePicker from '@react-native-community/datetimepicker';

const Favorites = ({ navigation }) => {
    const { loading: authLoading, state, fetchUserFavorites } = useContext(AuthContext);
    const [favoriteArts, setFavoriteArts] = useState([]);
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // datetime
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) setDate(selectedDate);
    };

    const onChangeTime = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) setTime(selectedTime);
    };

    const getFavorites = async () => {
        if (favoriteArts.length === 0 || favoriteEvents.length === 0) {
            const { arts, events } = await fetchUserFavorites(state.user._id);
            setFavoriteArts(arts);
            setFavoriteEvents(events);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await getFavorites();
            setRefreshing(false);
            console.log('Favorite page refreshing done.');
        } catch (error) {
            console.error('Error refreshing favorite page:', error);
            setRefreshing(false);
        }
    }, [favoriteArts.length, favoriteEvents.length]);

    useEffect(() => {
        if (!authLoading) {
            console.log('Favorites Screen');
            console.log(state.user.name);
            console.log('Favorites:', state.user.favorites.length);
            getFavorites();
        }
    }, [authLoading]);

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: 'gray' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Text>Favorites</Text>
            <Text>Total Arts: {favoriteArts.length}</Text>
            <Text>Total Events: {favoriteEvents.length}</Text>

            {favoriteArts.map((art, index) => (
                <ArtCard key={index} art={art} navigation={navigation} />
            ))}

            {favoriteEvents.map((event, index) => (
                <EventCard key={index} event={event} navigation={navigation} />
            ))}

            <Button onPress={() => setShowDatePicker(true)} title="Show Date Picker" />
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                    minimumDate={new Date()}
                />
            )}

            <Button onPress={() => setShowTimePicker(true)} title="Show Time Picker" />
            {showTimePicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={onChangeTime}
                    minimumDate={new Date().getDate() + 1}
                />
            )}

            <Text>Date: {date.toLocaleDateString()}</Text>
            <Text>Time: {time.toLocaleTimeString()}</Text>
            
        </ScrollView>
    );
};

export default Favorites;
