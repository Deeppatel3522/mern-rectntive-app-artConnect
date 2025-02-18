import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const EventCard = ({ event, navigation }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EventDetail', { eventId: event._id })}
        >
            <Image source={{ uri: event.image[0] }} style={styles.image} />
            <View style={styles.overlay}>
                <Text style={styles.price}>${event.price}</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>{event.name}</Text>
                <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text style={styles.date}>{formatDate(event.date)}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={16} color="#666" />
                    <Text style={styles.location} numberOfLines={1}>{event.location}</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>{event.category}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookButton}>
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 8,
        borderRadius: 20,
    },
    price: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    details: {
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    date: {
        marginLeft: 5,
        color: '#666',
        fontSize: 14,
    },
    location: {
        marginLeft: 5,
        color: '#666',
        fontSize: 14,
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    categoryContainer: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    category: {
        color: '#4A90E2',
        fontWeight: 'bold',
    },
    bookButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    bookButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default EventCard;
