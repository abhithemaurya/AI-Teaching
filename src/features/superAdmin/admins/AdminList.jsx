"use client";

import { Pencil, Search, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useAdminsStore } from "./stores/adminStore";

const AdminList = () => {
  const { admins, fetchAdmins, deleteAdmin, loading, setEditAdmin } =
    useAdminsStore();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const filteredAdmins = useMemo(() => {
    if (!search.trim()) return admins;
    const s = search.toLowerCase();
    return admins.filter(
      (a) =>
        a.name?.toLowerCase().includes(s) ||
        a.email?.toLowerCase().includes(s) ||
        a.phone?.includes(s)
    );
  }, [admins, search]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteAdmin(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="bg-white px-4 py-3 rounded-2xl shadow-md border border-gray-100 relative">

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-lg p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Delete Admin</h3>
            <p className="text-sm text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h2 className="font-semibold text-base tracking-tight">Admin List</h2>
        <div className="flex items-center gap-2  sm:w-64 border border-gray-200 rounded-lg px-2.5 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:block overflow-y-auto max-h-[500px] border border-gray-200 rounded-lg">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-left text-gray-500">
              <th className="px-3 py-2 w-[70px] font-medium">ID</th>
              <th className="px-3 py-2 w-[140px] font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Contact</th>
              <th className="px-3 py-2 w-[110px] font-medium">Role</th>
              <th className="px-3 py-2 w-[110px] font-medium">Created</th>
              <th className="px-3 py-2 text-center w-[80px] font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">Loading...</td>
              </tr>
            ) : filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">No admins found</td>
              </tr>
            ) : (
              filteredAdmins.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-gray-100 text-gray-500">
                      #{admin.id}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-800 truncate">
                    {admin.name}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col">
                      <span className="text-gray-700 truncate">{admin.email}</span>
                      <span className="text-gray-400 text-xs">{admin.phone || "-"}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-blue-50 text-blue-600">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-400 text-xs">
                    {admin.createdAt
                      ? new Date(admin.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditAdmin(admin)}
                        className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(admin.id)}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded-md"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
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
        ) : filteredAdmins.length === 0 ? (
          <p className="text-center py-6 text-gray-400 text-sm">No admins found</p>
        ) : (
          filteredAdmins.map((admin) => (
            <div
              key={admin.id}
              className="border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-gray-100 text-gray-500 shrink-0">
                    #{admin.id}
                  </span>
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {admin.name}
                  </span>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => setEditAdmin(admin)}
                    className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteId(admin.id)}
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded-md"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2 pl-1">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-gray-600 truncate">{admin.email}</span>
                  {admin.phone && (
                    <span className="text-xs text-gray-400">{admin.phone}</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-blue-50 text-blue-600">
                    {admin.role}
                  </span>
                  <span className="text-xs text-gray-400">
                    {admin.createdAt
                      ? new Date(admin.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminList;