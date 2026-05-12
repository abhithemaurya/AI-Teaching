"use client";

import { create } from "zustand";

export const useEmailStore = create((set) => ({
  templates: [],
  selectedTemplate: null,
  loading: false,
  saving: false,
  error: null,



  fetchTemplates: async () => {
    try {
      set({ loading: true });

      const res = await fetch("/api/email-templates");

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch templates");
      }

      set({
        templates: data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  

  selectTemplate: (template) => {
    set({
      selectedTemplate: template,
    });
  },

 

  updateTemplate: async (id, payload) => {
    try {
      set({ saving: true });

      const res = await fetch(`/api/email-templates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update template");
      }

      set((state) => ({
        templates: state.templates.map((item) =>
          item.id === id
            ? {
                ...item,
                ...payload,
              }
            : item
        ),

        selectedTemplate: {
          ...state.selectedTemplate,
          ...payload,
        },

        saving: false,
      }));

      return data;
    } catch (error) {
      set({
        error: error.message,
        saving: false,
      });

      throw error;
    }
  },
}));

























"use client";

import React, { useEffect, useState } from "react";
import { Save, Mail, Pencil, Eye } from "lucide-react";
import { useEmailStore } from "./stores/emailStore";

export default function EmailTemplateManager() {
  const {
    templates,
    selectedTemplate,
    loading,
    saving,
    fetchTemplates,
    selectTemplate,
    updateTemplate,
  } = useEmailStore();

  const [formData, setFormData] = useState({
    subject: "",
    html: "",
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      setFormData({
        subject: selectedTemplate.subject || "",
        html: selectedTemplate.html || "",
      });
    }
  }, [selectedTemplate]);

  const handleSave = async () => {
    try {
      await updateTemplate(selectedTemplate.id, formData);

      alert("Template updated successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <div className="bg-white rounded-2xl border shadow p-4">
        <div className="flex items-center gap-2 mb-5">
          <Mail className="w-5 h-5" />

          <h2 className="text-xl font-bold">
            Email Templates
          </h2>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => selectTemplate(template)}
                className={`w-full text-left border rounded-xl p-4 transition ${
                  selectedTemplate?.id === template.id
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-gray-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {template.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {template.key}
                    </p>
                  </div>

                  <Pencil className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}

      <div className="lg:col-span-2 bg-white rounded-2xl border shadow p-6">
        {selectedTemplate ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Edit Template
                </h2>

                <p className="text-gray-500">
                  {selectedTemplate.key}
                </p>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
              >
                <Save className="w-4 h-4" />

                {saving ? "Saving..." : "Save"}
              </button>
            </div>

            {/* SUBJECT */}

            <div>
              <label className="block mb-2 font-medium">
                Subject
              </label>

              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* HTML */}

            <div>
              <label className="block mb-2 font-medium">
                HTML Content
              </label>

              <textarea
                rows={18}
                value={formData.html}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    html: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4" />

                <h3 className="font-semibold">
                  Live Preview
                </h3>
              </div>

              <div className="border rounded-xl p-5 bg-gray-50 overflow-auto">
                <div
                  dangerouslySetInnerHTML={{
                    __html: formData.html,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select an email template
          </div>
        )}
      </div>
    </div>
  );
}


















"use client";

import { create } from "zustand";

export const useEmailStore = create((set) => ({
  templates: [],
  selectedTemplate: null,
  loading: false,
  saving: false,
  error: null,

 

  fetchTemplates: async () => {
    try {
      set({ loading: true });

      const res = await fetch("/api/email-templates");

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch templates");
      }

      set({
        templates: data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  // ================= SELECT TEMPLATE =================

  selectTemplate: (template) => {
    set({
      selectedTemplate: template,
    });
  },

  // ================= UPDATE TEMPLATE =================

  updateTemplate: async (id, payload) => {
    try {
      set({ saving: true });

      const res = await fetch(`/api/email-templates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update template");
      }

      set((state) => ({
        templates: state.templates.map((item) =>
          item.id === id
            ? {
                ...item,
                ...payload,
              }
            : item
        ),

        selectedTemplate: {
          ...state.selectedTemplate,
          ...payload,
        },

        saving: false,
      }));

      return data;
    } catch (error) {
      set({
        error: error.message,
        saving: false,
      });

      throw error;
    }
  },
}));























{

Step 1 — Prisma Model

First make sure you already have this model in Prisma.

model EmailTemplate {
  id        Int      @id @default(autoincrement())
  name      String
  key       String   @unique
  subject   String
  html      String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

Then run:

// npx prisma migrate dev


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const templates = await prisma.emailTemplate.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(templates);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// Step 3 — Create UPDATE API
// File
// src/app/api/email-templates/[id]/route.js








import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const body = await req.json();

    const updatedTemplate = await prisma.emailTemplate.update({
      where: {
        id: Number(id),
      },
      data: {
        subject: body.subject,
        html: body.html,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Template updated successfully",
      data: updatedTemplate,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}






// Step 4 — Add Dummy Templates

// Run once in Prisma Studio or seed file.

// Example:

// await prisma.emailTemplate.create({
//   data: {
//     name: "Teacher Approval",
//     key: "teacher_approval",
//     subject: "Your account has been approved",
//     html: `
//       <h1>Welcome {{name}}</h1>
//       <p>Your account has been approved.</p>
//     `,
//   },
// });
// Final Flow

Frontend:

GET  /api/email-templates
PUT  /api/email-templates/:id}




















import { useAuthStore } from "@/features/auth/stores/authStore";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEmailStore = create(
  persist(
    (set) => ({
      loading: false,
      error: null,

      templates: [],
      editTemplate: null,

      isHydrated: false,

  
      setHydrated: () =>
        set({
          isHydrated: true,
        }),

 

      setEditTemplate: (template) =>
        set({
          editTemplate: template,
        }),

      clearEditTemplate: () =>
        set({
          editTemplate: null,
        }),



      fetchTemplates: async () => {
        try {
          const token = useAuthStore.getState().token;

          if (!token) {
            throw new Error("No token found");
          }

          set({
            loading: true,
            error: null,
          });

          const res = await fetch("/api/email-templates", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(
              data.message || "Failed to fetch templates"
            );
          }

          set({
            templates: data,
            loading: false,
          });

          return data;
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });

          throw error;
        }
      },

      // ================= UPDATE TEMPLATE =================

      updateTemplate: async (id, formData) => {
        try {
          const token = useAuthStore.getState().token;

          if (!token) {
            throw new Error("No token found");
          }

          set({
            loading: true,
            error: null,
          });

          const res = await fetch(
            `/api/email-templates/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formData),
            }
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(
              data.message || "Failed to update template"
            );
          }

          set((state) => ({
            templates: state.templates.map((template) =>
              template.id === id
                ? data.data
                : template
            ),

            editTemplate: data.data,

            loading: false,
          }));

          toast.success("Template updated successfully");

          return data;
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });

          toast.error(error.message);

          throw error;
        }
      },
    }),

    {
      name: "email-template-storage",

      partialize: (state) => ({
        templates: state.templates,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);