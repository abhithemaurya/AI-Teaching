import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/stores/authStore";

export const useQuestionStore = create(
  persist(
    (set, get) => ({
      questions: [],
      loading: false,

      generateQuestions: async (payload) => {
        try {
          set({ loading: true });

          const token = useAuthStore.getState().token;

          // ✅ Bug fix: set loading false before return
          if (!token) {
            toast.error("Please login first");
            set({ loading: false });
            return;
          }

          const response = await fetch("/api/teacher/question", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to generate questions");
          }

          // ✅ data.data is the saved DB record, .questions is the array
          set({
            questions: data.data?.questions || [],
          });

          toast.success("Questions generated successfully");

        } catch (error) {
          console.log(error);
          toast.error(error.message);
        } finally {
          set({ loading: false });
        }
      },

      getTeacherQuestions: async () => {
        try {
          set({ loading: true });

          const token = useAuthStore.getState().token;

          // ✅ Bug fix: set loading false before return
          if (!token) {
            toast.error("Please login first");
            set({ loading: false });
            return;
          }

          const response = await fetch("/api/teacher/question", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch questions");
          }

          // ✅ data.data is array of generation records
          set({
            questions: data.data || [],
          });

        } catch (error) {
          console.log(error);
          toast.error(error.message);
        } finally {
          set({ loading: false });
        }
      },

      updateQuestion: (index, updatedQuestion) => {
        const updatedQuestions = get().questions.map((q, i) =>
          i === index ? updatedQuestion : q
        );
        set({ questions: updatedQuestions });
      },

      clearQuestions: () => {
        set({ questions: [] });
      },
    }),

    {
      name: "question-storage",
    }
  )
);