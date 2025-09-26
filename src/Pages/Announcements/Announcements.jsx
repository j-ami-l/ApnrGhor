import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Megaphone } from "lucide-react"; // icon
import Loading from "../../components/Loading";

const Announcements = () => {
  const api = useAxiosSecure();

  // fetch announcements
  const { data: announcements = [], isLoading, isError } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await api.get("/announcements");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load announcements ❌
      </div>
    );
  }

  return (
    <div className="p-6 max-w-11/12 mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <Megaphone className="text-emerald-600 w-8 h-8" />
        <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
      </div>

      {announcements.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No announcements available
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((item) => {
            const createdAt =
              item.createdAt ||
              new Date(parseInt(item._id.toString().substring(0, 8), 16) * 1000);

            return (
              <div
                key={item._id}
                className="bg-gradient-to-br from-white to-gray-50 border rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
              >
                {/* Title */}
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  {item.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 flex-grow leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Footer */}
                <div className="border-t pt-3 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                      {item.name?.charAt(0) || "A"}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Announcements;
