import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router';

const PaymentDetails = () => {
    const api = useAxiosSecure()
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
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


    const handePyment = (id) =>{
        navigate(`/dashboard/makepayment/${id}`)
    }   

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-emerald-700 text-center mb-6">
                Payment Confirmation
            </h2>

            {/* Agreement Info */}
            <div className="space-y-3">
                <p><span className="font-semibold text-gray-700">Name:</span> {agreement?.name}</p>
                <p><span className="font-semibold text-gray-700">Email:</span> {agreement?.email}</p>
                <p><span className="font-semibold text-gray-700">Floor:</span> {agreement?.floor_no}</p>
                <p><span className="font-semibold text-gray-700">Block:</span> {agreement?.block_name}</p>
                <p><span className="font-semibold text-gray-700">Apartment:</span> {agreement?.apartment_no}</p>
                <p>
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span
                        className={`ml-2 px-2 py-1 rounded-full text-sm ${agreement?.status === "checked"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {agreement?.status}
                    </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                    Rent: <span className="text-emerald-600">৳{agreement?.rent}</span>
                </p>
            </div>

            {/* Proceed Button */}
            <div className="mt-6 flex justify-center">
                <button onClick={()=>handePyment(agreement._id)} disabled={!agreement || agreement.paid}
                    className={`px-6 py-3  rounded-lg ${!agreement.paid ? "bg-emerald-700 cursor-pointer" : "bg-emerald-200  "} text-white font-semibold shadow-md cursor-not-allowed transition`}
                >
                    {!agreement.paid ? "Make Payment" : "Payment Done"}
                </button>
            </div>
        </div>
    );
};

export default PaymentDetails;
