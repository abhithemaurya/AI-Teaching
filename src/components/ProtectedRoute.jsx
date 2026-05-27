"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/stores/authStore";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {

  const router = useRouter();

  const {
    user,
    isHydrated,
  } = useAuthStore();

  useEffect(() => {

    // WAIT FOR HYDRATION
    if (!isHydrated) return;

    // NOT LOGGED IN
    if (!user) {
      router.replace("/login");
      return;
    }

    // WRONG ROLE
    const role =
      user?.role
        ?.toString()
        .trim()
        .toUpperCase();
   console.log("USER:", user);
   console.log("ROLE:", role);
   console.log("ALLOWED:", allowedRoles);
    if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(role)
    ) {
      router.replace("/login");
    }

  }, [user, isHydrated]);

  // WAIT FOR STORAGE LOAD
  if (!isHydrated) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // PREVENT FLASH
  if (!user) return null;

  return children;
}