import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

// contex 
const AuthContext = createContext()

//provider
const AuthProvider = ({ children }) => {
    // global state
    const [state, setState] = useState({
        user: null,
        token: "",
    });

    const [loading, setLoading] = useState(false)
    const [requiredUser, setRequiredUser] = useState()


    // initial local storage data
    useEffect(() => {
        const getLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data) // convert to object
            setState({ ...state, user: loginData?.user, token: loginData?.token });
        }
        getLocalStorageData()
        console.log(state);

    }, [])

    // get user
    const fetchUser = async (userId) => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/auth/fetch-user/${userId}`);
            setLoading(false);
            setRequiredUser(data?.user);
            return data?.user;
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    //defualt axios setting
    axios.defaults.headers.common["Authorization"] = `Bearer ${state?.token}`
    // axios.defaults.baseURL = "http://10.0.0.172:6969/api/g2"
    axios.defaults.baseURL = "https://react-ntive-artconnect-server.onrender.com/api/g2"


    return (
        <AuthContext.Provider value={{ state, setState, requiredUser, fetchUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }