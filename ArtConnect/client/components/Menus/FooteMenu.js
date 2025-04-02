import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '@/context/authContext';
import ArtForm from '../Forms/ArtForm';
import EventForm from '../Forms/EventForm';

const FooterMenu = () => {
    const { state, setState } = useContext(AuthContext);
    const navigation = useNavigation();
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const [eventModalVisible, setEventModalVisible] = useState(false);
    const [artModalVisible, setArtModalVisible] = useState(false);

    const logoutFunction = async () => {
        setState({ user: null, token: "" });
        await AsyncStorage.removeItem('@auth');
        alert('Logout Successfully');
    };

    return (
        <View style={{ flexDirection: 'column-reverse' }}>

            <View style={styles.container}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Explore')}>
                    <FontAwesome5 name="compass" style={[styles.iconStyle, route.name === 'Explore' && styles.activeIcon]} />
                    <Text style={[styles.menuText, route.name === 'Explore' && styles.activeText]}>Explore</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EventList')}>
                    <FontAwesome5 name="calendar-alt" style={[styles.iconStyle, route.name === 'EventList' && styles.activeIcon]} />
                    <Text style={[styles.menuText, route.name === 'EventList' && styles.activeText]}>Events</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, styles.addBtn]} onPress={() => setModalVisible(true)}>
                    <FontAwesome5 name="plus" style={[styles.iconStyle, styles.plusIcon]} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ArtList')}>
                    <FontAwesome5 name="palette" style={[styles.iconStyle, route.name === 'ArtList' && styles.activeIcon]} />
                    <Text style={[styles.menuText, route.name === 'ArtList' && styles.activeText]}>Arts</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
                    <FontAwesome5 name="user" style={[styles.iconStyle, route.name === 'Profile' && styles.activeIcon]} />
                    <Text style={[styles.menuText, route.name === 'Profile' && styles.activeText]}>Profile</Text>
                </TouchableOpacity>

                
            </View>


            {/* Modal for choosing Art or Event */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.addPostOption}
                            onPress={() => {
                                setEventModalVisible(true);
                                setModalVisible(false);
                            }}
                        >
                            <FontAwesome5 name='calendar-alt' style={styles.optionIcon} />
                            <Text style={styles.optionText}>Add Event</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.addPostOption}
                            onPress={() => {
                                setArtModalVisible(true);
                                setModalVisible(false);
                            }}
                        >
                            <FontAwesome5 name='palette' style={styles.optionIcon} />
                            <Text style={styles.optionText}>Add Art</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Art & Event Form Modals */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={artModalVisible || eventModalVisible}
                onRequestClose={() => {
                    setArtModalVisible(false);
                    setEventModalVisible(false);
                }}
            >
                    <View style={styles.centeredModal}>
                        <View style={styles.modalView}>
                            {artModalVisible ? (
                                <ArtForm closeModal={() => setArtModalVisible(false)} />
                            ) : (
                                <EventForm closeModal={() => setEventModalVisible(false)} />
                            )}
                        </View>
                    </View>
            </Modal>

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
        alignItems: 'center',
        backgroundColor: '#cbd5e1',
        borderRadius: 25,
    },
    iconStyle: {
        fontSize: 24,
        marginBottom: 4,
        color: '#cbd5e1',
    },
    plusIcon: {
        color: '#4CAF50',
        marginBottom: 0
    },
    activeIcon: {
        color: '#60a5fa',
    },
    menuText: {
        fontSize: 12,
        color: '#cbd5e1',
    },
    activeText: {
        color: '#60a5fa',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingBottom: 80,
    },
    addPostOption: {
        width: '90%',
        flexDirection: 'row',
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 10,
        elevation: 5,
    },
    optionIcon: {
        fontSize: 20,
        color: '#4a4a4a',
        marginRight: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    centeredModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
    }
});

export default FooterMenu;


// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//         backgroundColor: 'rgba(100, 100, 100, 0.25)',
//         paddingVertical: 10,
//         borderTopWidth: 2,
//         borderTopColor: 'rgba(58, 58, 58, 1)',
//     },
//     formOptions: {
//         borderColor: 'red',
//         borderWidth: 5
//     },
//     modalContainerView: {
//         borderColor: 'green',
//         borderWidth: 5,
//         flex: 1
//     },
//     menuItem: {
//         alignItems: 'center',
//     },
//     addBtn: {
//         width: 50,
//         height: 50,
//         justifyContent: 'center',
//         backgroundColor: '#cbd5e1',
//         borderRadius: "50%"
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
//         // color: '#757575',
//         color: '#cbd5e1',
//     },
//     activeText: {
//         // color: '#4a90e2',
//         color: '#60a5fa',
//         fontWeight: 'bold',
//     },
//     logoutIcon: {
//         color: '#ff6b6b',
//     },
//     logoutText: {
//         color: '#ff6b6b',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent:'flex-end',
//         gap: 1,
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0)',
//         paddingBottom: 80
//     },
//     addPostOption: {
//         height: 50, 
//         backgroundColor: 'white',
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'center'
//     }


// });







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
