"use client";

import Link from "next/link";
import { useAuthStore } from "@/features/auth/stores/authStore";

export default function NotFound() {
  const { user } = useAuthStore();
  if (!user) {
    return null;
  }

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef4fa] to-[#dbeafe] px-4">
  <div className="max-w-md w-full bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-10 text-center">
    <div className="relative inline-block">
      <h1 className="text-[110px] leading-none font-black text-blue-600 tracking-tight">
        404
      </h1>
      <div className="absolute -top-2 -right-3 w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
    </div>
    <h2 className="mt-4 text-2xl font-bold text-gray-800">
      Oops! Page Not Found
    </h2>
    <p className="mt-3 text-gray-500 text-sm leading-relaxed">
      The page you are looking for does not exist or may have been moved.
    </p>
    <Link
      href="/login"
      className="mt-8 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-300/50 active:scale-95"
    >
      Go To Login
    </Link>
  </div>
</div>
  );
}