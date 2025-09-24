import React from 'react';
import MyProfile from '../MyProfile/MyProfile';
import AcceptedAgreementInfo from '../../components/AcceptedAgreementInfo/AcceptedAgreementInfo';

const UserProfile = () => {
    return (
        <div>
            <MyProfile></MyProfile>
            <AcceptedAgreementInfo></AcceptedAgreementInfo>
        </div>
    );
};

export default UserProfile;