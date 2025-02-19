import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                source={{ uri: '' }} // place background img url
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <Text style={styles.title}>Dope Art</Text>
                    <Text style={styles.subtitle}>Collections</Text>
                    <Text style={styles.quote}>
                        “Creativity is intelligence having fun.”
                        {'\n'}
                        - Albert Einstein
                    </Text>
                    <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.getStartedButtonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(177, 180, 120, 0.7)', // Adjust transparency as needed
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#D41A45',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 24,
        color: '#000',
        marginBottom: 20,
    },
    quote: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginBottom: 40,
        fontStyle: 'italic',
    },
    getStartedButton: {
        backgroundColor: '#4A4A5A',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 15,
    },
    getStartedButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Welcome;
