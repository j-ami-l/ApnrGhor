import React from 'react';
import MyProfile from '../MyProfile/MyProfile';
import AdminAccessInfo from '../../components/AdminAccessInfo/AdminAccessInfo';

const AdminProfile = () => {
    return (
        <div>
            <MyProfile></MyProfile>
            <AdminAccessInfo></AdminAccessInfo>
        </div>
    );
};

export default AdminProfile;