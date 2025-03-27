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
                    <Text style={styles.artistStyle} numberOfLines={1}>{item.artistID}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceTag}>${item.price}</Text>
                </View>
            </View>
        </View>
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
        backgroundColor: '#eee',
        borderColor: 'rgba(100, 100, 100, 0.25)',
        borderWidth: 1
    },
    details: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    header: {
        alignContent: 'center',
        width: '60%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f9fafb',
    },
    artistStyle: {
        color: '#cbd5e1',
        marginTop: 5,
        fontSize: 14,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceTag: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4caf50',
    },
});

export default PurcahseCard;
