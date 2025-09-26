import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AdminAccessInfo = () => {
    const api = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const res = await api.get('/dashboard-stats');
            return res.data;
        },
    });

    if (isLoading) return <div className="text-center mt-10">Loading stats...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Failed to fetch stats</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-xl p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Total Rooms</h3>
                <p className="text-3xl font-bold text-green-600">{data.totalRooms}</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Available Rooms</h3>
                <p className="text-3xl font-bold text-green-600">{data.availablePercentage}</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Unavailable Rooms</h3>
                <p className="text-3xl font-bold text-red-600">{data.unavailablePercentage}</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Users</h3>
                <p className="text-3xl font-bold text-blue-600">{data.users}</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Members</h3>
                <p className="text-3xl font-bold text-purple-600">{data.members}</p>
            </div>
        </div>
    );
};

export default AdminAccessInfo;
