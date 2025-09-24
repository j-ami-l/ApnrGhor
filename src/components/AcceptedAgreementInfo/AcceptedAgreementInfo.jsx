import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AcceptedAgreementInfo = () => {
  const { user } = useContext(AuthContext);
  const api = useAxiosSecure();

  const { data: agreement, isLoading, isError } = useQuery({
    queryKey: ["specificagreement", user?.email],
    enabled: !!user?.email, // only fetch when email exists
    queryFn: async () => {
      const res = await api.get(`/specificagreement?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-6">Loading agreement...</p>;
  if (isError) return <p className="text-center mt-6 text-red-500">Failed to load agreement ❌</p>;
//   if (!agreement?._id) return <p className="text-center mt-6">No accepted agreement found</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 border">
      { agreement._id ? <h2 className="text-2xl font-bold text-emerald-700 mb-4 text-center">
        Accepted Agreement ✅
      </h2> : <h2 className="text-2xl font-bold text-orange-400 mb-4 text-center">
        Agreement Pending
      </h2>}
      <div className="space-y-2 text-gray-700">
        <p><span className="font-semibold">Email:</span> {agreement.email}</p>
        <p><span className="font-semibold">Floor No:</span> {agreement.floor_no}</p>
        <p><span className="font-semibold">Block:</span> {agreement.block_name}</p>
        <p><span className="font-semibold">Apartment:</span> {agreement.apartment_no}</p>
        <p><span className="font-semibold">Rent:</span> {agreement.rent}৳</p>
        <p className="text-green-600 font-semibold">
          Status: {agreement.status}
        </p>
        <p className="text-sm text-gray-500">
          Created At: {new Date(agreement.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default AcceptedAgreementInfo;
