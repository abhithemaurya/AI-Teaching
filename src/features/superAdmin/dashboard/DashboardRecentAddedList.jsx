"use client";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardRecentAddedList = ({
  title = "Recent Users",
  data = [],
  loading = false,
  route,
}) => {
  const recentData = data.slice(0, 5);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(route)}
      className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 cursor-pointer"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr className="text-left">
              <th className="px-3 py-2 font-medium">ID</th>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Email</th>
              <th className="px-3 py-2 font-medium">Role</th>
              <th className="px-3 py-2 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : recentData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No data available
                </td>
              </tr>
            ) : (
              recentData.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-gray-100 text-gray-500">
                      #{item.id}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-800">{item.name}</td>
                  <td className="px-3 py-2 text-gray-600 max-w-[200px] truncate">
                    {item.email}
                  </td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-blue-50 text-blue-600">
                      {item.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-400">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">
        {loading ? (
          <p className="text-center py-6 text-gray-400 text-sm">Loading...</p>
        ) : recentData.length === 0 ? (
          <p className="text-center py-6 text-gray-400 text-sm">No data available</p>
        ) : (
          recentData.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between border border-gray-100 rounded-xl p-3 hover:bg-gray-50"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-gray-800 truncate">
                  {item.name}
                </span>
                <span className="text-xs text-gray-500 truncate">{item.email}</span>
                <span className="text-xs text-gray-400">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "-"}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-blue-50 text-blue-600">
                  {item.role}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-gray-100 text-gray-500">
                  #{item.id}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardRecentAddedList;