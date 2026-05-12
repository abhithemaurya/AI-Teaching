"use client";

import ProtectedRoute from "@/components/ProtectedRoute";



export default function TeacherLayout({
  children,
}) {
  return (
    <ProtectedRoute
      allowedRoles={["TEACHER"]}
    >
      {children}
    </ProtectedRoute>
  );
}