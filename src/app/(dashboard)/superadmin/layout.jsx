"use client"

import ProtectedRoute from "@/components/ProtectedRoute"


export default function SuperAdminLayout({
    children,
}){
    return(
        <ProtectedRoute   allowedRoles={["SUPERADMIN"]}>
           {children}
        </ProtectedRoute>
    );
}