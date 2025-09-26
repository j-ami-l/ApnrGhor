import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchCoupons = async () => {
  const res = await fetch("http://localhost:5000/coupons");
  if (!res.ok) throw new Error("Failed to fetch coupons");
  return res.json();
};

const Coupons = () => {
  const {
    data: coupons = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: fetchCoupons,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-dots loading-lg text-emerald-600"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error fetching coupons: {error.message}
      </div>
    );
  }

  return (
    <section className="py-16 px-6 max-w-11/12 mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-emerald-700 mb-12">
        Exclusive Coupons
      </h2>

      {coupons.length === 0 ? (
        <p className="text-center text-gray-500">
          No coupons available right now.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition hover:shadow-2xl hover:scale-[1.02] duration-300"
            >
              {/* Discount Badge */}
              <span className="absolute -top-3 -right-3 bg-emerald-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                {coupon.discount}% OFF
              </span>

              {/* Coupon Info */}
              <h3 className="text-xl font-bold text-emerald-700 mb-3">
                {coupon.description || "Special Discount"}
              </h3>

              {/* Coupon Code */}
              <div className="flex items-center justify-between bg-gray-100 border border-dashed border-emerald-500 rounded-lg p-3 mb-4">
                <span className="font-mono text-lg font-bold text-emerald-700">
                  {coupon.code}
                </span>
                <button
                  className="text-sm bg-emerald-600 text-white px-3 py-1 rounded-md hover:bg-emerald-700 transition"
                  onClick={() => navigator.clipboard.writeText(coupon.code)}
                >
                  Copy
                </button>
              </div>

              {/* Created Date */}
              <p className="text-xs text-gray-400">
                Added: {new Date(coupon.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Coupons;
