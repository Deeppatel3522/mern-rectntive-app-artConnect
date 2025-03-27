import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '@/context/authContext';

const FooterMenu = () => {
    const { state, setState } = useContext(AuthContext);
    const navigation = useNavigation();
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);

    const logoutFunction = async () => {
        setState({ user: null, token: "" });
        await AsyncStorage.removeItem('@auth');
        alert('Logout Successfully');
    };

    const openAddPostModel = () => {
        setModalVisible(true)
    }

    const menuItems = [
        { name: 'Explore', icon: 'compass', route: 'Explore' },
        { name: 'Events', icon: 'calendar-alt', route: 'EventList' },
        { name: 'Arts', icon: 'palette', route: 'ArtList' },
        { name: 'Profile', icon: 'user', route: 'Profile' },
    ];

    return (
        <View>

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


                {/* <TouchableOpacity style={[styles.menuItem, styles.addBtn]} onPress={openAddPostModel}>
                    <FontAwesome5 name='plus' style={[styles.iconStyle, styles.logoutIcon]} />
                </TouchableOpacity> */}


            </View>

            {/* <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style = {styles.modalContainer}>
                        <TouchableOpacity style={[styles.addPostOption]} onPress={() => {setModalVisible(false)}}>
                            <FontAwesome5 name='calendar-alt' style={[styles.iconStyle, styles.logoutIcon]} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.addPostOption]} onPress={() => {setModalVisible(false)}}>
                            <FontAwesome5 name='palette' style={[styles.iconStyle, styles.logoutIcon]} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.25)',
        paddingVertical: 10,
        borderTopWidth: 2,
        borderTopColor: 'rgba(58, 58, 58, 1)',
    },
    menuItem: {
        alignItems: 'center',
    },
    addBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#cbd5e1',
        borderRadius: "50%"
    },
    iconStyle: {
        fontSize: 24,
        marginBottom: 4,
        color: '#cbd5e1',
    },
    activeIcon: {
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
    modalContainer: {
        flex: 1,
        justifyContent:'flex-end',
        gap: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0)',
        paddingBottom: 80
    },
    addPostOption: {
        height: 50, 
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default FooterMenu;


// import React, { useContext, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { AuthContext } from '@/context/authContext';

// const FooterMenu = () => {
//     const { state, setState } = useContext(AuthContext);
//     const navigation = useNavigation();
//     const route = useRoute();
//     const [modalVisible, setModalVisible] = useState(false);

//     const logoutFunction = async () => {
//         setState({ user: null, token: "" });
//         await AsyncStorage.removeItem('@auth');
//         alert('Logout Successfully');
//         navigation.navigate('Login'); // Ensure user is redirected to login
//     };

    

//     const menuItems = [
//         { name: 'Explore', icon: 'compass', route: 'Explore' },
//         { name: 'Events', icon: 'calendar-alt', route: 'EventList' },
//         { name: 'Arts', icon: 'palette', route: 'ArtList' },
//         { name: 'Profile', icon: 'user', route: 'Profile' },
//     ];

//     return (
//         <View style={styles.footerContainer}>
//             {/* Footer Menu */}
//             <View style={styles.container}>
//                 {menuItems.map((item, index) => (
//                     <TouchableOpacity
//                         key={index}
//                         style={styles.menuItem}
//                         onPress={() => navigation.navigate(item.route)}
//                     >
//                         <FontAwesome5
//                             name={item.icon}
//                             style={[
//                                 styles.iconStyle,
//                                 route.name === item.route && styles.activeIcon
//                             ]}
//                         />
//                         <Text style={[
//                             styles.menuText,
//                             route.name === item.route && styles.activeText
//                         ]}>
//                             {item.name}
//                         </Text>
//                     </TouchableOpacity>
//                 ))}

//                 {/* Open Modal Button */}
//                 <TouchableOpacity style={[styles.menuItem, styles.addBtn]} onPress={() => setModalVisible(true)}>
//                     <FontAwesome5 name='plus' style={styles.addIcon} />
//                 </TouchableOpacity>
//             </View>

//             {/* Modal */}
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalText}>Add Post</Text>

//                         {/* Close Modal Button */}
//                         <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//                             <FontAwesome5 name='times' style={styles.closeIcon} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     footerContainer: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         backgroundColor: 'transparent',
//     },
//     container: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//         backgroundColor: 'rgba(100, 100, 100, 0.25)',
//         paddingVertical: 10,
//         borderTopWidth: 2,
//         borderTopColor: 'rgba(58, 58, 58, 1)',
//     },
//     menuItem: {
//         alignItems: 'center',
//     },
//     addBtn: {
//         width: 50,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#cbd5e1',
//         borderRadius: 25, // Fixed issue
//     },
//     addIcon: {
//         fontSize: 24,
//         color: '#1e293b',
//     },
//     iconStyle: {
//         fontSize: 24,
//         marginBottom: 4,
//         color: '#cbd5e1',
//     },
//     activeIcon: {
//         color: '#60a5fa',
//     },
//     menuText: {
//         fontSize: 12,
//         color: '#cbd5e1',
//     },
//     activeText: {
//         color: '#60a5fa',
//         fontWeight: 'bold',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(255, 4, 4, 0.5)',
//     },
//     modalContent: {
//         width: 300,
//         padding: 20,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     modalText: {
//         fontSize: 18,
//         marginBottom: 15,
//     },
//     closeButton: {
//         marginTop: 10,
//         padding: 10,
//         backgroundColor: '#ff6b6b',
//         borderRadius: 10,
//     },
//     closeIcon: {
//         fontSize: 20,
//         color: 'white',
//     },
// });

// export default FooterMenu;
