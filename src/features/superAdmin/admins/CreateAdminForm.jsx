"use client";

import { useAuthStore } from "@/features/auth/stores/authStore";
import { Eye, EyeOff, Lock, Mail, Phone, Plus, School, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAdminsStore } from "./stores/adminStore";

const CreateAdminForm = () => {
  const { user } = useAuthStore();
  const { createAdmin, loading, updateAdmin, editAdmin, clearEditAdmin } = useAdminsStore();
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (editAdmin) {
      setForm({
        name: editAdmin.name || "",
        email: editAdmin.email || "",
        phone: editAdmin.phone || "",
        password:  ""
      })
    }
  }, [editAdmin])


  const handleAddAdmin = async (e) => {
    e.preventDefault();

    try {
      if (editAdmin) {
        await updateAdmin(editAdmin.id, form);
        toast.success("Admin update successfully")
        clearEditAdmin()
      } else {
        await createAdmin(form);
        toast.success("Admin created successfully");
      }
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.message || "Admin not created");
    }
  };

  const handleCancelEdit=()=>{
    clearEditAdmin()
    setForm({
      name: "",
      email: "",
      phone:""

    })
  }

  if (user?.role !== "SUPERADMIN") {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Access Denied (Super Admin Only)
      </div>
    );
  }
  return (
    <div className="bg-white px-4 py-3 rounded-2xl shadow-md h-fit max-w-sm w-full mx-auto border border-gray-100">
      <div className="flex items-center gap-2 mb-5 text-blue-600">
        <Plus size={18} />
        <h2 className="font-semibold text-base tracking-tight">
          {editAdmin ? "Update Admin" : "Add Admin"}
        </h2>
      </div>
      <form className="space-y-3" onSubmit={handleAddAdmin}>
        {[
          { icon: User, placeholder: "Admin Name", key: "name", type: "text", required: true },
          { icon: Mail, placeholder: "Email Address", key: "email", type: "email", required: true },
          { icon: Phone, placeholder: "Phone (optional)", key: "phone", type: "text" },

        ].map(({ icon: Icon, placeholder, key, type, required }) => (
          <div
            key={key}
            className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition"
          >
            <Icon size={16} className="text-gray-400" />
            <input
              type={type}
              placeholder={placeholder}
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
              value={form[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
              required={required}
            />
          </div>
        ))}
        <div className="relative">
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
          <Lock
            size={16}
            className="text-gray-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 pr-6"
            value={form.password || ""}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-400 hover:text-gray-600 transition"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          </div>
        </div>
        <div className="flex gap-2">
          {editAdmin && (
            <button
            type="button"
            onClick={handleCancelEdit}
             className="flex-1 border-gray-300 text-gray-600 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-100 transition"          
            >
            <X size={16} />
            Cancel
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Plus size={16} />
          {loading
            ? editAdmin
              ? "Updating..." : "Creating..."
            : editAdmin
              ? "Update Admin"
              : "Add Admin"}
        </button>
      </form>
    </div>
  );
};

export default CreateAdminForm;