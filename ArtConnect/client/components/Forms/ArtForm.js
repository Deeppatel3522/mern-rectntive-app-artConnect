import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const ArtForm = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Painting');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false)
    const categories = ["Painting", "Sculpture", "Photography", "Digital Art", "Mixed Media"];
    const { state } = useContext(AuthContext)

    const saveImage = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

                <View style={styles.inputContainer}>
                    <Ionicons name="list-outline" size={24} color="#4A90E2" style={styles.icon} />
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        style={styles.picker}
                    >
                        {categories.map((cat, index) => (
                            <Picker.Item key={index} label={cat} value={cat} />
                        ))}
                    </Picker>
                </View>
                {renderInput("pricetag-outline", "Price", price, setPrice, "numeric")}

                <View style={styles.inputContainer}>
                    <Ionicons name="create-outline" size={24} color="#4A90E2" style={styles.icon} />
                    <TextInput
                        placeholder="Description"
                        placeholderTextColor={"gray"}
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

                    {images.length > 0 ? (
                        images.map((img, index) => (
                            <Image key={index} source={{ uri: img }} style={styles.image} />
                        ))
                    ) : (

                        <Text style={{
                            fontSize: 16,
                            color: '#888',
                            textAlign: 'center',
                            marginVertical: 20,
                        }}>
                            There are no images
                        </Text>

                    )}
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
                    placeholderTextColor={"gray"}
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
        backgroundColor: '#121212',
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
        backgroundColor: 'rgba(100, 100, 100, 0.25)',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#cbd5e1',
    },
    picker: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#cbd5e1',
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
