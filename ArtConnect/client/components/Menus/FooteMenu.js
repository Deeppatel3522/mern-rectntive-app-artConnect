import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '@/context/authContext';

const FooterMenu = () => {
    const { state, setState } = useContext(AuthContext);
    const navigation = useNavigation();
    const route = useRoute();

    const logoutFunction = async () => {
        setState({ user: null, token: "" });
        await AsyncStorage.removeItem('@auth');
        alert('Logout Successfully');
    };

    const menuItems = [
        { name: 'Explore', icon: 'compass', route: 'Explore' },
        { name: 'Events', icon: 'calendar-alt', route: 'EventList' },
        { name: 'Arts', icon: 'palette', route: 'ArtList' },
        { name: 'Profile', icon: 'user', route: 'Profile' },
    ];

    return (
        <View style={styles.container}>
            {menuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => navigation.navigate(item.route)}
                >
                    <FontAwesome5
                        name={item.icon}
                        style={[
                            styles.iconStyle,
                            route.name === item.route && styles.activeIcon
                        ]}
                    />
                    <Text style={[
                        styles.menuText,
                        route.name === item.route && styles.activeText
                    ]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.menuItem} onPress={logoutFunction}>
                <FontAwesome5 name='sign-out-alt' style={[styles.iconStyle, styles.logoutIcon]} />
                <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: '#ffffff',
        backgroundColor: 'rgba(100, 100, 100, 0.25)',
        paddingVertical: 10,
        borderTopWidth: 2,
        // borderTopColor: '#e0e0e0',
        borderTopColor: 'rgba(58, 58, 58, 1)',
    },
    menuItem: {
        alignItems: 'center',
    },
    iconStyle: {
        fontSize: 24,
        marginBottom: 4,
        // color: '#757575',
        color: '#cbd5e1',
    },
    activeIcon: {
        // color: '#4a90e2',
        color: '#60a5fa',
    },
    menuText: {
        fontSize: 12,
        // color: '#757575',
        color: '#cbd5e1',
    },
    activeText: {
        // color: '#4a90e2',
        color: '#60a5fa', 
        fontWeight: 'bold',
    },
    logoutIcon: {
        color: '#ff6b6b',
    },
    logoutText: {
        color: '#ff6b6b',
    },
});

export default FooterMenu;
