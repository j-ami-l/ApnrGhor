import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { UserInfoContext } from "../../Provider/UserInfoProvider/UserInfoProvider";

const AddAnnouncement = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { user } = useContext(AuthContext)
    const {userInfo} = useContext(UserInfoContext)

    const mutation = useMutation({
        mutationFn: async (newAnnouncement) => {
            const res = await axios.post(
                "http://localhost:5000/announcment",
                newAnnouncement
            );
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Announcement added!");
            setTitle("");
            setDescription("");
        },
        onError: () => {
            toast.error("Failed to add announcement");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ title, description, email: user.email , name : userInfo?.name });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-emerald-700 mb-6">
                    Make an Announcement
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter announcement title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Write your announcement details here..."
                            rows={5}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <FiSend className="text-lg" />
                        {mutation.isLoading ? "Submitting..." : "Publish Announcement"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAnnouncement;
