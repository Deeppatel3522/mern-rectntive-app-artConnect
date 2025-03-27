import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '@/context/authContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const { state, setState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginFunction = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Error", "Please fill all fields");
        setLoading(false);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert("Error", "Please enter a valid email address");
        setLoading(false);
        return;
      }
      const { data } = await axios.post('/auth/login', { email, password });
      setState(data);
      await AsyncStorage.setItem('@auth', JSON.stringify(data));
      Alert.alert("Success", data.message);
      navigation.navigate('Profile');
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
          <Ionicons name="lock-closed" size={80} color="#ffffff" />
          <Text style={styles.logoText}>Login</Text>
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
          style={styles.loginButton}
          onPress={loginFunction}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#4c669f" />
          ) : (
            <Text style={styles.loginButtonText}>{loading ? "Loading..." : "Login"}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpContainer}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
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
  loginButton: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    width: '100%',
  },
  loginButtonText: {
    color: '#4c669f',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpContainer: {
    marginTop: 15,
  },
  signUpText: {
    color: '#ffffff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default Login;
