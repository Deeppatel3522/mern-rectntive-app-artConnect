import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const InvoiceCard = ({ order, navigation }) => {

    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Image source={{ uri: order.itemDetails.image[0] }} style={styles.img} />
                <View style={styles.infoContainer}>
                    <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail" >{order.itemDetails.name}</Text>
                    <Text style={styles.dateInfo} numberOfLines={1} ellipsizeMode='tail' >Order on {order.date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(100, 100, 100, 0.25)',
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        marginBottom: 5,
        borderRadius: 15
    },
    infoContainer: {
        flex: 1,
        padding: 10,
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    itemTitle: {
        color: '#f9fafb',
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: 1,
        marginBottom: 5,
        width: '80%',
    },
    dateInfo: {
        fontSize: 16,
        color: '#cbd5e1',
        fontWeight: 250,
        letterSpacing: 1,
        width: '80%',

    }

})

export default InvoiceCard