import React, { useContext } from 'react';
import { UserInfoContext } from '../Provider/UserInfoProvider/UserInfoProvider';
import { Navigate } from 'react-router';

const AdminPrivateRoute = ({children}) => {
    const {userInfo} = useContext(UserInfoContext)



    if(userInfo?.role != "ADMIN")
        return <Navigate to={'/'}></Navigate>

    return (
        children
    );
};

export default AdminPrivateRoute;