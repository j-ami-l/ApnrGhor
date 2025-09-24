import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const PaymentDetails = () => {
  const api = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [month, setMonth] = useState("");

  const { data: agreement, isLoading, isError } = useQuery({
    queryKey: ["specificagreement", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/specificagreement?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-6">Loading agreement...</p>;
  if (isError)
    return (
      <p className="text-center mt-6 text-red-500">
        Failed to load agreement ❌
      </p>
    );

  const handlePayment = (e) => {
    e.preventDefault();
    if (!month) return alert("Please select a month to pay for.");

    // Navigate to payment page with id and month info
    navigate(`/dashboard/makepayment/${agreement._id}?month=${month}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-emerald-700 text-center mb-6">
        Payment Form
      </h2>

      <form onSubmit={handlePayment} className="space-y-4">
        {/* Member Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Member Email
          </label>
          <input
            type="email"
            value={agreement?.email || ""}
            readOnly
            className="w-full rounded-lg border-gray-300 bg-gray-100 px-3 py-2"
          />
        </div>

        {/* Floor */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Floor</label>
          <input
            type="text"
            value={agreement?.floor_no || ""}
            readOnly
            className="w-full rounded-lg border-gray-300 bg-gray-100 px-3 py-2"
          />
        </div>

        {/* Block Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Block Name
          </label>
          <input
            type="text"
            value={agreement?.block_name || ""}
            readOnly
            className="w-full rounded-lg border-gray-300 bg-gray-100 px-3 py-2"
          />
        </div>

        {/* Apartment No / Room No */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Apartment / Room No
          </label>
          <input
            type="text"
            value={agreement?.apartment_no || ""}
            readOnly
            className="w-full rounded-lg border-gray-300 bg-gray-100 px-3 py-2"
          />
        </div>

        {/* Rent */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Rent (৳)
          </label>
          <input
            type="text"
            value={agreement?.rent || ""}
            readOnly
            className="w-full rounded-lg border-gray-300 bg-gray-100 px-3 py-2"
          />
        </div>

        {/* Month Selector */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Month to Pay
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full rounded-lg border-gray-300 px-3 py-2"
            required
          >
            <option value="">Select Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition
            bg-emerald-700 hover:bg-emerald-800 cursor-pointer
          `}
        >
          Make Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentDetails;
