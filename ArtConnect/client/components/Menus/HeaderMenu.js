import { View, TouchableOpacity, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/authContext.js'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HeaderMenu = () => {
    const { state, setState } = useContext(AuthContext);

    // function 
    const logoutFunction = async () => {
        setState({ user: null, token: "" })
        await AsyncStorage.removeItem('@auth')
        alert('Logout Successfully')
    };


    return (
        <View>
            <TouchableOpacity onPress={logoutFunction}>
                <FontAwesome5
                    name="sign-out-alt"
                    style={styles.iconStyle}
                    color={"red"}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    iconStyle: {
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 25,
    }
})

export default HeaderMenu