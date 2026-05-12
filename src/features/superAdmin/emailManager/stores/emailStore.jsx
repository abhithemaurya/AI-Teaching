

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

          const res = await fetch("/api/admins/email-manager", {
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
            `/api/admins/email-manager/${id}`,
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










// C:\Users\maged\ai-teaching\src\app\api\admins\email-manager\route.js