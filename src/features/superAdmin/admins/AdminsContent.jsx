"use client";

import React from "react";
import CreateAdminForm from "./CreateAdminForm";
import AdminList from "./AdminList";

const AdminsContent = () => {
  return (
    <div className="p-4 md:p-6 lg:p-0">
      <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">

        <div className="lg:col-span-1">
          <CreateAdminForm />
        </div>

        <div className="lg:col-span-3">
          <AdminList />
        </div>

      </div>
    </div>
  );
};

export default AdminsContent;