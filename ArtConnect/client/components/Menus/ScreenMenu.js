import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/screens/Auth/Home'
import Login from '@/screens/Auth/Login'
import SignUp from '@/screens/Auth/SignUp'
import Profile from '@/screens/Auth/Profile'
import EventList from '@/screens/Event/EventList'
import EventDetail from '@/screens/Event/EventDetail'
import ArtList from '@/screens/Art/ArtList'
import ArtDetail from '@/screens/Art/ArtDetails'
import HeaderMenu from './HeaderMenu.js'
import { AuthContext } from '@/context/authContext.js'

const ScreenMenu = () => {
    // global state
    const [state, setState] = useContext(AuthContext)

    const authenticatedUser = state?.user && state?.token
    const stack = createNativeStackNavigator()
    return (
        <stack.Navigator initialRouteName='Login'>

            {/* check if user logged in or not  */}

            {authenticatedUser ?
                (<>
                    <stack.Screen
                        name='Home'
                        component={Home}
                        options={{
                            title: 'ArtConnect',
                            headerRight: () => <HeaderMenu />
                        }} />

                    <stack.Screen
                        name='Profile'
                        component={Profile}
                        options={{
                            title: 'ArtConnect',
                            headerRight: () => <HeaderMenu />
                        }} />

                    <stack.Screen
                        name='EventList'
                        component={EventList}
                        options={{
                            title: 'ArtConnect',
                            headerRight: () => <HeaderMenu />
                        }} />

                    <stack.Screen
                        name='ArtList'
                        component={ArtList}
                        options={{
                            title: 'ArtConnect',
                            headerRight: () => <HeaderMenu />
                        }} />

                    <stack.Screen
                        name='EventDetail'
                        component={EventDetail}
                        options={{
                            title: 'ArtConnect',
                            headerRight: () => <HeaderMenu />
                        }} />

                    <stack.Screen
                        name='ArtDetail'
                        component={ArtDetail}
                        options={{
                            title: 'ArtConnect',
                            headerRight: () => <HeaderMenu />
                        }} />
                </>)

                :

                (<>
                    <stack.Screen name='Login' component={Login} />
                    <stack.Screen name='SignUp' component={SignUp} />
                </>)
            }
        </stack.Navigator>
    )
}

export default ScreenMenu