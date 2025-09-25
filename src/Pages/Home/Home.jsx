import React from 'react';
import Banner from '../../components/Banner/Banner'
import AboutBuilding from '../../components/AboutBuilding/AboutBuilding';
import Coupons from '../../components/Coupons/Coupons';
import Map from '../../components/Map/Map';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <Coupons></Coupons>
            <Map></Map>
        </div>
    );
};

export default Home;