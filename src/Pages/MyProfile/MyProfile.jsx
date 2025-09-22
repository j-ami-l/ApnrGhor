import React, { useContext } from "react";
import { UserInfoContext } from "../../Provider/UserInfoProvider/UserInfoProvider";

const MyProfile = () => {
  const { userInfo } = useContext(UserInfoContext);

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No user info available</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center  p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center border border-gray-100">
        {/* Avatar */}
        <div className="flex justify-center">
          <img
            src={userInfo.photoURL || "https://i.ibb.co/2FsfXqM/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-emerald-500 object-cover shadow-md"
          />
        </div>

        {/* Name */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {userInfo.name || "Unnamed User"}
        </h2>

        {/* Email */}
        <p className="text-gray-500">{userInfo.email}</p>

        
      </div>
    </div>
  );
};

export default MyProfile;
