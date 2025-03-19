import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PurchaseCard from '@/components/Cards/PurchaseCard';
import { StripeProvider } from '@stripe/stripe-react-native';
import { AuthContext } from '@/context/authContext';


const handlePurchase = async () => {
    Alert.alert("SUCCESS", "Congratulation! 🎆");
};

const OrderSummary = ({ route, navigation }) => {

    const { state } = useContext(AuthContext)
    const { item } = route.params;
    const [paymentModelVisible, setPaymentModelVisible] = useState(false)

    const [userDetails, setUserDetails] = useState({
        name: state?.user?.name ? state?.user?.name : '',
        email: state?.user?.email ? state?.user?.email : '',
        phone: '',
    });

    const [address, setAddress] = useState({
        streetNumber: '',
        streetName: '',
        unitNumber: '',
        postalCode: '',
        city: '',
        country: '',
    });

    const handleUserChange = (field, value) => {
        setUserDetails({ ...userDetails, [field]: value });
    };

    const handleAddressChange = (field, value) => {
        setAddress({ ...address, [field]: value });
    };

    const handlePurchase = () => {
        if (!item || !item.price) {
            alert("Item details are missing!");
            return;
        }

        // Validate user details
        for (const key in userDetails) {
            if (!userDetails[key]) {
                alert(`Please enter your ${key}`);
                return;
            }
        }

        // Validate address
        for (const key in address) {
            if (!address[key]) {
                alert(`Please enter your ${key}`);
                return;
            }
        }
        const orderToPlace = {
            itemDetails: item,  
            userInfo: userDetails,
            deliveryAddress: address,
            subtotal: item.price.toFixed(2),
            tax: (item.price * 0.13).toFixed(2),
            total: (item.price * 1.13).toFixed(2),
            date: new Date().toLocaleString()
        };

        console.log("Order to Place:", orderToPlace); // Debugging

        // Navigate to checkout screen with order details
        navigation.navigate('Checkout', { orderToPlace });
    };

    return (
        <StripeProvider
            publishableKey={"pk_test_51R1W9ACQTvIY8O0oKUj2w3eN4XK5YH0fceacBdirC2Col91T6rymSPDJQAMfAbvJOYlNjPxoNNqC4dkHM5ccvy3000ScJiUT3Z"}
            merchantIdentifier="merchant.identifier" // required for Apple Pay
            urlScheme="myapp" // required for 3D Secure and bank redirects
        >

            <ScrollView style={styles.container}>
                <View style={{ flex: 1, backgroundColor: '#fff', padding: 15 }}>
                    <Text style={styles.heading}>Order Summary</Text>

                    <PurchaseCard item={item} />

                    <Text style={styles.summaryText}>Subtotal: ${item.price.toFixed(2)}</Text>
                    <Text style={styles.summaryText}>Tax (13%): ${(item.price * 0.13).toFixed(2)}</Text>
                    <Text style={styles.summaryText}>Total: ${(item.price * 1.13).toFixed(2)}</Text>

                    {/* User Details */}
                    <Text style={styles.sectionTitle}>User Details</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={userDetails.name}
                        onChangeText={(text) => handleUserChange('name', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        keyboardType="email-address"
                        value={userDetails.email}
                        onChangeText={(text) => handleUserChange('email', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={userDetails.phone}
                        onChangeText={(text) => handleUserChange('phone', text)}
                    />

                    {/* Delivery Address */}
                    <Text style={styles.sectionTitle}>Delivery Address</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Street Number"
                        keyboardType="numeric"
                        value={address.streetNumber}
                        onChangeText={(text) => handleAddressChange('streetNumber', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Street Name"
                        value={address.streetName}
                        onChangeText={(text) => handleAddressChange('streetName', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Unit Number (Optional)"
                        value={address.unitNumber}
                        onChangeText={(text) => handleAddressChange('unitNumber', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Postal Code"
                        value={address.postalCode}
                        onChangeText={(text) => handleAddressChange('postalCode', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={address.city}
                        onChangeText={(text) => handleAddressChange('city', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Country"
                        value={address.country}
                        onChangeText={(text) => handleAddressChange('country', text)}
                    />

                    <TouchableOpacity style={styles.bookButton} onPress={handlePurchase}>
                        <Text style={styles.bookButtonText}>PURCHASE ARTWORK</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </StripeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    heading: {
        marginVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    summaryText: {
        fontSize: 16,
        marginVertical: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    bookButton: {
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default OrderSummary;
