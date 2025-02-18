import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ArtForm = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);

    const uploadImage = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                allowsMultipleSelection: true
            });

            if (!result.canceled) {
                const selectedImages = result.assets.map(asset => asset.uri);
                setImage(prevImages => [...prevImages, ...selectedImages]);
            }
        } catch (error) {
            alert(`Error uploading image: ${error}`);
        }
    };

    const handleSubmit = () => {
        // Here you would typically send the data to your backend
        // For now, I just log it and close the modal
        console.log({ name, category, price, description, image });
        closeModal();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Art</Text>
            <TextInput
                style={styles.input}
                placeholder="Art Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TouchableOpacity style={styles.imageButton} onPress={uploadImage}>
                <Text>Upload Image</Text>
            </TouchableOpacity>


            <View style={styles.imageContainer}>
                {image.map((img, index) => (
                    <Image key={index} source={{ uri: img }} style={styles.image} />
                ))}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    imageButton: {
        backgroundColor: '#ddd',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
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
    submitButton: {
        backgroundColor: '#4A90E2',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        alignItems: 'center',
    },
});

export default ArtForm;
