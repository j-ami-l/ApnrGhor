import React from 'react';
import { Link } from 'react-router';
import errorImg from '../../assets/error_img.png';

const ERROR = () => {
    return (
        <div className='mt-30'>
            {/* Overlay for darkening the background a bit */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative text-center text-white px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Oops! Page Not Found
                </h1>
                <Link to="/">
                    <button className="mt-4 sm:mt-6 px-6 py-2 sm:px-8 sm:py-3 bg-white text-black rounded font-semibold shadow-md transition hover:bg-gray-200">
                        Back To Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ERROR;
