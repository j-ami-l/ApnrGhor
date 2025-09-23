import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import AddCouponsModal from "../AddCouponsModal/AddCouponsModal";

const fetchCoupons = async () => {
  const res = await axios.get("http://localhost:5000/coupons");
  return res.data;
};

const AllCoupons = () => {
  const { data: coupons = [], isLoading, isError , refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: fetchCoupons,
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
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
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="5" className="text-center p-4 text-gray-500">
                  No coupons found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
      <AddCouponsModal refetch={refetch}></AddCouponsModal>
    </div>
  );
};

export default AllCoupons;
