import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AuthContext } from '@/context/authContext'

const FooteMenu = () => {

    // global state
    const [state, setState] = useContext(AuthContext);
    // function 
    const logoutFunction = async () => {
        console.log("log out button clicked");

        setState({ user: null, token: "" })
        await AsyncStorage.removeItem('@auth')
        alert('Logout Successfully')
    };

    // hooks
    const navigation = useNavigation()
    const route = useRoute()


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome5 name='home' style={styles.iconStyle} color={route.name === 'Home' && 'blue'} />
                <Text>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('EventList')}>
                <FontAwesome5 name='plus-square' style={styles.iconStyle} color={route.name === 'Post' && 'blue'} />
                <Text>Events</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ArtList')}>
                <FontAwesome5 name='list' style={styles.iconStyle} color={route.name === 'MyPosts' && 'blue'} />
                <Text>Arts</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <FontAwesome5 name='user' style={styles.iconStyle} color={route.name === 'Account' && 'blue'} />
                <Text>Account</Text>
            </TouchableOpacity>

            {/* // LOG OUT BUTTON  */}
            <TouchableOpacity onPress={logoutFunction}>
                <FontAwesome5 name='sign-out-alt' style={styles.iconStyle} color='tomato' />
                <Text>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between'
    },
    iconStyle: {
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 25,
    }
})

export default FooteMenu