import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ArtCard = ({ art, navigation }) => {
    if (!art) return null; // Prevent rendering errors


    const onPress = () => {
        if (navigation) {
            console.log(`Art ID: ${art._id}`);
            navigation.navigate('ArtDetail', { artId: art._id });
        } else {
            console.warn("Navigation is undefined!");
        }
    };


    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
            <Image
                source={{ uri: art.image[0] }}
                style={styles.artImage}
                resizeMode="cover"
            />
            <View style={styles.infoContainer}>
                <Text style={styles.artName} numberOfLines={1}>{art.name}</Text>
                <Text style={styles.artistName} numberOfLines={1}>by {art.artistName ? art.artistName : art.artistID}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.artPrice}> {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(art?.price || 0)}</Text>
                    {art.isAvailable ? (
                        <View style={styles.availabilityContainer}>
                            <Ionicons name="checkmark-circle" size={16} color="#4caf50" />
                            <Text style={styles.availabilityText}>Available</Text>
                        </View>
                    ) : (
                        <View style={styles.availabilityContainer}>
                            <Ionicons name="close-circle" size={16} color="#f44336" />
                            <Text style={styles.availabilityText}>Sold</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#ffffff',
        backgroundColor: 'rgba(100, 100, 100, 0.25)',
        borderRadius: 15,
        flexDirection: 'row',
        marginBottom: 20,
        overflow: 'hidden',
    },
    artImage: {
        width: 120,
        height: 120,
        backgroundColor: '#334155',
    },
    infoContainer: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    artName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#f9fafb',
    },
    artistName: {
        fontSize: 14,
        color: '#cbd5e1',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    artPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4caf50',
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    availabilityText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#cbd5e1',
    },
});

export default ArtCard;
