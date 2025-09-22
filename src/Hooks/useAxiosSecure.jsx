import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';

const useAxiosSecure = () => {
    const api = axios.create({
        baseURL : import.meta.env.VITE_URL
    })
    const {user} = useContext(AuthContext)

    api.interceptors.request.use(
        (config)=>{
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        }
    )


    return api;
};

export default useAxiosSecure;