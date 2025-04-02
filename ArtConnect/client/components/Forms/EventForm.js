import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '@/context/authContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const EventForm = ({ closeModal }) => {
    // global state
    const { state, setState } = useContext(AuthContext)

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Painting');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false)

    const categories = ["Painting", "Sculpture", "Photography", "Digital Art", "Mixed Media"];


    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            setShowDatePicker(false);
            setDate(prevDate => {
                const updatedDate = new Date(prevDate);
                updatedDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                return updatedDate;
            });
        }
    };

    const onChangeTime = (event, selectedTime) => {
        if (selectedTime) {
            setShowTimePicker(false);
            setDate(prevDate => {
                const updatedDate = new Date(prevDate);
                updatedDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
                return updatedDate;
            });
        }
    };

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
                    name: `event-${name}-${index + 1}.jpg`,
                });
            });

            formData.append("name", name);
            formData.append("location", location);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("date", date.toISOString());
            formData.append("artistID", state?.user?._id);
            formData.append("artistName", state?.user?.name);

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
                {/* <Text style={[styles.selectedDateTime, {textAlign: 'left'}] }>Category: {category}</Text> */}

                <View style={styles.pickerContainer}>
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

                <View style={styles.dateTimeContainer}>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
                        <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
                        <Text style={styles.dateTimeButtonText}>Select Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowTimePicker(true)}>
                        <Ionicons name="time-outline" size={24} color="#FFFFFF" />
                        <Text style={styles.dateTimeButtonText}>Select Time</Text>
                    </TouchableOpacity>
                </View>
                {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} minimumDate={new Date()} />}
                {showTimePicker && <DateTimePicker value={date} mode="time" display="default" onChange={onChangeTime} />}

                <Text style={styles.selectedDateTime}>Date: {date.toLocaleString()}</Text>


                <View style={styles.inputContainer}>
                    <Ionicons name="create-outline" size={24} color="#4A90E2" style={styles.icon} />
                    <TextInput
                        placeholder="Description"
                        placeholderTextColor="gray"
                        editable
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                        style={[styles.input, styles.multilineInput]}
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
                    placeholderTextColor="gray"
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
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.25)',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    picker: {
        flex: 1,
        height: 55,
        color: '#cbd5e1',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    dateTimeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4A90E2',
        padding: 12,
        borderRadius: 10,
        flex: 0.48,
    },
    dateTimeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    selectedDateTime: {
        fontSize: 18,
        justifyContent: 'center',
        color: '#4A90E2',
        marginBottom: 20,
        textAlign: 'center',
        padding: 15,
        backgroundColor: 'rgba(100, 100, 100, 0.25)',
        borderRadius: 8,
        overflow: 'hidden',
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
