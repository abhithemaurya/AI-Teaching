"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Building2,
  CheckCircle,
  X,
  Pencil,
} from "lucide-react";
import { useProfileStore } from "./stores/profileStore";
import toast from "react-hot-toast";

export default function UserProfile() {
  const { user, fetchProfile, updateProfile, loading, saving } =
    useProfileStore();

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);
  const isApproved = form?.status === "APPROVE";

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSave = async () => {
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        school: form.school,
      };
      await updateProfile(payload);
      toast.success("Profile updated successfully ");
      await fetchProfile();
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Update failed ");
    }
  };
  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }
  return (
    <div className="bg-gray-50 p-6 flex items-center justify-center ">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 border">
        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold">{form?.name}</h2>
            <p className="text-sm text-gray-500">ID: {form?.id}</p>
          </div>

          <div className="ml-auto flex gap-2 items-center">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                isApproved
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {form?.status}
            </span>

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Pencil size={14} />
              Edit
            </button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info icon={<Mail />} label="Email" value={form?.email} />
          <Info icon={<Phone />} label="Phone" value={form?.phone} />
          <Info icon={<Shield />} label="Role" value={form?.role} />
          <Info icon={<Building2 />} label="School" value={form?.school} />
        </div>
        <div className="mt-6 flex justify-between border-t pt-4">
          <p className="text-xs text-gray-400">Auto saved profile data</p>

          {isApproved && (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle size={16} />
              Verified User
            </div>
          )}
        </div>
      </div>     
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>

            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

            <div className="space-y-3">
              <Input
                label="Name"
                name="name"
                value={form?.name || ""}
                onChange={handleChange}
              />
              <Input
                label="Phone"
                name="phone"
                value={form?.phone || ""}
                onChange={handleChange}
              />
              <Input
                label="School"
                name="school"
                value={form?.school || ""}
                onChange={handleChange}
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
      <div className="text-gray-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}