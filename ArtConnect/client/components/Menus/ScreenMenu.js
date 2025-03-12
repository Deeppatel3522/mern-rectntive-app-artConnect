import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Explore from '@/screens/Auth/Explore'
import Login from '@/screens/Auth/Login'
import Welcome from '@/screens/Auth/Welcome.js'
import SignUp from '@/screens/Auth/SignUp'
import Profile from '@/screens/Auth/Profile'
import Favorites from '@/screens/User/Favorites.js'
import EventList from '@/screens/Event/EventList'
import EventDetail from '@/screens/Event/EventDetail'
import ArtList from '@/screens/Art/ArtList'
import ArtDetail from '@/screens/Art/ArtDetails'
import OrderSummary from '@/screens/Purchase/OrderSummary.js'
import Checkout from '@/screens/Purchase/Checkout.js'
import HeaderMenu from './HeaderMenu.js'
import { AuthContext } from '@/context/authContext.js'
import { StatusBar } from 'react-native';
StatusBar
const ScreenMenu = () => {
    // global state
    const { state, setState } = useContext(AuthContext)

    const isAuthenticated = (token) => {
        if (!token) return false;

        try {
            const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload

            const expiryDate = new Date(decoded.exp * 1000).toLocaleString();
            console.log("Token Expiry Date:", expiryDate);

            return decoded.exp > Math.floor(Date.now() / 1000); // Check expiry
        } catch (error) {
            return false; // Invalid token
        }
    };

    const authenticatedUser = state?.user && isAuthenticated(state?.token)
    const stack = createNativeStackNavigator()
    return (
        <stack.Navigator initialRouteName='Welcome'>
            {/* check if user logged in or not  */}

            {authenticatedUser ?
                (<>
                    <stack.Screen
                        name='Explore'
                        component={Explore}
                        options={{
                            headerShown: false
                        }}
                    />

                    <stack.Screen
                        name='Profile'
                        component={Profile}
                        options={{
                            headerShown: false
                        }}
                    />

                    <stack.Screen
                        name='Favorites'
                        component={Favorites}
                        options={{
                            headerShown: false
                        }}
                    />

                    <stack.Screen
                        name='EventList'
                        component={EventList}
                        options={{
                            headerShown: false
                        }}
                    />

                    <stack.Screen
                        name='ArtList'
                        component={ArtList}
                        options={{
                            headerShown: false
                        }}
                    />

                    <stack.Screen
                        name='EventDetail'
                        component={EventDetail}
                        options={{
                            headerShown: false
                        }}
                    />

                    <stack.Screen
                        name='ArtDetail'
                        component={ArtDetail}
                        options={{
                            headerShown: false
                        }}
                    />

                    <stack.Screen
                        name='OrderSummary'
                        component={OrderSummary}
                        options={{
                            headerShown: false
                        }}
                    />

                    <stack.Screen
                        name='Checkout'
                        component={Checkout}
                        options={{
                            headerShown: false
                        }}
                    />

                </>)

                :

                (<>
                    <stack.Screen
                        name='Welcome'
                        component={Welcome}
                        options={{
                            headerShown: false
                        }}
                    />
                    <stack.Screen
                        name='Login'
                        component={Login}
                        options={{
                            headerShown: false
                        }}
                    />
                    <stack.Screen
                        name='Register'
                        component={SignUp}
                        options={{
                            headerShown: false
                        }}
                    />
                </>)
            }
        </stack.Navigator>
    )
}

export default ScreenMenu