import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import InvoiceCard from '@/components/Cards/InvoiceCard.js';
import { AuthContext } from '@/context/authContext';

const OrderList = ({ navigation }) => {
    const { state, fetchUserOrders } = useContext(AuthContext);
    const [userOrders, setUserOrders] = useState([]);

    const getUserOrders = async () => {
        const { userOrders } = await fetchUserOrders(state?.user?._id);
        setUserOrders(userOrders);
    };

    useEffect(() => {
        getUserOrders();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Orders</Text>
            {userOrders.length > 0 ? (
                <FlatList
                    data={userOrders}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <InvoiceCard order={item} navigation={navigation} />
                    )}
                />
            ) : (
                <Text style={styles.noOrders}>No orders yet.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        paddingVertical: 12,
        letterSpacing: 1.5,
        paddingLeft: 5,
        borderRadius: 10,
        marginBottom: 16,
        overflow: 'hidden',
    },
    list: {
        gap: 12,
        paddingBottom: 20,
    },
    noOrders: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
        fontStyle: 'italic',
    },
});

export default OrderList;
