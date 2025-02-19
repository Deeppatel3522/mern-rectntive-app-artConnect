import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Alert, Platform } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '@/context/authContext';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FooteMenu from '@/components/Menus/FooteMenu';

const Profile = () => {
  // Global state
  const [state, setState] = useContext(AuthContext);
  // extract values from "state"
  const { user, token } = state;

  // Local states
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [image, setImage] = useState(user?.image);
  const [type, setType] = useState(user?.type);
  const [loading, setLoading] = useState(false);

  // // upload image from gallery
  // const uploadImage = async () => {
  //   try {
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       setImage(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     alert(`Error uploading image: ${error}`);
  //   }
  // };

  // UPDATE Profile
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put('/auth/update-user', { name, password, email, type });
      setLoading(false);
      setState({ ...state, user: data?.updatedUser });
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const selectImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required", "Permission to access gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", {
        uri: uri,
        type: "image/jpeg",
        name: `${user?.name}-profile.jpg`,
      });
      formData.append("email", email);

      const response = await axios.put(`/auth/update-user-profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      // setState({ ...state, user: response?.user });
      setState((prevState) => ({ ...prevState, user: response?.user }));
      Alert.alert("Success", "Profile updated successfully!");
      setImage(response.data.user.image);

    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      Alert.alert("Error", "Failed to upload image");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>{name}'s Profile</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png" }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton} onPress={selectImage}>
              <FontAwesome5 name='camera' style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              editable={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter new password"
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>User Type</Text>
            <Picker
              selectedValue={type}
              onValueChange={setType}
              style={styles.picker}
            >
              <Picker.Item label="User" value="User" />
              <Picker.Item label="Artist" value="Artist" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.updateButtonText}>Update Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <FooteMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100, // Add extra padding at the bottom to account for the footer
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  cameraIcon: {
    fontSize: 20,
    color: '#333333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333',
  },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default Profile;
