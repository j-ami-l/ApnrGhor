import React, { useContext } from 'react';
import { UserInfoContext } from '../Provider/UserInfoProvider/UserInfoProvider';
import { Navigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';

const AdminPrivateRoute = ({children}) => {
    const {userInfo} = useContext(UserInfoContext)
    const {user} = useContext(AuthContext)

    if(!userInfo) return <h1>ladinnnnnnnnnnnnnnn</h1>

    if(userInfo?.role != "ADMIN")
        return <Navigate to={'/'}></Navigate>

    return (
        children
    );
};

export default AdminPrivateRoute;