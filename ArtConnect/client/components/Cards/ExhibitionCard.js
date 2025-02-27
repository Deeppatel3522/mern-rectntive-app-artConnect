import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '@/context/authContext';
import { toggleFavorite } from '@/HelperFunc/ToggleFavorite.js'

const ExhibitionCard = ({ event, navigation }) => {

    const { state } = useContext(AuthContext)
    const [isFavorite, setIsFavorite] = useState(() => {
        return state.user.favorites.some(fav => fav.postId.toString() === event._id.toString());
    });

    const handleFavorite = async () => {
        try {
            await toggleFavorite({ postId: event._id, userId: state?.user?._id });
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };
    return (
        <TouchableOpacity style={styles.exhibitionCard} onPress={() => navigation.navigate('EventDetail', { eventId: event._id })}>
            <Image source={{ uri: event.image[0] }} style={styles.exhibitionImage} />
            <View style={styles.details}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>{event.name}</Text>
                    <TouchableOpacity style={styles.heartIcon} onPress={handleFavorite}>
                        <Ionicons name={`${isFavorite ? "heart" : "heart-outline"}`} size={20} color={`${isFavorite ? "red" : "black"}`} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.description} numberOfLines={2}>{event.description}</Text>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.viewMoreButton}>
                        <Text style={styles.viewMoreText}>${event.price}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.addToCartButton}>
                        <Text style={styles.addToCartText}>Book Ticket</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    exhibitionCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    exhibitionImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    details: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        width: '75%',
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 12,
        width: '75%',
        color: 'gray',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewMoreButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        fontSize: 12
    },
    viewMoreText: {
        color: 'blue',
        fontSize: 12,
    },
    addToCartButton: {
        backgroundColor: 'red',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addToCartText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
});

export default ExhibitionCard;
