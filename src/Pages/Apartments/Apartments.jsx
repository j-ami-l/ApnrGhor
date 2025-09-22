import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserInfoContext } from "../../Provider/UserInfoProvider/UserInfoProvider";
import toast from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const fetchApartments = async (page) => {
    const res = await axios.get(
        `http://localhost:5000/apartments?page=${page}&limit=6`
    );
    return res.data;
};

const Apartments = () => {
    const [page, setPage] = useState(1);
    const {user} = useContext(AuthContext)
    const [submittingId, setSubmittingId] = useState(null);
    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["apartments", page],
        queryFn: () => fetchApartments(page),
        keepPreviousData: true,
    });

    const handleAgreement = async (apt) => {
        if (!user?.name || !user?.email) {
            toast.error("You must be logged in to apply.", {
                style: {
                    borderRadius: "10px",
                    background: "#F87171", // red-400
                    color: "#fff",
                },
                icon: <XCircle size={20} />,
            });
            return;
        }

        setSubmittingId(apt._id);

        const agreementData = {
            name: user?.name,
            email: user?.email,
            floor_no: apt.floor_no,
            block_name: apt.block_name,
            apartment_no: apt.apartment_no,
            rent: apt.rent,
        };

        try {
            const res = await axios.post(
                "http://localhost:5000/addagreement",
                agreementData
            );
            toast.success(res.data.message || "Agreement request sent!", {
                style: {
                    borderRadius: "10px",
                    background: "#4ADE80",
                    color: "#fff",
                },
                icon: <CheckCircle size={20} />,
            });
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to send agreement request",
                {
                    style: {
                        borderRadius: "10px",
                        background: "#F87171",
                        color: "#fff",
                    },
                    icon: <XCircle size={20} />,
                }
            );
        } finally {
            setSubmittingId(null);
        }
    };

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError)
        return (
            <div className="text-center mt-10 text-red-500">Error fetching data</div>
        );

    const { apartments, totalPages } = data;

    return (
        <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-10 text-center text-green-700 tracking-tight">
                Available Apartments
            </h1>

            {/* Apartments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {apartments.map((apt) => (
                    <div
                        key={apt._id}
                        className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={apt.image_url}
                                alt={apt.apartment_no}
                                className="w-full h-56 sm:h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-lg">
                                BDT {apt.rent}
                            </span>
                        </div>

                        <div className="p-4 sm:p-6 flex flex-col justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                                {apt.block_name} – {apt.apartment_no}
                            </h2>
                            <p className="text-gray-600 mb-3 sm:mb-4">Floor: {apt.floor_no}</p>

                            <button
                                onClick={() => handleAgreement(apt)}
                                disabled={submittingId === apt._id} // disable while this apt is submitting
                                className={`mt-auto cursor-pointer w-full py-2 sm:py-3 text-sm sm:text-base font-medium rounded-xl transition-colors duration-300 shadow-sm hover:shadow-md ${submittingId === apt._id
                                        ? "bg-gray-400 text-white cursor-not-allowed"
                                        : "bg-green-600 text-white hover:bg-green-700"
                                    }`}
                            >
                                {submittingId === apt._id ? "Processing..." : "Agreement"}
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center mt-10 gap-2 sm:gap-3">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1 || isFetching}
                    className="min-w-[2.5rem] px-3 sm:px-4 py-2 bg-green-600 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-green-700 transition"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num)}
                        disabled={isFetching}
                        className={`min-w-[2.5rem] px-3 sm:px-4 py-2 text-sm rounded-lg transition-colors ${page === num
                            ? "bg-green-600 text-white"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                    >
                        {num}
                    </button>
                ))}

                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages || isFetching}
                    className="min-w-[2.5rem] px-3 sm:px-4 py-2 bg-green-600 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-green-700 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Apartments;
