"use client";

import { useAuthStore } from "@/features/auth/stores/authStore";
import { Eye, EyeOff, Lock, Mail, Phone, Plus, School, User, X, ShieldOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTeacherStore } from "./stores/teacherStore";

const EMPTY_FORM = { name: "", email: "", phone: "", school: "", password: "" };

const InputField = ({ icon: Icon, placeholder, fieldKey, type = "text", required = false, form, onChange }) => (
  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition bg-white">
    <Icon size={15} className="text-gray-400 flex-shrink-0" />
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
      value={form[fieldKey]}
      onChange={(e) => onChange(fieldKey, e.target.value)}
      required={required}
    />
  </div>
);

const CreateTeacherForm = () => {
  const { user } = useAuthStore();
  const { createTeacher, loading, clearEditTeacher, editTeacher, updateTeacher } = useTeacherStore();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const isEditing = !!editTeacher;

  useEffect(() => {
    if (editTeacher) {
      setForm({
        name:     editTeacher.name     || "",
        email:    editTeacher.email    || "",
        phone:    editTeacher.phone    || "",
        school:   editTeacher.school   || "",
        password: "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editTeacher]);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
     
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await updateTeacher(editTeacher.id, payload);
        toast.success("Teacher updated successfully");
        clearEditTeacher();
      } else {
        await createTeacher(form);
        toast.success("Teacher created successfully");
      }
      setForm(EMPTY_FORM);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleCancel = () => {
    clearEditTeacher();
    setForm(EMPTY_FORM);
  };


  if (user?.role !== "SUPERADMIN") {
    return (
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-10 flex flex-col items-center gap-3 text-center max-w-sm mx-auto">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <ShieldOff size={20} className="text-red-400" />
        </div>
        <p className="text-sm font-semibold text-gray-800">Access Denied</p>
        <p className="text-xs text-gray-400">Only super admins can manage teachers.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 max-w-sm w-full mx-auto">

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Plus size={16} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              {isEditing ? "Update Teacher" : "Add Teacher"}
            </h2>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {isEditing ? `Editing: ${editTeacher.name}` : "Fill in the details below"}
            </p>
          </div>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
            title="Cancel edit"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">

        <InputField
          icon={User}
          placeholder="Teacher name"
          fieldKey="name"
          required
          form={form}
          onChange={handleChange}
        />

        <InputField
          icon={Mail}
          placeholder="Email address"
          fieldKey="email"
          type="email"
          required
          form={form}
          onChange={handleChange}
        />

        <InputField
          icon={Phone}
          placeholder="Phone (optional)"
          fieldKey="phone"
          form={form}
          onChange={handleChange}
        />

        <InputField
          icon={School}
          placeholder="School name"
          fieldKey="school"
          required
          form={form}
          onChange={handleChange}
        />

        {/* Password */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition bg-white relative">
          <Lock size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder={isEditing ? "New password (leave blank to keep)" : "Password"}
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 pr-6"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required={!isEditing}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 text-gray-400 hover:text-gray-600 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>

        {isEditing && (
          <p className="text-[10px] text-gray-400 -mt-1 pl-1">
            Leave password blank to keep the existing one.
          </p>
        )}

   
        <div className="border-t border-gray-100 pt-1" />

        <div className="flex gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-1.5"
            >
              <X size={14} /> Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-50 ${
              isEditing ? "flex-1 bg-blue-600 text-white hover:bg-blue-700" : "w-full bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Plus size={15} />
            {loading
              ? isEditing ? "Updating…" : "Creating…"
              : isEditing ? "Update Teacher" : "Add Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeacherForm;