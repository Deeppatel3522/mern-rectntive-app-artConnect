import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, Platform, Share, Modal } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '@/context/authContext';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FooterMenu from '@/components/Menus/FooteMenu';
import { toggleFollowStatus } from '@/HelperFunc/ToggleFollowStatus';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = ({ navigation }) => {
  // Global state
  const { state, setState, fetchUserFollowings, refreshUser, fetchUserOrders } = useContext(AuthContext);
  // extract values from "state"
  const { user, token } = state;

  // Local states
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [email] = useState(user?.email);
  const [image, setImage] = useState(user?.image);
  const [type, setType] = useState(user?.type);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [followingModalVisible, setFollowingModalVisible] = useState(false);
  const [updatePasswordModalVisible, setUpdatePasswordModalVisible] = useState(false);
  const [userFollowings, setUserFollowings] = useState([])

  // UPDATE Profile
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put('/auth/update-user', { name, email, type });
      setLoading(false);
      setState({ ...state, user: data?.updatedUser });
      alert(data && data.message);
      setModalVisible(false);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // handle password update
  const handlePasswordUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put('/auth/update-user-password', { password, currentPassword, email });
      setLoading(false);
      setState({ ...state, user: data?.updatedUser });
      alert(data && data.message);
      setCurrentPassword("")
      setPassword("")
      setUpdatePasswordModalVisible(false);
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

  //LogOut
  const logoutFunction = async () => {
    setState({ user: null, token: "" });
    await AsyncStorage.removeItem('@auth');
    alert('Logout Successfully');
  };

  // handleFollowing toggle
  const handleFollow = async (currentUserId, userID, userName) => {
    try {
      console.log(toggleFollowStatus);
      await toggleFollowStatus({ CurrentUserId: currentUserId, userId: userID, userName: userName });
      console.log("Follow status updated successfully!");
      await refreshUser()
      await getlUserFollowings()

    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  // Followings
  const getlUserFollowings = async () => {
    const { followings } = await fetchUserFollowings(state?.user?._id)
    setUserFollowings(followings)
    // console.log(`Total number of User followings: ${followings.length ? followings.length : 0}`,);
  }

  useEffect(() => {
    getlUserFollowings()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.semicircle} />
        <View style={styles.imageContainer}>
          <Image source={{ uri: user?.image ? user?.image : "https://i.pinimg.com/736x/8b/57/0c/8b570c0676a1dabc40c88e214b2079d1.jpg" }} style={styles.profileImage} />
          <TouchableOpacity style={styles.cameraButton} onPress={selectImage}>
            <FontAwesome5 name='camera' style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.userProfileInfoContainer}>
          <Text style={styles.emailStyle}>{user?.name.toUpperCase()}</Text>
          <Text style={styles.accountTypeStyle}>{user?.type}</Text>
        </View>

        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => navigation.navigate('Favorites')}
          >
            <FontAwesome5 name={"heart"} solid style={[styles.iconText, { color: '#FF4D6D' }]} />
            <Text style={styles.infoText}>Favorites</Text>
          </TouchableOpacity>

          {user?.type === 'Artist' && (
            <TouchableOpacity
              style={styles.detailRow}
              onPress={() => navigation.navigate('UserPosts')}
            >
              <FontAwesome5 name={"list"} style={[styles.iconText, { color: '#F8C537' }]} />
              <Text style={styles.infoText}>My Posts</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome5 name={"user-edit"} style={[styles.iconText, { color: '#34C759' }]} />
            <Text style={styles.infoText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => setFollowingModalVisible(true)}
          >
            <FontAwesome5 name={"users"} style={[styles.iconText, { color: '#0A84FF' }]} />
            <Text style={styles.infoText}>Followings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailRow}
            // onPress={() => setOrdersModalVisible(true)}
            onPress={() => { navigation.navigate('OrderList') }}
          >
            <FontAwesome5 name={"scroll"} style={[styles.iconText, { color: '#0A84FF' }]} />
            <Text style={styles.infoText}>My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => setUpdatePasswordModalVisible(true)}
          >
            <FontAwesome5 name={"lock"} style={[styles.iconText, { color: '#FF9500' }]} />
            <Text style={styles.infoText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          marginTop: 20,
          width: '100%',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            style={styles.button}
            onPress={logoutFunction}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FooterMenu />

      {/* Update Profile Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Profile</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
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

      {/* Password update Modal */}
      <Modal animationType="slide" transparent={true} visible={updatePasswordModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Password</Text>
            <TextInput style={styles.input} value={currentPassword} onChangeText={setCurrentPassword} placeholder="Current Password" secureTextEntry />
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="New Password" secureTextEntry />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handlePasswordUpdate}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setUpdatePasswordModalVisible(false)}>
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
                <View key={index} style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(100,100,100,0.1)', alignItems: 'center', borderRadius: 8, padding: 10, marginVertical: 5 }}>
                  <Text style={{ width: '55%' }} >{user.creatorName}</Text>
                  <TouchableOpacity style={{ padding: 5, backgroundColor: 'tomato', width: 80, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => { handleFollow(state.user._id, user.creatorId, user.creatorName) }}>
                    <Text style={styles.buttonText}>Following</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noFollowingsText}>No followings yet.</Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setFollowingModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#151515'
  },
  container: {
    alignItems: 'center',
    padding: 20
  }, semicircle: {
    position: 'absolute',
    top: -675,
    width: '250%',
    height: 800,
    backgroundColor: '#138',
    borderRadius: '50%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 20
  },
  imageContainer: {
    marginTop: 35,
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    backgroundColor: 'rgba(100,100,100, 0.5)'
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
  userProfileInfoContainer: {
    alignItems: 'center',
  },
  emailStyle: {
    fontSize: 16,
    color: '#f9fafb',
    letterSpacing: 1,
    marginBottom: 5,
    fontWeight: 500,
  },
  accountTypeStyle: {
    fontSize: 16,
    color: '#cbd5e1',
    letterSpacing: 1,
    marginBottom: 5,
    fontWeight: 400,
  },
  buttonContainer: {
    marginTop: 15,
    width: '100%',
    padding: 10
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  iconText: {
    fontSize: 24,
    color: '#4a90e2',
  },
  infoText: {
    fontSize: 16,
    color: '#f9fafb',
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#ffffff', // Dark background for better visibility
    padding: 20,
    borderRadius: 8,
    width: '80%', // Increased width for better alignment
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
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    marginTop: 15,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default Profile;
