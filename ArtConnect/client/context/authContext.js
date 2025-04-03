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
        userId: "",
        token: "",
    });


    const [loading, setLoading] = useState(false)
    const [requiredUser, setRequiredUser] = useState(null)


    // initial local storage data
    useEffect(() => {
        const getLocalStorageData = async () => {
            setLoading(true)
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data) // convert to object
            setState({ ...state, user: loginData?.user, userId: loginData?.user?._id, token: loginData?.token })
            setLoading(false)
        }
        getLocalStorageData()

    }, [])

    useEffect(() => {
        if (state?.user) {
            fetchUserFollowings(state?.user?._id);
            fetchUserOrders(state?.user?.email);
        }
    }, [state])

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

    const fetchUserFavorites = async (userId) => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/auth/fetch-user-favorites/${userId}`);
            setLoading(false);
            return { arts: data.arts, events: data.events };
        } catch (error) {
            console.log(error);
            setLoading(false);
            return { arts: [], events: [] };
        }
    }

    const fetchUserFollowings = async (userId) => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/auth/fetch-user-followings/${userId}`);
            setLoading(false);
            return { followings: data.followings };
        } catch (error) {
            console.log(error);
            setLoading(false);
            return error
        }
    }

    const fetchUserOrders = async (userId) => {
        try {
            setLoading(true)
            console.log(`"getting order from forntend for:${userId}`);
            const { data } = await axios.get(`/order/fetch-orders/${userId}`);
            setLoading(false);
            return { userOrders: data.userOrders };
        } catch (error) {
            console.log(error);
            setLoading(false);
            return error
        }
    }

    const refreshUser = async () => {
        try {
            console.log("User refreshing...");
            const { data } = await axios.get(`/auth/fetch-user/${state?.user?._id}`);
            setState(prevState => ({
                ...prevState,
                user: data?.user,
            }));
            await AsyncStorage.setItem('@auth', JSON.stringify({ user: data?.user, token: state.token }));
            console.log("User refreshed!");
        } catch (error) {
            console.log("User refreshing error....!");
            console.error("Error refreshing user:", error);
        }
    };

    //defualt axios setting
    axios.defaults.headers.common["Authorization"] = `Bearer ${state?.token}`
    // axios.defaults.baseURL = "http://10.0.0.172:6969/api/g2"
    axios.defaults.baseURL = "https://react-ntive-artconnect-server.onrender.com/api/g2"


    return (
        <AuthContext.Provider value={{ loading, state, setState, requiredUser, fetchUser, refreshUser, fetchUserFavorites, fetchUserFollowings, fetchUserOrders }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }