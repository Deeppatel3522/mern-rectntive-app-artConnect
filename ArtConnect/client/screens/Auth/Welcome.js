import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#323232', '#181818']}
                style={styles.background}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>ArtConnect</Text>
                    <Text style={styles.subtitle}>Discover. Connect. Create.</Text>
                    <Text style={styles.quote}>
                        "Every artist was first an amateur."
                    </Text>
                    <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.getStartedButtonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 24,
        color: '#e6e6e6',
        marginBottom: 40,
        textAlign: 'center',
    },
    quote: {
        fontSize: 18,
        color: '#656565',
        textAlign: 'center',
        marginBottom: 60,
        fontStyle: 'italic',
        paddingHorizontal: 20,
    },
    getStartedButton: {
        backgroundColor: '#4b4b4b',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    getStartedButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Welcome;
