import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Login = () => {
    return (
        <View style={styles.container}>
          <Text>Login</Text>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Login