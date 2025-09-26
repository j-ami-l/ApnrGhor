import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaLock, FaLockOpen } from "react-icons/fa";
import AddCouponsModal from "../AddCouponsModal/AddCouponsModal";
import Loading from "../Loading";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllCoupons = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const api = useAxiosSecure();

  const { data: coupons = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await api.get(`/couponsAdmin?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Mutation to toggle coupon status
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await api.patch(
        `/couponsstatus?id=${id}&email=${user.email}`,
        { status }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Coupon status updated ✅");
      queryClient.invalidateQueries(["coupons"]);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to update status ❌";
      toast.error(message);
    },
  });

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "public" ? "private" : "public";
    toggleStatusMutation.mutate({ id, status: newStatus });
  };

  if (isLoading) return <Loading />;
  if (isError) {
    toast.error("Failed to fetch coupons");
    return <p className="text-center text-red-500">Error loading coupons</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">
        Manage Coupons
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
        <Table className="w-full border-collapse">
          <Thead className="bg-emerald-600 text-white">
            <Tr>
              <Th className="p-3 text-left">#</Th>
              <Th className="p-3 text-left">Coupon Code</Th>
              <Th className="p-3 text-left">Discount (%)</Th>
              <Th className="p-3 text-left">Description</Th>
              <Th className="p-3 text-left">Created By</Th>
              <Th className="p-3 text-left">Status</Th>
              <Th className="p-3 text-left">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon, idx) => (
                <Tr
                  key={coupon._id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-emerald-50 transition"
                >
                  <Td className="p-3">{idx + 1}</Td>
                  <Td className="p-3 font-semibold text-emerald-700">
                    {coupon.code}
                  </Td>
                  <Td className="p-3">{coupon.discount}%</Td>
                  <Td className="p-3 text-gray-700">{coupon.description}</Td>
                  <Td className="p-3 text-gray-500">
                    {coupon.createdBy || "Admin"}
                  </Td>
                  <Td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${coupon.status === "public"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {coupon.status}
                    </span>
                  </Td>
                  <Td className="p-3">
                    <div className="relative group inline-block">
                      <button
                        onClick={() => handleToggleStatus(coupon._id, coupon.status)}
                        disabled={toggleStatusMutation.isLoading}
                        className={`text-xl cursor-pointer ${toggleStatusMutation.isLoading
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-emerald-600 hover:text-emerald-800"
                          }`}
                      >
                        {coupon.status === "private" ? <FaLock /> : <FaLockOpen />}
                      </button>

                      {/* Tooltip */}
                      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                   bg-gray-800 text-white text-xs rounded py-1 px-2 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                   pointer-events-none whitespace-nowrap z-50">
                        {coupon.status === "private" ? "Make it public" : "Make it private"}
                      </span>
                    </div>


                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="7" className="text-center p-4 text-gray-500">
                  No coupons found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>

      <AddCouponsModal refetch={refetch} />
    </div>
  );
};

export default AllCoupons;
