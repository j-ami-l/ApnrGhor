import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const AllMember = () => {
  const queryClient = useQueryClient();
  const api = useAxiosSecure();

  // Fetch all members
  const { data: members = [], isLoading, isError } = useQuery({
    queryKey: ["allmembers"],
    queryFn: async () => {
      const res = await api.get("/allmembers");
      return res.data;
    },
  });

  // Mutation: remove member
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.patch(`/removemember/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Member removed ❌");
      queryClient.invalidateQueries(["allmembers"]);
    },
    onError: () => {
      toast.error("Failed to remove member");
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This member will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load members
      </div>
    );

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">
        All Members
      </h1>

      <Table className="border border-gray-200 w-full mx-auto">
        <Thead>
          <Tr className="bg-gray-100">
            <Th className="border px-4 py-2">User Name</Th>
            <Th className="border px-4 py-2">User Email</Th>
            <Th className="border px-4 py-2">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members.length === 0 ? (
            <Tr>
              <Td colSpan={3} className="text-center py-4">
                No members found
              </Td>
            </Tr>
          ) : (
            members.map((member) => (
              <Tr key={member._id} className="hover:bg-gray-50">
                <Td className="border px-4 py-2">{member.name}</Td>
                <Td className="border px-4 py-2">{member.email}</Td>
                <Td className="border px-4 py-2">
                  <button
                    onClick={() => handleRemove(member._id)}
                    disabled={removeMutation.isLoading}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-full transition disabled:opacity-50"
                  >
                    Remove
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

export default AllMember;
