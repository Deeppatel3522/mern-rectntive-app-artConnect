import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AuthContext } from '@/context/authContext'

const Login = ({ navigation }) => {

  // global states
  const [state, setState] = useContext(AuthContext)
  console.log(state);

  // states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // functions
  const loginFunction = async () => {
    try {
      setLoading(true)
      if (!email || !password) {
        Alert.alert("Please Fill All Fields")
        setLoading(false)
        return
      }
      setLoading(false)
      const { data } = await axios.post('/auth/login', { email, password })
      setState(data)
      await AsyncStorage.setItem('@auth', JSON.stringify(data));
      alert(data && data.message)
      navigation.navigate('Profile')
      console.log(`Login Data=> ${email} ${password}`)
      setEmail('')
      setPassword('')

    } catch (err) {
      alert(err.response.data.message)
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>

      <TextInput placeholder='email' value={email} onChangeText={(text) => setEmail(text)} />
      <TextInput placeholder='password' value={password} onChangeText={(text) => setPassword(text)} />

      <TouchableOpacity style={{ borderWidth: 1, padding: 10 }} onPress={loginFunction}>
        <Text>Login</Text>
      </TouchableOpacity>
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