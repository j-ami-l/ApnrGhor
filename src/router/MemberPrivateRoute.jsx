import React, { useContext } from 'react';
import { UserInfoContext } from '../Provider/UserInfoProvider/UserInfoProvider';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';

const MemberPrivateRoute = ({children}) => {
    const { userInfo } = useContext(UserInfoContext)
    const { user } = useContext(AuthContext)

    if (!userInfo) return <h1>ladinnnnnnnnnnnnnnn</h1>

    if (userInfo?.role != "member")
        return <Navigate to={'/'}></Navigate>

    return (
        children
    );
};

export default MemberPrivateRoute;