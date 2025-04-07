import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { AuthContext } from '@/context/authContext';
import ArtCard from '@/components/Cards/ArtCard';
import EventCard from '@/components/Cards/EventCard';
import FooterMenu from '@/components/Menus/FooteMenu';

const Favorites = ({ navigation }) => {
    const { loading: authLoading, state, fetchUserFavorites } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const getFavorites = async () => {
        try {
            const { arts, events } = await fetchUserFavorites(state.user._id);

            // Merge Arts & Events into a Single Array
            let combinedFavorites = [
                ...arts.map((art) => ({ ...art, type: "art" })),
                ...events.map((event) => ({ ...event, type: "event" }))
            ];

            // Fisher-Yates Shuffle Algorithm
            for (let i = combinedFavorites.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [combinedFavorites[i], combinedFavorites[j]] = [combinedFavorites[j], combinedFavorites[i]];
            }

            setFavorites(combinedFavorites);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    // Pull-to-Refresh
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getFavorites();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        getFavorites();
        console.log('Favorites Screen Loaded');
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>Your Favorites</Text>
                <ScrollView
                    style={styles.scrollViewStyle}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >

                    {favorites.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No favorites yet! Start adding some.</Text>
                        </View>
                    ) : (
                        favorites.map((item, index) =>
                            item.type === "art" ? (
                                <ArtCard key={index} art={item} navigation={navigation} />
                            ) : (
                                <EventCard key={index} event={item} navigation={navigation} />
                            )
                        )
                    )}
                </ScrollView>
                <FooterMenu />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
    },
    container: {
        flex: 1,
        paddingTop: 20,
    },
    scrollViewStyle: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
        paddingBottom: 25,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        paddingVertical: 5,
        letterSpacing: 1.5,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginBottom: 5,
        overflow: 'hidden',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
    },
    footer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: '#ffffff',
        // elevation: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: -2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // height: 60,
    },
});

export default Favorites;

