import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import FooterMenu from '@/components/Menus/FooteMenu.js'

const Home = ({ navigation }) => {
    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Text> Tabs </Text>

                <TouchableOpacity style={styles.btnStyle} onPress={() => { navigation.navigate('Login') }}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnStyle} onPress={() => { navigation.navigate('SignUp') }}>
                    <Text>SignUp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnStyle} onPress={() => { navigation.navigate('Profile') }}>
                    <Text>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnStyle} onPress={() => { navigation.navigate('EventList') }}>
                    <Text>EventList</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnStyle} onPress={() => { navigation.navigate('EventDetail') }}>
                    <Text>EventDetail</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnStyle} onPress={() => { navigation.navigate('ArtDetail') }}>
                    <Text>Art Detail</Text>
                </TouchableOpacity>
            </View>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10
    }
})
export default Home