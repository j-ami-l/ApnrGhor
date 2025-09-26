import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';

const useAxiosSecure = () => {
    const api = axios.create({
        baseURL: import.meta.env.VITE_URL
    })
    const { user , logout } = useContext(AuthContext)

    api.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        }
    )
    api.interceptors.response.use(response => {
        return response
    }, error => {
        if (error.status === 401) {
            logout()
                .then(() => {
                }).catch((error) => {
                });
        }


        return Promise.reject(error)
    })

    return api;
};

export default useAxiosSecure;