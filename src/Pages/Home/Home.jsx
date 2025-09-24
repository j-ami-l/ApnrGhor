import React from 'react';
import Banner from '../../components/Banner/Banner'
import AboutBuilding from '../../components/AboutBuilding/AboutBuilding';
import Coupons from '../../components/Coupons/Coupons';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <Coupons></Coupons>
        </div>
    );
};

export default Home;