import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const AddCouponsModal = ({refetch}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const { user } = useContext(AuthContext);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");

  // Mutation for posting coupon
  const mutation = useMutation({
    mutationFn: async (newCoupon) => {
      const res = await axios.post("http://localhost:5000/addcoupons", newCoupon);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Coupon added successfully!");
      setCouponCode("");
      setDiscount("");
      setDescription("");
      setIsOpen(false);
      refetch();
    },
    onError: () => {
      toast.error("Failed to add coupon");
    },
  });

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    mutation.mutate({
      code: couponCode,
      discount: parseFloat(discount),
      description,
      createdBy: user?.email || "admin",
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Add Coupons
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/50 px-2">
          <div
            className="relative shadow-2xl bg-white p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            ref={modalRef}
          >
            <button
              className="absolute top-[10px] right-[10px] text-gray-600 hover:text-red-600 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-emerald-700 mb-4">
              Add New Coupon
            </h2>

            <form onSubmit={handleSubmitUpdate} className="space-y-5">
              {/* Coupon Code */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  required
                  placeholder="e.g., SAVE20"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Discount Percentage */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                  placeholder="e.g., 20"
                  min="1"
                  max="100"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe the coupon..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {mutation.isLoading ? "Adding..." : "Add Coupon"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCouponsModal;
