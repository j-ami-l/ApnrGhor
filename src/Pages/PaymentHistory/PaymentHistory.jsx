import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const api = useAxiosSecure();

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await api.get(`/paymenthistory?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center">Loading payment history...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load data</p>;

  return (
    <div className="p-4 w-11/12 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Payment History</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200 ">
        <Table className="w-full border-collapse">
          <Thead className="bg-emerald-600 text-white">
            <Tr>
              <Th className="px-4 py-2 border">#</Th>
              <Th className="px-4 py-2 border">Month</Th>
              <Th className="px-4 py-2 border">Year</Th>
              <Th className="px-4 py-2 border">Amount</Th>
              <Th className="px-4 py-2 border">Paid At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {payments?.map((p, idx) => (
              <Tr key={idx} className="text-center hover:bg-gray-50">
                <Td className="border px-4 py-2">{idx + 1}</Td>
                <Td className="border px-4 py-2">{p.paid_month}</Td>
                <Td className="border px-4 py-2">{p.paid_year}</Td>
                <Td className="border px-4 py-2">{p.paymentAmount}৳</Td>
                <Td className="border px-4 py-2">
                  {new Date(p.createdAt).toLocaleDateString()}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistory;
