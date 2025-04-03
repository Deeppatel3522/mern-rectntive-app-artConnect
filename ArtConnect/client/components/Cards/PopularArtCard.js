import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '@/context/authContext';
import { toggleFavorite } from '@/HelperFunc/ToggleFavorite.js'

const PopularArtCard = ({ art, navigation }) => {

    const { state, refreshUser } = useContext(AuthContext)
    const [isFavorite, setIsFavorite] = useState(() => {
        return state.user.favorites.some(fav => fav.postId.toString() === art._id.toString());
    });

    const handleFavorite = async () => {
        try {
            await toggleFavorite({ postId: art._id, userId: state?.user?._id });
            await refreshUser();
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };
    return (
        <TouchableOpacity style={styles.popularArtCard} onPress={() => navigation.navigate('ArtDetail', { artId: art._id })}>
            <Image source={{ uri: art.image[0] }} style={styles.popularArtImage} />


            <View style={styles.artistInfoOverlay}>
                <View style={styles.artistDetails}>
                    <Image source={{ uri: art.image[0] }} style={styles.artistImage} />
                    <View>
                        <Text
                            style={styles.artName}
                            numberOfLines={1}
                            ellipsizeMode="tail"> {art.name}
                        </Text>
                        <Text
                            style={styles.artistName}
                            numberOfLines={1}
                            ellipsizeMode="tail">{art.artistName ? art.artistName : art.artistID}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.heartIcon} onPress={handleFavorite}>
                <Ionicons name={`${isFavorite ? "heart" : "heart-outline"}`} size={20} color={`${isFavorite ? "#FF6B6B" : "lightgrey"}`} />
            </TouchableOpacity>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    popularArtCard: {
        width: 250,
        height: 160,
        overflow: 'hidden',
        marginRight: 10,
        borderRadius: 15,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        
    },
    popularArtImage: {
        width: '100%',
        height: '90%',
        borderRadius: 15,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'grey',
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 15,
        padding: 5,
    },
    artistInfoOverlay: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: 'rgba(60, 60, 60, 1)',
        borderRadius: 15,
    },
    artistDetails: {
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    artistImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 5,
    },
    artistName: {
        fontSize: 10,
        width: '80%',
        // color: 'gray',
        color: '#cbd5e1',
        overflow: 'hidden',
    },
    artName: {
        fontSize: 14,
        width: '80%',
        fontWeight: 'bold',
        overflow: 'hidden',
        // color: 'black'
        color: '#f9fafb' 
    },
    buyButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    buyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default PopularArtCard;
