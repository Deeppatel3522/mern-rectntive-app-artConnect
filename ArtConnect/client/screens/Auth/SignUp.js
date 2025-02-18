import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const registrationFunction = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Error", "Please fill all fields");
        setLoading(false);
        return;
      }

      const { data } = await axios.post('/auth/register', { name, email, password });
      Alert.alert("Success", data.message);
      navigation.navigate("Login");
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || "An error occurred");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#333333', '#434343', '#1c1c1c']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <View style={styles.logoContainer}>
          <Ionicons name="person-add" size={80} color="#ffffff" />
          <Text style={styles.logoText}>Sign Up</Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="#ffffff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#cccccc"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="#ffffff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#cccccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="key" size={24} color="#ffffff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#cccccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={registrationFunction}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#4c669f" />
          ) : (
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    width: '100%',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    paddingVertical: 15,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    width: '100%',
  },
  signUpButtonText: {
    color: '#4c669f',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginContainer: {
    marginTop: 15,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default SignUp;
