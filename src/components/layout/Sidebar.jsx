"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/utils/sidebarLinks";
import { motion } from "framer-motion";
import { useSidebarStore } from "@/components/layout/store/sidebarStore";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebarStore();
  const [openMenu, setOpenMenu] = useState(null)
  const { user } = useAuthStore()
  console.log("user Role", { user })
  const userRole = user?.role.toString().trim().toUpperCase()

  if (!userRole) return null;

  const filteredLinks = sidebarLinks.filter((link) =>
    link.roles?.includes(userRole)
  )

  return (
    <>

      <motion.aside
        animate={{ width: isOpen ? 256 : 80 }}
        transition={{ duration: 0.25 }}
        className="hidden md:flex fixed left-0 top-0 h-screen flex-col p-4 border-r border-gray-200 bg-[#eef4fa]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {isOpen && (
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                ⬡
              </div>
              <div>
                <h1 className="text-lg font-black">EduBlueprint</h1>
                <p className="text-[10px] text-gray-500 uppercase">
                  Teaching Assistant
                </p>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-200"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
        {/* Links */}
        <nav className="flex-1 space-y-1">
          {filteredLinks.map((link, index) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;
            const hasChildren = link.children?.length > 0
            return (
              <div key={link.name}>
                {/* Parent Menu */}
                {hasChildren ? (
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === index
                          ? null
                          : index
                      )
                    }
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${"text-gray-600"
                      }`}
                  >
                    <div
                      className={`flex items-center ${isOpen
                          ? "gap-3"
                          : "justify-center w-full"
                        }`}
                    >
                      <Icon size={18} />
                      {isOpen && (
                        <span>{link.name}</span>
                      )}
                    </div>
                    {isOpen && (
                      <span>
                        {openMenu === index
                          ? "▲"
                          : "▼"}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link href={link.path}>
                    <div
                      className={`flex items-center ${isOpen
                          ? "gap-3 justify-start"
                          : "justify-center"
                        } px-3 py-2 rounded-lg text-sm ${isActive
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : "text-gray-600"
                        }`}
                    >
                      <Icon size={18} />
                      {isOpen && (
                        <span>{link.name}</span>
                      )}
                    </div>
                  </Link>
                )}
                {/* Children */}
                {hasChildren &&
                  openMenu === index && (
                    <div className="ml-4 mt-1 space-y-1">

                      {link.children.map(
                        (child) => {
                          const ChildIcon =
                            child.icon;

                          const childActive =
                            pathname ===
                            child.path;

                          return (
                            <Link
                              key={child.name}
                              href={child.path}
                            >
                              <div
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${childActive
                                    ? "bg-blue-100 text-blue-600 font-semibold"
                                    : "text-gray-600"
                                  }`}
                              >
                                <ChildIcon size={16} />

                                {isOpen && (
                                  <span>
                                    {child.name}
                                  </span>
                                )}
                              </div>
                            </Link>
                          );
                        }
                      )}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>
      </motion.aside>

<div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">

  <div className="flex justify-around items-start py-2">

    {filteredLinks.map((link, index) => {

      const Icon = link.icon;

      const hasChildren =
        link.children?.length > 0;

      const isActive =
        pathname === link.path;

      return (
        <div
          key={link.name}
          className="relative flex flex-col items-center"
        >

          {/* Parent */}

          {hasChildren ? (

            <button
              onClick={() =>
                setOpenMenu(
                  openMenu === index
                    ? null
                    : index
                )
              }
              className="flex flex-col items-center text-xs text-gray-500"
            >
              <Icon size={20} />

              <span>{link.name}</span>
            </button>

          ) : (

            <Link href={link.path}>
              <div
                className={`flex flex-col items-center text-xs ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <Icon size={20} />

                <span>{link.name}</span>
              </div>
            </Link>

          )}

          {/* Mobile Dropdown */}

          {hasChildren &&
            openMenu === index && (

              <div className="absolute bottom-14 bg-white border border-slate-200 rounded-xl shadow-lg min-w-[180px] overflow-hidden">

                {link.children.map(
                  (child) => {

                    const ChildIcon =
                      child.icon;

                    const childActive =
                      pathname ===
                      child.path;

                    return (
                      <Link
                        key={child.name}
                        href={child.path}
                      >
                        <div
                          className={`flex items-center gap-3 px-4 py-3 text-sm ${
                            childActive
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          <ChildIcon size={16} />

                          <span>
                            {child.name}
                          </span>
                        </div>
                      </Link>
                    );
                  }
                )}

              </div>

            )}

        </div>
      );
    })}

  </div>

</div>
    </>
  );
}