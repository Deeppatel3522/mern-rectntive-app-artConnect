// import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
// import React, { useContext, useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import PurchaseCard from '@/components/Cards/PurchaseCard';
// import { StripeProvider } from '@stripe/stripe-react-native';
// import { AuthContext } from '@/context/authContext';


// const handlePurchase = async () => {
//     Alert.alert("SUCCESS", "Congratulation! 🎆");
// };

// const OrderSummary = ({ route, navigation }) => {

//     const { state } = useContext(AuthContext)
//     const { item } = route.params;
//     const [paymentModelVisible, setPaymentModelVisible] = useState(false)

//     const [userDetails, setUserDetails] = useState({
//         name: state?.user?.name ? state?.user?.name : '',
//         email: state?.user?.email ? state?.user?.email : '',
//         phone: '',
//     });

//     const [address, setAddress] = useState({
//         streetNumber: '',
//         streetName: '',
//         unitNumber: '',
//         postalCode: '',
//         city: '',
//         country: '',
//     });

//     const handleUserChange = (field, value) => {
//         setUserDetails({ ...userDetails, [field]: value });
//     };

//     const handleAddressChange = (field, value) => {
//         setAddress({ ...address, [field]: value });
//     };

//     const handlePurchase = () => {
//         if (!item || !item.price) {
//             alert("Item details are missing!");
//             return;
//         }

//         // Validate user details
//         for (const key in userDetails) {
//             if (!userDetails[key]) {
//                 alert(`Please enter your ${key}`);
//                 return;
//             }
//         }

//         // Validate address
//         for (const key in address) {
//             if (!address[key]) {
//                 alert(`Please enter your ${key}`);
//                 return;
//             }
//         }
//         const orderToPlace = {
//             itemDetails: item,  
//             userInfo: userDetails,
//             deliveryAddress: address,
//             subtotal: item.price.toFixed(2),
//             tax: (item.price * 0.13).toFixed(2),
//             total: (item.price * 1.13).toFixed(2),
//             date: new Date().toLocaleString()
//         };

//         console.log("Order to Place:", orderToPlace); // Debugging

//         // Navigate to checkout screen with order details
//         navigation.navigate('Checkout', { orderToPlace });
//     };

//     return (
//         <StripeProvider
//             publishableKey={"pk_test_51R1W9ACQTvIY8O0oKUj2w3eN4XK5YH0fceacBdirC2Col91T6rymSPDJQAMfAbvJOYlNjPxoNNqC4dkHM5ccvy3000ScJiUT3Z"}
//             merchantIdentifier="merchant.identifier" // required for Apple Pay
//             urlScheme="myapp" // required for 3D Secure and bank redirects
//         >

//             <ScrollView style={styles.container}>
//                 <View style={{ flex: 1, backgroundColor: '#fff', padding: 15 }}>
//                     <Text style={styles.heading}>Order Summary</Text>

//                     <PurchaseCard item={item} />

//                     <Text style={styles.summaryText}>Subtotal: ${item.price.toFixed(2)}</Text>
//                     <Text style={styles.summaryText}>Tax (13%): ${(item.price * 0.13).toFixed(2)}</Text>
//                     <Text style={styles.summaryText}>Total: ${(item.price * 1.13).toFixed(2)}</Text>

//                     {/* User Details */}
//                     <Text style={styles.sectionTitle}>User Details</Text>

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Full Name"
//                         value={userDetails.name}
//                         onChangeText={(text) => handleUserChange('name', text)}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Email Address"
//                         keyboardType="email-address"
//                         value={userDetails.email}
//                         onChangeText={(text) => handleUserChange('email', text)}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Phone Number"
//                         keyboardType="phone-pad"
//                         value={userDetails.phone}
//                         onChangeText={(text) => handleUserChange('phone', text)}
//                     />

//                     {/* Delivery Address */}
//                     <Text style={styles.sectionTitle}>Delivery Address</Text>

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Street Number"
//                         keyboardType="numeric"
//                         value={address.streetNumber}
//                         onChangeText={(text) => handleAddressChange('streetNumber', text)}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Street Name"
//                         value={address.streetName}
//                         onChangeText={(text) => handleAddressChange('streetName', text)}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Unit Number (Optional)"
//                         value={address.unitNumber}
//                         onChangeText={(text) => handleAddressChange('unitNumber', text)}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Postal Code"
//                         value={address.postalCode}
//                         onChangeText={(text) => handleAddressChange('postalCode', text)}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="City"
//                         value={address.city}
//                         onChangeText={(text) => handleAddressChange('city', text)}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Country"
//                         value={address.country}
//                         onChangeText={(text) => handleAddressChange('country', text)}
//                     />

//                     <TouchableOpacity style={styles.bookButton} onPress={handlePurchase}>
//                         <Text style={styles.bookButtonText}>PURCHASE ARTWORK</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>

//         </StripeProvider>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     heading: {
//         marginVertical: 20,
//         textAlign: 'center',
//         fontWeight: 'bold',
//         fontSize: 20,
//     },
//     summaryText: {
//         fontSize: 16,
//         marginVertical: 5,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 20,
//     },
//     input: {
//         height: 40,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 8,
//         paddingHorizontal: 10,
//         marginTop: 10,
//     },
//     bookButton: {
//         backgroundColor: '#000',
//         padding: 12,
//         borderRadius: 10,
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     bookButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// });

// export default OrderSummary;




import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { AuthContext } from '@/context/authContext';
import PurchaseCard from '@/components/Cards/PurchaseCard';

const OrderSummary = ({ route, navigation }) => {
    const { state } = useContext(AuthContext);
    const { item } = route.params;

    const [userDetails, setUserDetails] = useState({
        name: state?.user?.name || '',
        email: state?.user?.email || '',
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

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (!userDetails.name.trim()) newErrors.name = 'Name is required';
        if (!/^\d{10}$/.test(userDetails.phone)) newErrors.phone = 'Phone must be 10 digits';
        if (!address.streetNumber.trim()) newErrors.streetNumber = 'Street number is required';
        if (!address.streetName.trim()) newErrors.streetName = 'Street name is required';
        if (!address.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
        if (!address.city.trim()) newErrors.city = 'City is required';
        if (!address.country.trim()) newErrors.country = 'Country is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUserChange = (field, value) => {
        setUserDetails({ ...userDetails, [field]: value });
        setErrors({ ...errors, [field]: null });
    };

    const handleAddressChange = (field, value) => {
        setAddress({ ...address, [field]: value });
        setErrors({ ...errors, [field]: null });
    };

    const handlePurchase = () => {
        if (!item || !item.price) {
            Alert.alert("Error", "Item details are missing!");
            return;
        }

        if (validateForm()) {
            const orderToPlace = {
                itemDetails: item,
                userInfo: userDetails,
                deliveryAddress: address,
                subtotal: item.price.toFixed(2),
                tax: (item.price * 0.13).toFixed(2),
                total: (item.price * 1.13).toFixed(2),
                date: new Date().toLocaleString()
            };
            console.log("Order to Place:", orderToPlace);
            navigation.navigate('Checkout', { orderToPlace });
        } 
    };

    return (
        <StripeProvider
            publishableKey={"pk_test_51R1W9ACQTvIY8O0oKUj2w3eN4XK5YH0fceacBdirC2Col91T6rymSPDJQAMfAbvJOYlNjPxoNNqC4dkHM5ccvy3000ScJiUT3Z"}
            merchantIdentifier="merchant.identifier"
            urlScheme="myapp"
        >
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.heading}>Order Summary</Text>

                    <PurchaseCard item={item} />

                    <Text style={styles.summaryText}>Subtotal: ${item.price.toFixed(2)}</Text>
                    <Text style={styles.summaryText}>Tax (13%): ${(item.price * 0.13).toFixed(2)}</Text>
                    <Text style={styles.summaryText}>Total: ${(item.price * 1.13).toFixed(2)}</Text>

                    <Text style={styles.sectionTitle}>User Details</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full name"
                            value={userDetails.name}
                            onChangeText={(text) => handleUserChange('name', text)}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={[styles.input, styles.disabledInput]}
                            value={userDetails.email}
                            editable={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter 10-digit phone number"
                            keyboardType="phone-pad"
                            value={userDetails.phone}
                            onChangeText={(text) => handleUserChange('phone', text)}
                            maxLength={10}
                        />
                        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                    </View>

                    <Text style={styles.sectionTitle}>Delivery Address</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Street Number <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter street number"
                            keyboardType="numeric"
                            value={address.streetNumber}
                            onChangeText={(text) => handleAddressChange('streetNumber', text)}
                        />
                        {errors.streetNumber && <Text style={styles.errorText}>{errors.streetNumber}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Street Name <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter street name"
                            value={address.streetName}
                            onChangeText={(text) => handleAddressChange('streetName', text)}
                        />
                        {errors.streetName && <Text style={styles.errorText}>{errors.streetName}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Unit Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter unit number (Optional)"
                            value={address.unitNumber}
                            onChangeText={(text) => handleAddressChange('unitNumber', text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Postal Code <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter postal code"
                            value={address.postalCode}
                            onChangeText={(text) => handleAddressChange('postalCode', text)}
                        />
                        {errors.postalCode && <Text style={styles.errorText}>{errors.postalCode}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>City <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter city"
                            value={address.city}
                            onChangeText={(text) => handleAddressChange('city', text)}
                        />
                        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Country <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter country"
                            value={address.country}
                            onChangeText={(text) => handleAddressChange('country', text)}
                        />
                        {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
                    </View>

                    <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
                        <Text style={styles.purchaseButtonText}>PURCHASE ARTWORK</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </StripeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    heading: {
        marginVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
    summaryText: {
        fontSize: 16,
        marginVertical: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    disabledInput: {
        backgroundColor: '#f0f0f0',
    },
    required: {
        color: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    purchaseButton: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    purchaseButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default OrderSummary;
