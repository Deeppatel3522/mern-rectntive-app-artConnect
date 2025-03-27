import ArtCard from '@/components/Cards/ArtCard';
import EventCard from '@/components/Cards/EventCard';
import FooterMenu from '@/components/Menus/FooteMenu';
import { AuthContext } from '@/context/authContext';
import { PostContext } from '@/context/postContext';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

const UserPosts = ({ navigation }) => {

    const { state } = useContext(AuthContext);
    const { myArts, getAllArtsByUser, myEvents, getAllEventsByUser } = useContext(PostContext);
    const [posts, setPosts] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    const handleGetAllPosts = () => {
        getAllArtsByUser(state?.user?._id)
        getAllEventsByUser(state?.user?._id)

        const artsWithType = myArts.map(art => ({ ...art, type: 'art' }));
        const eventsWithType = myEvents.map(event => ({ ...event, type: 'event' }));

        // Merge the arrays
        let combinedFavorites = [...artsWithType, ...eventsWithType];

        // Fisher-Yates Shuffle Algorithm
        for (let i = combinedFavorites.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combinedFavorites[i], combinedFavorites[j]] = [combinedFavorites[j], combinedFavorites[i]];
        }
        setPosts(combinedFavorites)
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        handleGetAllPosts();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        handleGetAllPosts()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollViewStyle}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <Text style={styles.header}>Your Posts</Text>


                    {posts.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No Posts yet! Start adding some.</Text>
                        </View>
                    ) : (
                        posts.map((item, index) =>
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
    },
    scrollViewStyle: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 15,
        paddingBottom: 25,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#fff',
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
    }
});
export default UserPosts