import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
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

const AgreementRqst = () => {
  const api = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all pending requests
  const { data: requests = [], isLoading, isError } = useQuery({
    queryKey: ["agreementRequests"],
    queryFn: async () => {
      const res = await api.get("/agreementrqst");
      return res.data;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async ({ id, email }) => {
      const res = await api.patch("/acceptagreement", {
        email,
        agree_id: id,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Agreement accepted ✅");
      queryClient.invalidateQueries(["agreementRequests"]);
    },
    onError: () => {
      toast.error("Failed to accept agreement ❌");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/deleteagreement/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Agreement rejected ❌");
      queryClient.invalidateQueries(["agreementRequests"]);
    },
    onError: () => {
      toast.error("Failed to reject agreement ❌");
    },
  });

  // Mutation for accept/reject
  const handleAction = (id, email, action) => {
    if (action === "accept") {
      acceptMutation.mutate({ id, email });
    } else if (action === "reject") {
      rejectMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load agreement requests
      </div>
    );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-2xl ml-5 sm:text-3xl font-bold text-emerald-700 mb-6">
        Pending Agreement Requests
      </h1>

      <Table className="border border-gray-200 max-w-11/12 mx-auto">
        <Thead>
          <Tr className="bg-gray-100">
            <Th className="border px-4 py-2">User Name</Th>
            <Th className="border px-4 py-2">User Email</Th>
            <Th className="border px-4 py-2">Floor No</Th>
            <Th className="border px-4 py-2">Block Name</Th>
            <Th className="border px-4 py-2">Apartment No</Th>
            <Th className="border px-4 py-2">Rent</Th>
            <Th className="border px-4 py-2">Request Date</Th>
            <Th className="border px-4 py-2">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.length === 0 ? (
            <Tr>
              <Td colSpan={8} className="text-center py-4">
                No pending requests
              </Td>
            </Tr>
          ) : (
            requests.map((req) => (
              <Tr key={req._id} className="hover:bg-gray-50">
                <Td className="border px-4 py-2">{req.name}</Td>
                <Td className="border px-4 py-2">{req.email}</Td>
                <Td className="border px-4 py-2">{req.floor_no}</Td>
                <Td className="border px-4 py-2">{req.block_name}</Td>
                <Td className="border px-4 py-2">{req.apartment_no}</Td>
                <Td className="border px-4 py-2">BDT {req.rent}</Td>
                <Td className="border px-4 py-2">
                  {new Date(req.createdAt || req._id.getTimestamp()).toLocaleString()}
                </Td>
                <Td className="border px-3 py-2">
                  <button
                    onClick={() => handleAction(req._id, req.email, "accept")}
                    className="px-2.5 mb-1 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req._id, req.email, "reject")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Reject
                  </button>

                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default AgreementRqst;
