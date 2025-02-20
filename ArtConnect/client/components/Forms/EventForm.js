import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '@/context/authContext';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';

const EventForm = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false)

    const categories = ["Painting", "Sculpture", "Photography", "Digital Art", "Mixed Media"];

    // global state
    const [state, setState] = useContext(AuthContext)


    // ------------------------ ERROR: RNCMaterialDatePicker could not be found --------------------------------
    // // date Picker
    // const showDatePicker = () => {
    //     setDatePickerVisibility(true);
    // };

    // const hideDatePicker = () => {
    //     setDatePickerVisibility(false);
    // };

    // const handleConfirm = (date) => {
    //     console.warn("A date has been picked: ", date);
    //     hideDatePicker();
    // }


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
                    name: `event-${name}-${index + 1}.jpg`,
                });
            });

            formData.append("name", name);
            formData.append("location", location);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("date", date);
            formData.append("artistID", state?.user?._id);

            const response = await axios.post(`/event/post-event`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setLoading(false)
            console.log(response.data.event);
            Alert.alert("Success", response.data.message || "Event Posted Successfully!");
            closeModal()
        } catch (error) {
            console.error("Error posting Event:", error);
            setLoading(false)
            Alert.alert("Error", error.response.data.message);
            closeModal()
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Create New Event</Text>

                {renderInput("create-outline", "Event Name", name, setName)}
                {renderInput("location-outline", "Location", location, setLocation)}
                {renderInput("pricetag-outline", "Price", price, setPrice, "numeric")}
                {renderInput("list-outline", "Category", category, setCategory)}
                <View style={styles.pickerContainer}>
                    <Ionicons name="list-outline" size={24} color="#4A90E2" style={styles.icon} />
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Category" value="" />
                        {categories.map((cat, index) => (
                            <Picker.Item key={index} label={cat} value={cat} />
                        ))}
                    </Picker>
                </View>
                {renderInput("calendar-outline", "Date (YYYY-MM-DDTHH:MM:SS)", date, setDate)}

                {/* <Button title="Show Date Picker" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                /> */}


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
                <TouchableOpacity style={styles.submitButton} onPress={() => { handleSubmit(images) }}>
                    <Text style={styles.buttonText}>{loading ? "Loading..." : "Create Event"}</Text>
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
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        elevation: 2,
    },
    picker: {
        flex: 1,
        height: 50,
    },
    dateButton: {
        flexDirection: 'row',
        backgroundColor: '#4A90E2',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    dateButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
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

export default EventForm;
