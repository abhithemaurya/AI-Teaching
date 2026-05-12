"use client";

import { Pencil, Search, Trash2, Filter, Check, X, Phone, Mail, Building, Calendar } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useTeacherStore } from "./stores/teacherStore";
import CreateTeacherForm from "./CreateTeacherForm";

const getStatusClass = (status) => {
  const u = (status || "").toUpperCase();
  if (u === "APPROVE" || u === "APPROVED") return "approved";
  if (u === "REJECT" || u === "REJECTED") return "rejected";
  return "pending";
};

const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();


const StatusBadge = ({ status }) => {
  const s = getStatusClass(status);
  const map = {
    approved: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0", dot: "#22c55e", label: "Approved" },
    rejected: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca", dot: "#ef4444", label: "Rejected" },
    pending:  { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe", dot: "#8b5cf6", label: "Pending"  },
  };
  const c = map[s];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 9px", borderRadius:999, fontSize:11, fontWeight:500, whiteSpace:"nowrap", backgroundColor:c.bg, color:c.text, border:`1px solid ${c.border}` }}>
      <span style={{ width:5, height:5, borderRadius:"50%", backgroundColor:c.dot, flexShrink:0 }} />
      {c.label}
    </span>
  );
};


const TeacherCard = ({ t, onApprove, onEdit, onDelete, onToggle, busy }) => {
  const isApproved = getStatusClass(t.status) === "approved";
  const isRejected = getStatusClass(t.status) === "rejected";

  return (
    <div className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm">

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-sm font-semibold flex-shrink-0">
            {getInitials(t.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{t.name}</p>
            <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-blue-50 text-blue-500 text-[10px] font-semibold uppercase tracking-wide">
              {t.role}
            </span>
          </div>
        </div>
        <StatusBadge status={t.status} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 p-3 rounded-xl bg-gray-50 mb-3 text-xs">
        <div>
          <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
            <Mail size={9} /> Email
          </p>
          <p className="text-gray-700 break-all">{t.email}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
            <Phone size={9} /> Phone
          </p>
          <p className="text-gray-700">{t.phone || "—"}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
            <Building size={9} /> School
          </p>
          <p className="text-gray-700 truncate">{t.school}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
            <Calendar size={9} /> Joined
          </p>
          <p className="text-gray-700">
            {t.createdAt ? new Date(t.createdAt).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }) : "—"}
          </p>
        </div>
      </div>

    
      <div className="flex items-center gap-2 mb-3">
        <button
          disabled={busy || isApproved}
          onClick={() => onApprove(t.id, "APPROVE")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition active:scale-95 ${
            isApproved
              ? "bg-emerald-100 text-emerald-400 cursor-not-allowed"
              : "bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50"
          }`}
        >
          <Check size={12} /> Approve
        </button>
        <button
          disabled={busy || isRejected}
          onClick={() => onApprove(t.id, "REJECT")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition active:scale-95 ${
            isRejected
              ? "bg-red-100 text-red-300 cursor-not-allowed"
              : "bg-white border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50"
          }`}
        >
          <X size={12} /> Reject
        </button>
        <button
          onClick={() => onEdit(t)}
          className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(t.id)}
          className="p-2 rounded-xl border border-gray-200 text-red-400 hover:bg-red-50 hover:border-red-200 transition"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">Active account</span>
        <button
          onClick={() => onToggle(t.id, !t.isActive)}
          className={`relative w-11 h-6 rounded-full transition-colors ${t.isActive ? "bg-emerald-500" : "bg-gray-300"}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${t.isActive ? "translate-x-5" : "translate-x-0"}`} />
        </button>
      </div>
    </div>
  );
};

const TeacherList = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const { teacher, fetchTeachers, deleteTeacher, loading, setEditTeacher, teacherApproval, toggleTeacherStatus } = useTeacherStore();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [filterStatus, setFilterStatus] = useState("");
  const [filterApproval, setFilterApproval] = useState("");
  const [filterActive, setFilterActive] = useState("");

  useEffect(() => { fetchTeachers(); }, []);

  const clearFilters = () => {
    setSearch(""); setFilterStatus(""); setFilterApproval(""); setFilterActive("");
  };

  const hasActiveFilters = search || filterStatus || filterApproval || filterActive;

  const filteredTeachers = useMemo(() => {
    return teacher.filter((t) => {
      if (search.trim()) {
        const s = search.toLowerCase();
        if (!t.name?.toLowerCase().includes(s) && !t.email?.toLowerCase().includes(s) && !t.phone?.includes(s)) return false;
      }
      const sc = getStatusClass(t.status);
      if (filterStatus && sc !== filterStatus) return false;
      if (filterApproval && sc !== filterApproval) return false;
      if (filterActive === "active" && !t.isActive) return false;
      if (filterActive === "inactive" && t.isActive) return false;
      return true;
    });
  }, [teacher, search, filterStatus, filterApproval, filterActive]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteTeacher(deleteId);
    setDeleteId(null);
  };

  const handleAction = async (id, action) => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    try { await teacherApproval(id, action); }
    catch (err) { console.error(err); }
    finally { setActionLoading((prev) => ({ ...prev, [id]: false })); }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white w-80 rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-red-50 mb-4">
              <Trash2 size={18} className="text-red-500" />
            </div>
            <p className="font-semibold text-gray-800 text-sm mb-1">Delete this teacher?</p>
            <p className="text-xs text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-50">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-2 text-sm rounded-xl bg-red-600 text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 py-4 border-b border-gray-100 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Teacher List</h2>
            <p className="text-xs text-gray-400 mt-0.5">Manage teachers, approvals and account access</p>
          </div>
          <button
            onClick={() => setOpenCreate(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition active:scale-[0.98] shadow-sm flex-shrink-0"
          >
            <span className="text-base leading-none">+</span>
            <span className="hidden sm:inline">Add Teacher</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search name, email, phone..."
            className="w-full bg-transparent outline-none text-xs text-gray-700 placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Filter size={11} /> Filters:
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-gray-50 text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
            <option value="">Status: All</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
          <select value={filterApproval} onChange={(e) => setFilterApproval(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-gray-50 text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
            <option value="">Approval: All</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
          <select value={filterActive} onChange={(e) => setFilterActive(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-gray-50 text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
            <option value="">Active: All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition">
              Clear
            </button>
          )}
          <span className="text-xs text-gray-400 ml-auto">{filteredTeachers.length} of {teacher.length}</span>
        </div>
      </div>

      <div className="md:hidden">
        {loading ? (
          <p className="py-12 text-center text-xs text-gray-300">Loading…</p>
        ) : filteredTeachers.length === 0 ? (
          <p className="py-12 text-center text-xs text-gray-300">No teachers found.</p>
        ) : (
          <div className="p-3 flex flex-col gap-3">
            {filteredTeachers.map((t) => (
              <TeacherCard
                key={t.id}
                t={t}
                busy={!!actionLoading[t.id]}
                onApprove={handleAction}
                onEdit={setEditTeacher}
                onDelete={setDeleteId}
                onToggle={toggleTeacherStatus}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-xs" style={{ borderCollapse: "separate" }}>
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">School</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Approval</th>
              <th className="px-4 py-3 text-center">Actions</th>
              <th className="px-4 py-3 text-center">Active</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={10} className="py-16 text-center text-gray-300">Loading…</td></tr>
            ) : filteredTeachers.length === 0 ? (
              <tr><td colSpan={10} className="py-16 text-center text-gray-300">No teachers found.</td></tr>
            ) : (
              filteredTeachers.map((t) => {
                const status = t.status?.toUpperCase();
                const busy = !!actionLoading[t.id];
                return (
                  <tr key={t.id} className="border-t border-gray-50 hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 text-gray-300 font-mono text-[11px]">{t.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 max-w-[130px] truncate">{t.name}</td>
                    <td className="px-4 py-3 max-w-[160px]">
                      <p className="text-gray-600 truncate">{t.email}</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">{t.phone || "—"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-500 text-[10px] font-semibold uppercase tracking-wide">{t.role}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-[120px] truncate">{t.school}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                      {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          disabled={busy || status === "APPROVE"}
                          onClick={() => handleAction(t.id, "APPROVE")}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition active:scale-95 ${status === "APPROVE" ? "bg-emerald-100 text-emerald-400 cursor-not-allowed" : "bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50"}`}
                        >
                          <Check size={10} /> Approve
                        </button>
                        <button
                          disabled={busy || status === "REJECT"}
                          onClick={() => handleAction(t.id, "REJECT")}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition active:scale-95 ${status === "REJECT" ? "bg-red-100 text-red-300 cursor-not-allowed" : "bg-white border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50"}`}
                        >
                          <X size={10} /> Reject
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => {setEditTeacher(t);
                        setOpenCreate(true);
                       }}className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => setDeleteId(t.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleTeacherStatus(t.id, !t.isActive)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${t.isActive ? "bg-emerald-500" : "bg-gray-300"}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${t.isActive ? "translate-x-5" : "translate-x-0"}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {openCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpenCreate(false)} />
          <div className="relative z-10 w-full max-w-md">
            <button onClick={() => setOpenCreate(false)} className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-black">✕</button>
            <CreateTeacherForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;