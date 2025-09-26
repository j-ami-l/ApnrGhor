import React from 'react';
import { Link } from 'react-router';

const ERROR = () => {
    return (
        <div className=''>
            <div className='lg:w-[60%] mx-auto mt-20'>
                <h1>Errorrrrrrr</h1>
            </div>
            <div className='flex items-center justify-center mt-5'>
                <Link to={'/'}><button className='cursor-pointer px-6 py-2 bg-green-600  rounded font-semibold shadow-md transition text-white'>Back To Home</button></Link>
            </div>
        </div>
    );
};

export default ERROR;