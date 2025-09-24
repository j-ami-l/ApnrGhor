import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../../assets/b_1.jpg"; // replace with real images
import banner2 from "../../assets/b_2.jpg";
import banner3 from "../../assets/b_3.jpg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative w-11/12 mx-auto rounded-2xl my-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-[75vh] w-full rounded-2xl"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-[75vh] w-full">
            <img
              src={banner1}
              alt="Modern building"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Welcome to <span className="text-emerald-400">Smart Living</span>
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mb-6">
                Manage apartments, agreements, and announcements seamlessly with
                our building management system.
              </p>
              <div className="flex gap-4">
                <Link to="/apartments">
                  <button className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition">
                    Explore Apartments
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button className="px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-emerald-600 hover:border-emerald-600 transition">
                    Go to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-[75vh] w-full">
            <img
              src={banner2}
              alt="Luxury apartments"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Modern <span className="text-emerald-400">Apartments</span>
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mb-6">
                Discover premium living spaces with affordable rent and
                professional management.
              </p>
              <Link to="/apartments">
                <button className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition">
                  View Apartments
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-[75vh] w-full">
            <img
              src={banner3}
              alt="Community living"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Easy <span className="text-emerald-400">Management</span>
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mb-6">
                From agreements to announcements — everything is digital,
                transparent, and hassle-free.
              </p>
              <Link to="/dashboard">
                <button className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition">
                  Go to Dashboard
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
