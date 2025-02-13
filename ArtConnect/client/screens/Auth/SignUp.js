import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'

const SignUp = ({ navigation }) => {

  // states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // functions
  const registrationFunction = async () => {
    try {
      setLoading(true)
      if (!name || !email || !password) {
        Alert.alert("Please Fill All Fields")
        setLoading(false)
        return
      }

      setLoading(false)
      const { data } = await axios.post('/auth/register', { name, email, password })
      alert(data && data.message)
      navigation.navigate("Login")
      console.log(`Register Data=> ${name} ${email} ${password}`)
      setName('')
      setEmail('')
      setPassword('')

    } catch (err) {
      alert(err.response.data.message)
      setLoading(false)
      console.log(err)
    }
  }


  return (
    <View>
      <Text>SignUp</Text>

      <TextInput placeholder='name' value={name} onChangeText={(text) => setName(text)} />
      <TextInput placeholder='email' value={email} onChangeText={(text) => setEmail(text)} />
      <TextInput placeholder='password' value={password} onChangeText={(text) => setPassword(text)} />

      <TouchableOpacity style={{ borderWidth: 1, padding: 10 }} onPress={registrationFunction}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp