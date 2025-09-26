import React, { useContext } from 'react';
import { UserInfoContext } from '../Provider/UserInfoProvider/UserInfoProvider';
import { Navigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';
import Loading from '../components/Loading';

const AdminPrivateRoute = ({children}) => {
    const {userInfo} = useContext(UserInfoContext)
    const {user} = useContext(AuthContext)

    if(!userInfo) return <Loading></Loading>

    if(userInfo?.role != "ADMIN")
        return <Navigate to={'/'}></Navigate>

    return (
        children
    );
};

export default AdminPrivateRoute;