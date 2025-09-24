import React from "react";
import b1 from '../../assets/building1.jpg'
import b2 from '../../assets/building2.jpg'
import b3 from '../../assets/building3.jpg'
import b4 from '../../assets/building4.jpg'

const AboutBuilding = () => {
    return (
        <section className="py-16 px-6 max-w-11/12 mx-auto">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-emerald-700 mb-8">
                About Our Building
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4 relative">
                    <img src={b1} alt="Building 1" className="w-full h-56 object-cover rounded-xl shadow-md" />
                    <img src={b2} alt="Building 2" className="w-full h-72 object-cover rounded-xl shadow-md translate-y-6" />
                    <img src={b3} alt="Building 3" className="w-full h-72 object-cover rounded-xl shadow-md -translate-y-6" />
                    <img src={b4} alt="Building 4" className="w-full mt-3 h-56 object-cover rounded-xl shadow-md" />
                </div>



                {/* Description */}
                <div>
                    <h3 className="text-2xl font-semibold text-emerald-800 mb-4">
                        Modern Living in the Heart of the City
                    </h3>
                    <p className="text-gray-600 poiret-one-regular  leading-relaxed mb-4">
                        Our building offers a perfect blend of modern architecture and
                        comfortable living. With state-of-the-art facilities, spacious
                        apartments, and a safe environment, it is designed to meet the
                        lifestyle needs of families and professionals alike.
                    </p>
                    <p className="text-gray-600 poiret-one-regular leading-relaxed mb-4">
                        Located in a prime area, residents enjoy easy access to shopping
                        centers, schools, hospitals, and transport facilities. The building
                        also features 24/7 security, high-speed elevators, underground
                        parking, and a community space for events.
                    </p>
                    <p className="text-gray-600 poiret-one-regular leading-relaxed">
                        Whether you’re looking for a peaceful home or a modern apartment
                        with convenience at your doorstep, our building is the right choice
                        for you.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutBuilding;
