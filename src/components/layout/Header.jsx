"use client";

import { useAuthStore } from "@/features/auth/stores/authStore";
import HeaderUser from "../shared/HeaderUser";

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-[#f6fafe] border-b border-blue-100/60">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 gap-3">

        {/* Left — Welcome */}
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 truncate leading-tight">
            Welcome, <span className="text-blue-600">{user?.role}!</span>
          </h2>
          <p className="text-xs text-gray-400 hidden sm:block">
            Ready to architect your next lesson
          </p>
        </div>

        {/* Right — Stats + User */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Credits */}
          <div className="flex flex-col items-center bg-white border border-blue-100 rounded-xl px-3 py-1.5 shadow-sm min-w-[64px]">
            <span className="text-[10px] text-gray-400 leading-none mb-0.5">Credits</span>
            <span className="text-sm font-bold text-blue-600 leading-none">842<span className="text-gray-300 font-normal">/1k</span></span>
          </div>

          {/* Generations */}
          <div className="flex flex-col items-center bg-white border border-blue-100 rounded-xl px-3 py-1.5 shadow-sm min-w-[64px]">
            <span className="text-[10px] text-gray-400 leading-none mb-0.5">Generations</span>
            <span className="text-sm font-bold text-blue-600 leading-none">12<span className="text-gray-300 font-normal">/50</span></span>
          </div>

          {/* Divider */}
          <div className="h-7 w-px bg-gray-200 hidden sm:block cursor-pointer" />

          {/* User avatar / menu */}
          <HeaderUser className="cursor-pointer" />
        </div>

      </div>
    </header>
  );
}