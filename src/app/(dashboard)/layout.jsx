"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useSidebarStore } from "@/components/layout/store/sidebarStore";

export default function DashboardLayout({ children }) {
  const { isOpen } = useSidebarStore();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className={`
          flex flex-col min-h-screen flex-1
          transition-all duration-300
          ${isOpen ? "md:ml-64" : "md:ml-20"}
        `}
      >
        <Header />

        <div className="flex-1 px-4 md:px-8 py-6 md:py-8">
          {children}
        </div>

        <Footer />
      </main>
    </div>
  );
}


