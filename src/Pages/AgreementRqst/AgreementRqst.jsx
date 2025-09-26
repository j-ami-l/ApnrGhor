import React, { useContext } from "react";
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
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const AgreementRqst = () => {
  const api = useAxiosSecure();
  const queryClient = useQueryClient();
  const {user} = useContext(AuthContext)

  // Fetch all pending requests
  const { data: requests = [], isLoading, isError } = useQuery({
    queryKey: ["agreementRequests"],
    queryFn: async () => {
      const res = await api.get(`/agreementrqst?email=${user.email}`);
      return res.data;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async ({ id, email }) => {
      const res = await api.patch(`/acceptagreement?email=${user.email}`, {
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
      const res = await api.delete(`/deleteagreement?id=${id}&email=${user.email}`);
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
      <div className="bg-white  rounded-lg p-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-6">
          Pending Agreement Requests
        </h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
          <Table className="w-full border-collapse">
            <Thead>
              <Tr className="bg-emerald-600 text-white">
                <Th className="border px-4 py-2">User Name</Th>
                <Th className="border px-4 py-2">User Email</Th>
                <Th className="border px-4 py-2">Floor No</Th>
                <Th className="border px-4 py-2">Block Name</Th>
                <Th className="border px-4 py-2">Apartment No</Th>
                <Th className="border px-4 py-2">Rent</Th>
                <Th className="border px-4 py-2">Request Date</Th>
                <Th className="border px-4 py-2 text-center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.length === 0 ? (
                <Tr>
                  <Td colSpan={8} className="text-center py-6 text-gray-500">
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
                      {new Date(
                        req.createdAt || req._id.getTimestamp()
                      ).toLocaleString()}
                    </Td>
                    <Td className="border px-3 py-2 text-center space-x-2">
                      <button
                        onClick={() =>
                          handleAction(req._id, req.email, "accept")
                        }
                        className="px-3 py-1 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleAction(req._id, req.email, "reject")
                        }
                        className="px-3 py-1 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
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
      </div>
    </div>
  );
};

export default AgreementRqst;
