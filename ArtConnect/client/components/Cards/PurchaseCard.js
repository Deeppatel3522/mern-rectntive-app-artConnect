import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '@/context/authContext';

const PurcahseCard = ({ item }) => {

    const { state } = useContext(AuthContext)

    return (
        <View style={styles.exhibitionCard} >
            <Image source={{ uri: item.image[0] }} style={styles.exhibitionImage} />
            <View style={styles.details}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.title} numberOfLines={1}>{item.artistID}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.viewMoreText}>${item.price}</Text>
                </View>
            </View>
        </View>
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
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    header: {
        alignContent: 'center',
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
        fontSize: 16,
        fontWeight: 'bold'
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

export default PurcahseCard;
