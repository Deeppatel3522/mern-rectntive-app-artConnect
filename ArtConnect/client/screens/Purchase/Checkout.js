import { View, Text, Modal, Button, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { AuthContext } from '@/context/authContext';
import { BaseAnimationBuilder } from 'react-native-reanimated';

const Checkout = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { state } = useContext(AuthContext)
    const [paymentData, setPaymentData] = useState(null);

    const { orderToPlace } = route.params;

    const { initPaymentSheet, presentPaymentSheet } = useStripe();


    const fetchPaymentSheetParams = async () => {

        try {
            const response = await axios.post(`/payment/purchase-item`, {
                name: orderToPlace.userInfo.name,
                email: orderToPlace.userInfo.email,
                phone: orderToPlace.userInfo.phone,  // Added phone
                amount: orderToPlace.total,
                address: {
                    streetNumber: orderToPlace.deliveryAddress.streetNumber,
                    streetName: orderToPlace.deliveryAddress.streetName,
                    unitNumber: orderToPlace.deliveryAddress.unitNumber,
                    postalCode: orderToPlace.deliveryAddress.postalCode,
                    city: orderToPlace.deliveryAddress.city,
                    country: orderToPlace.deliveryAddress.country
                }
            })

            const { paymentIntent, ephemeralKey, customer } = response.data;
            setPaymentData({
                paymentIntent,
                ephemeralKey,
                customer
            });
            setLoading(true)

        } catch (error) {
            console.error('Error fetching payment sheet params:', error);
            Alert.alert('Error', error.message);
        }
    };

    const initializePaymentSheet = async () => {

        if (!paymentData) return;

        const { paymentIntent, ephemeralKey, customer } = paymentData;

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey.secret,
            paymentIntentClientSecret: paymentIntent.client_secret,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });


        if (!error) {
            setLoading(true);
        } else {
            console.log('Error initializing payment sheet:', error);
        }
    };

    const openPaymentSheet = async () => {

        const { error } = await presentPaymentSheet();
        if (error) {
            console.log(error);
            Alert.alert(`Error code: ${error.code}`, error.message);
            navigation.navigate('OrderSummary', { item: orderToPlace.itemDetails })
        } else {
            try {
                const response = await axios.post(`/order/save-order`, { orderData: orderToPlace })
                Alert.alert('DB Order Saved!', `OrderID: ${response.data.orderId}`);
            } catch (error) {
                console.error('Error saving order in database', error);
                Alert.alert('Error', error.message);
            }
            Alert.alert('STRIPE Success', 'Your order is confirmed!');
            setSuccess(true)
            navigation.navigate('Explore')
        }
    };

    useEffect(() => {
        fetchPaymentSheetParams();
    }, []);

    useEffect(() => {
        if (paymentData) {
            initializePaymentSheet()
        }
    }, [paymentData])


    return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>User Data</Text>
        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>Name: {orderToPlace.userInfo.name}</Text>
        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>Email: {orderToPlace.userInfo.email}</Text>
        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>Phone: {orderToPlace.userInfo.phone}</Text>
        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>Address: {orderToPlace.userInfo.phone}</Text>
        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>Item Data</Text>
        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>Item Name: {orderToPlace.itemDetails.name}</Text>
        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>SubTotal: {orderToPlace.subtotal}</Text>
        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>Tax: {orderToPlace.tax}</Text>
        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>Total: {orderToPlace.total}</Text>
        //     <Text style={{ fontSize: 20, marginVertical: 5 }}>Item Purchase Date: {orderToPlace.date.toLocaleString()}</Text>
        //     <Button
        //         variant="primary"
        //         disabled={!loading}
        //         title="Checkout"
        //         onPress={openPaymentSheet}
        //     />

        // </View>

        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Final Order Review</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>User Data</Text>
                <Text style={styles.text}>Name: {orderToPlace.userInfo.name}</Text>
                <Text style={styles.text}>Email: {orderToPlace.userInfo.email}</Text>
                <Text style={styles.text}>Phone: {orderToPlace.userInfo.phone}</Text>
                <Text style={styles.text}>
                    Address: {orderToPlace.deliveryAddress.streetNumber} {orderToPlace.deliveryAddress.streetName},
                    {orderToPlace.deliveryAddress.unitNumber ? ` Unit ${orderToPlace.deliveryAddress.unitNumber},` : ''}
                    {orderToPlace.deliveryAddress.postalCode}, {orderToPlace.deliveryAddress.city}, {orderToPlace.deliveryAddress.country}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Item Data</Text>
                <Text style={styles.text}>Item Name: {orderToPlace.itemDetails.name}</Text>
                <Text style={styles.text}>SubTotal: {orderToPlace.subtotal}</Text>
                <Text style={styles.text}>Tax: {orderToPlace.tax}</Text>
                <Text style={styles.text}>Total: {orderToPlace.total}</Text>
                <Text style={styles.text}>Item Purchase Date: {orderToPlace.date}</Text>
            </View>

            <Button
                title={loading ? "Processing..." : "Checkout"}
                onPress={openPaymentSheet}
                disabled={loading}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        width: '100%',
        marginBottom: 20,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
});

export default Checkout