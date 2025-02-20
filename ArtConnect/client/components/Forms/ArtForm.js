import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const ArtForm = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false)

    const { state } = useContext(AuthContext)

    const saveImage = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                allowsMultipleSelection: true
            });

            if (!result.canceled) {
                const selectedImages = result.assets.map(asset => asset.uri);
                setImages(prevImages => [...prevImages, ...selectedImages]);
                // uploadImage(selectedImages)
            }
        } catch (error) {
            alert(`Error uploading image: ${error}`);
        }
    };

    const handleSubmit = async (uris) => {
        try {
            setLoading(true)
            const formData = new FormData();
            uris.forEach((uri, index) => {
                formData.append("image", {
                    uri: uri,
                    type: "image/jpeg",
                    name: `art-${name}-${index + 1}.jpg`,
                });
            });

            formData.append("name", name);
            formData.append("category", category);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("artistID", state?.user?._id);

            const response = await axios.post(`/art/upload-img`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setLoading(false)
            console.log(response.art);
            Alert.alert("Success", `Art Posted successfully!`);
            closeModal()
        } catch (error) {
            console.error("Error Postinh art:", error);
            setLoading(false)
            Alert.alert("Error", "Failed to post art");
            closeModal()
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Add New Art</Text>

                {renderInput("create-outline", "Art Name", name, setName)}
                {/* {renderInput("list-outline", "Category", category, setCategory)} */}
                <View style={styles.inputContainer}>
                    <Ionicons name="list-outline" size={24} color="#4A90E2" style={styles.icon} />
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Painting" value="painting" />
                        <Picker.Item label="Sculpture" value="sculpture" />
                        <Picker.Item label="Photography" value="photography" />
                        <Picker.Item label="Digital Art" value="digital-art" />
                        <Picker.Item label="Craft" value="craft" />
                    </Picker>
                </View>
                {renderInput("pricetag-outline", "Price", price, setPrice, "numeric")}

                <View style={styles.inputContainer}>
                    <Ionicons name="create-outline" size={24} color="#4A90E2" style={styles.icon} />
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={[styles.input, styles.multilineInput]}
                        multiline
                    />
                </View>

                <TouchableOpacity style={styles.imageButton} onPress={saveImage}>
                    <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
                    <Text style={styles.imageButtonText}>Upload Image</Text>
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    {images.map((img, index) => (
                        <Image key={index} source={{ uri: img }} style={styles.image} />
                    ))}
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={() => { handleSubmit(images) }} >
                    <Text style={styles.buttonText}>{loading ? "Loading..." : "Submit Art"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );

    function renderInput(iconName, placeholder, value, onChangeText, keyboardType = "default") {
        return (
            <View style={styles.inputContainer}>
                <Ionicons name={iconName} size={24} color="#4A90E2" style={styles.icon} />
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.input}
                    keyboardType={keyboardType}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderRadius: 15,
        width: '100%',
        maxHeight: '90%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginBottom: 25,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    picker: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 15,
    },
    imageButton: {
        flexDirection: 'row',
        backgroundColor: '#4A90E2',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    imageButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    image: {
        width: 150,
        height: 150,
        marginVertical: 5,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 10,
    },
    closeButton: {
        flex: 1,
        backgroundColor: '#FF5252',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ArtForm;
