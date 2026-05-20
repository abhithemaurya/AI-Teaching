import { useQuestionStore } from "@/features/teacher/questions/stores/questionStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      loading: false,
      error: null,
      user: null,
      token: null,
      isHydrated: false,

      setHydrated: () =>
        set({ isHydrated: true }),

      register: async (formData) => {
        try {
          set({
            loading: true,
            error: null,
          });
          const res = await fetch(
            "/api/auth/register",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message);
          }
          set({
            user: data.data,
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

      login: async (formData) => {
        try {
          set({
            loading: true,
            error: null,
          });
          const res = await fetch(
            "/api/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          const data = await res.json();
          console.log("LOGIN RESPONSE", data);
          if (!res.ok) {
            throw new Error(data.message);
          }
          set({
            user: data.data,
            token: data.token,
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
      logout: () => {
        useQuestionStore
        .getState()
        .clearQuestions()
        localStorage.removeItem(
          "auth-storage"
        );
        set({
          user: null,
          token: null,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);