import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
export const UserInfoContext = createContext()

const UserInfoProvider = ({ children }) => {
    const api = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const { data: userInfo = null, isFetching, refetch, isError, error } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            if (!user) return []
            const res = await api.get(`/user?email=${user.email}`)
            setLoading(false)
            return res.data;
        },
        enabled: !!user
    })

    const info = {
        userInfo,
        loading
    }

    return (
        <UserInfoContext.Provider value={info}>{children}</UserInfoContext.Provider>
    );
};

export default UserInfoProvider;