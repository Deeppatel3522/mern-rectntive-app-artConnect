import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Alert, Platform, Share, Modal } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '@/context/authContext';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FooteMenu from '@/components/Menus/FooteMenu';
import FooterMenu from '@/components/Menus/FooteMenu';
import { toggleFollowStatus } from '@/HelperFunc/ToggleFollowStatus';

const Profile = ({ navigation }) => {
  // Global state
  const { state, setState, fetchUserFollowings, refreshUser } = useContext(AuthContext);
  // extract values from "state"
  const { user, token } = state;

  // Local states
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [image, setImage] = useState(user?.image);
  const [type, setType] = useState(user?.type);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [followingModalVisible, setFollowingModalVisible] = useState(false);
  const [userFollowings, setUserFollowings] = useState([])

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

  // Select Profile Image
  const selectImage = async () => {
    // Request permission to access the media library
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    if (cameraStatus !== "granted" || galleryStatus !== "granted") {
      Alert.alert(
        "Permission Required",
        "We need access to your camera and gallery. Please enable permissions in settings.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings", onPress: () => {
              ImagePicker.requestMediaLibraryPermissionsAsync()
              ImagePicker.requestCameraPermissionsAsync()
            }
          }
        ]
      );
      return;
    }

    // get image from the library
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

  // Update Profile Image
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

  // SHARE
  const shareInfo = async () => {
    try {
      const shareContent = {
        title: 'Youtube',
        message: `Check out this cool app! User: ${user.image} (${user.email}) - Type: ${user.type}\nhttps://www.youtube.com/`,
        url: 'https://www.youtube.com/'
      };

      const shareOptions = {
        dialogTitle: 'Share via'
      };

      // The correct syntax is to pass two separate arguments
      const result = await Share.share(shareContent, shareOptions);

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  //LogOut
  const logoutFunction = async () => {
    setState({ user: null, token: "" });
    await AsyncStorage.removeItem('@auth');
    alert('Logout Successfully');
  };

  // handleFollowing toggle
  const handleFollow = async (currentUserId, userID) => {
    try {
      console.log(toggleFollowStatus);
      await toggleFollowStatus({ CurrentUserId: currentUserId, userId: userID });
      console.log("Follow status updated successfully!");
      await getlUserFollowings()
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  // Followings
  const getlUserFollowings = async () => {
    const { followings } = await fetchUserFollowings(state?.user?._id)
    setUserFollowings(followings)
    console.log(`Total number of User followings: ${followings.length ? followings.length : 0}`,);
  }

  useEffect(() => {
    getlUserFollowings()
    console.log(`Total number of User followings: ${userFollowings.length ? userFollowings.length : 0}`,);
  }, [])

  //   return (
  //     <SafeAreaView style={styles.safeArea}>
  //       <ScrollView style={styles.scrollView}>
  //         <View style={styles.profileContainer}>
  //           <Text style={styles.title}>{name}'s Profile</Text>
  //           <View style={styles.imageContainer}>
  //             <Image
  //               source={{ uri: image || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png" }}
  //               style={styles.profileImage}
  //             />
  //             <TouchableOpacity style={styles.cameraButton} onPress={selectImage}>
  //               <FontAwesome5 name='camera' style={styles.cameraIcon} />
  //             </TouchableOpacity>
  //           </View>

  //           <View style={styles.inputContainer}>
  //             <Text style={styles.label}>Name</Text>
  //             <TextInput
  //               style={styles.input}
  //               value={name}
  //               onChangeText={setName}
  //               placeholder="Enter your name"
  //             />
  //           </View>

  //           <View style={styles.inputContainer}>
  //             <Text style={styles.label}>Email</Text>
  //             <TextInput
  //               style={styles.input}
  //               value={email}
  //               editable={false}
  //             />
  //           </View>

  //           <View style={styles.inputContainer}>
  //             <Text style={styles.label}>Password</Text>
  //             <TextInput
  //               style={styles.input}
  //               value={password}
  //               onChangeText={setPassword}
  //               placeholder="Enter new password"
  //               secureTextEntry
  //             />
  //           </View>

  //           <View style={styles.inputContainer}>
  //             <Text style={styles.label}>User Type</Text>
  //             <Picker
  //               selectedValue={type}
  //               onValueChange={setType}
  //               style={styles.picker}
  //             >
  //               <Picker.Item label="User" value="User" />
  //               <Picker.Item label="Artist" value="Artist" />
  //             </Picker>
  //           </View>

  //           <TouchableOpacity style={styles.updateButton} onPress={() => { navigation.navigate('Favorites') }} disabled={loading}>
  //             {loading ? (
  //               <ActivityIndicator color="#ffffff" />
  //             ) : (
  //               <Text style={styles.updateButtonText}>Favorites</Text>
  //             )}
  //           </TouchableOpacity>

  //           <TouchableOpacity style={styles.updateButton} onPress={() => { navigation.navigate('UserPosts') }} disabled={loading}>
  //             <Text style={styles.updateButtonText}>User Posts</Text>
  //           </TouchableOpacity>

  //           <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} disabled={loading}>
  //             {loading ? (
  //               <ActivityIndicator color="#ffffff" />
  //             ) : (
  //               <Text style={styles.updateButtonText}>Update Profile</Text>
  //             )}
  //           </TouchableOpacity>

  //           <TouchableOpacity style={styles.updateButton} onPress={logoutFunction}>
  //             <Text style={styles.updateButtonText}>Log Out</Text>
  //           </TouchableOpacity>

  //         </View>
  //       </ScrollView>
  //         <FooteMenu />
  //     </SafeAreaView>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   safeArea: {
  //     flex: 1,
  //     backgroundColor: '#121212',
  //   },
  //   scrollView: {
  //     flex: 1,
  //   },
  //   profileContainer: {
  //     alignItems: 'center',
  //     padding: 20,
  //     paddingBottom: 100, // Add extra padding at the bottom to account for the footer
  //   },
  //   title: {
  //     fontSize: 24,
  //     fontWeight: 'bold',
  //     marginBottom: 20,
  //     color: '#f9fafb',
  //   },
  //   imageContainer: {
  //     position: 'relative',
  //     marginBottom: 20,
  //   },
  //   profileImage: {
  //     width: 150,
  //     height: 150,
  //     borderRadius: 75,
  //     borderWidth: 3,
  //     borderColor: '#ffffff',
  //   },
  //   cameraButton: {
  //     position: 'absolute',
  //     bottom: 0,
  //     right: 0,
  //     backgroundColor: '#ffffff',
  //     borderRadius: 20,
  //     padding: 10,
  //     elevation: 5,
  //   },
  //   cameraIcon: {
  //     fontSize: 20,
  //     color: '#333333',
  //   },
  //   inputContainer: {
  //     width: '100%',
  //     marginBottom: 15,
  //   },
  //   label: {
  //     fontSize: 16,
  //     marginBottom: 5,
  //     color: '#f9fafb',
  //   },
  //   input: {
  //     backgroundColor: '#ffffff',
  //     paddingHorizontal: 15,
  //     paddingVertical: 10,
  //     borderRadius: 5,
  //     fontSize: 16,
  //   },
  //   picker: {
  //     backgroundColor: '#ffffff',
  //     borderRadius: 5,
  //   },
  //   updateButton: {
  //     backgroundColor: '#4a90e2',
  //     paddingVertical: 12,
  //     paddingHorizontal: 30,
  //     borderRadius: 25,
  //     marginTop: 20,
  //   },
  //   updateButtonText: {
  //     color: '#ffffff',
  //     fontSize: 18,
  //     fontWeight: 'bold',
  //   },
  // });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{user?.name}'s Profile</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: user?.image }} style={styles.profileImage} />
          <TouchableOpacity style={styles.cameraButton} onPress={selectImage}>
            <FontAwesome5 name='camera' style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.infoText}>Email: {user?.email}</Text>
        <Text style={styles.infoText}>Type: {user?.type}</Text>
        <Text style={styles.title}>Following: {userFollowings.length}</Text>
        {/* <Text style={styles.infoText}>Followings: {`${userFollowings.length}`}</Text> */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.buttonText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setFollowingModalVisible(true)}>
            <Text style={styles.buttonText}>Followings</Text>
          </TouchableOpacity>
          {user?.type === 'Artist' && (
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserPosts')}>
              <Text style={styles.buttonText}>My Posts</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <FooterMenu />

      {/* Update Profile Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Profile</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="New Password" secureTextEntry />
            <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
              <Picker.Item label="User" value="User" />
              <Picker.Item label="Artist" value="Artist" />
            </Picker>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Following List Modal */}
      <Modal animationType="slide" transparent={true} visible={followingModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Following</Text>

            {/* Map through userFollowings */}
            {userFollowings.length > 0 ? (
              userFollowings.map((user, index) => (
                <View style={{ flexDirection: 'row', gap: 20, borderWidth: 1, alignItems: 'center', padding: 5, marginBottom: 5 }}>
                  <Text key={index} >{user}</Text>
                  <TouchableOpacity style={{ padding: 5, backgroundColor: 'tomato', width: 80, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => { handleFollow(state.user._id, user) }}>
                    <Text style={styles.buttonText}>Following</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noFollowingsText}>No followings yet.</Text>
            )}
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setFollowingModalVisible(false)}>
              <Text style={styles.buttonText}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212'
  },
  container: {
    alignItems: 'center',
    padding: 20
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(100,100,100, 0.8)',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  cameraIcon: {
    fontSize: 20,
    color: 'rgba(200,200,200, 0.9)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 20
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15
  },

  infoText: {
    fontSize: 16,
    color: '#f9fafb',
    marginBottom: 5
  },

  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },

  button: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center'
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center'
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },

  picker: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    marginBottom: 10
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  modalButton: {
    flex: 1,
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center'
  },

  cancelButton: { backgroundColor: '#ff6b6b' },

});

export default Profile;
