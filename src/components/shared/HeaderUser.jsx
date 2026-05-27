"use client";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeaderUser() {
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-xs hover:bg-blue-100 transition"
        onClick={() => router.push("/login")}
      >
        <LogIn size={16} />
        Login
      </button>
    );
  }
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 focus:outline-none"
      >
        <div className="text-right hidden sm:block cursor-pointer">
          <p className="text-xs font-bold">{user?.name?.trim()}</p>
          <p className="text-[10px] text-gray-500">{user.role || "Teacher"}</p>
        </div>

        <img
          src={user.avatar || "https://i.pravatar.cc/40"}
          className="w-10 h-10 rounded-full border-2 border-blue-200 cursor-pointer"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b bg-gray-50">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => router.push("/profile")}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition"
              >
                <User size={16} />
                Profile
              </button>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                  router.push("/login");
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
