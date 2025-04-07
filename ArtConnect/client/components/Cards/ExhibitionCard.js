import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '@/context/authContext';
import { toggleFavorite } from '@/HelperFunc/ToggleFavorite.js'

const ExhibitionCard = ({ event, navigation }) => {

    const { state, refreshUser } = useContext(AuthContext)
    const [isFavorite, setIsFavorite] = useState(() => {
        return state.user.favorites.some(fav => fav.postId.toString() === event._id.toString());
    });

    const handleFavorite = async () => {
        try {
            await toggleFavorite({ postId: event._id, userId: state?.user?._id });
            await refreshUser();
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
                        <Ionicons name={`${isFavorite ? "heart" : "heart-outline"}`} size={20} color={`${isFavorite ? "#FF6B6B" : "lightgrey"}`} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.description} numberOfLines={2}>{event.description}</Text>
                <View style={styles.footer}>
                    <View style={styles.priceTag}>
                        <Text style={styles.priceTagText}> {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(event?.price || 0)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    exhibitionCard: {
        backgroundColor: 'rgba(100, 100, 100, 0.25)',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    exhibitionImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: '#334155',
        borderColor: 'gray',
        borderWidth: 1
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
        color: '#f9fafb',
    },
    description: {
        fontSize: 12,
        width: '75%',
        // color: 'gray',
        color: '#cbd5e1',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2
    },
    priceTag: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#334155',
        fontSize: 12
    },
    priceTagText: {
        color: '#cbd5e1',
        fontSize: 14,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
});

export default ExhibitionCard;
