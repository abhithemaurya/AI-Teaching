import { create } from "zustand";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/stores/authStore";

export const useQuestionStore = create(
  (set, get) => ({

    questions: [],
    generatedPaperId: null,
    loading: false,
    paperMeta: null,

    generateQuestions: async (payload) => {

      try {

        set({
          loading: true,
        });

        const token =
          useAuthStore.getState().token;

        if (!token) {

          toast.error(
            "Please login first"
          );

          set({
            loading: false,
          });

          return;
        }

        const response =
          await fetch(
            "/api/teacher/question",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
                Authorization:
                  `Bearer ${token}`,
              },
              body: JSON.stringify(
                payload
              ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to generate questions"
          );
        }
        set({
          questions:
            data.data?.questions || [],

          generatedPaperId:
            data.data?.id,

          paperMeta: {
            topic: payload.topic,
            difficulty:
              payload.difficulty,
            questionType:
              payload.questionType,
          },
        });

        toast.success(
          "Questions generated successfully"
        );
      } catch (error) {

        console.log(error);

        toast.error(
          error.message
        );

      } finally {

        set({
          loading: false,
        });
      }
    },

    getTeacherQuestions:
      async () => {

        try {

          set({
            loading: true,
          });

          const token =
            useAuthStore.getState()
              .token;

          if (!token) {

            toast.error(
              "Please login first"
            );

            set({
              loading: false,
            });

            return;
          }

          const response =
            await fetch(
              "/api/teacher/question",
              {
                method: "GET",
                headers: {
                  "Content-Type":
                    "application/json",

                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          if (!response.ok) {

            throw new Error(
              data.message ||
              "Failed to fetch questions"
            );
          }

          set({
            questions:
              data.data || [],
          });

        } catch (error) {

          console.log(error);

          toast.error(
            error.message
          );

        } finally {

          set({
            loading: false,
          });
        }
      },

    updateQuestion: (
      index,
      updatedQuestion
    ) => {

      const updatedQuestions =
        get().questions.map(
          (q, i) =>
            i === index
              ? updatedQuestion
              : q
        );

      set({
        questions:
          updatedQuestions,
      });
    },

    syncQuestionsToDatabase:
      async () => {

        try {

          const {
            generatedPaperId,
            questions,
          } = get();

          if (!generatedPaperId) {

            toast.error(
              "Paper ID not found"
            );

            return false;
          }

          const token =
            useAuthStore.getState()
              .token;

          const response =
            await fetch(
              `/api/teacher/question/${generatedPaperId}`,
              {
                method: "PUT",

                headers: {
                  "Content-Type":
                    "application/json",

                  Authorization:
                    `Bearer ${token}`,
                },

                body: JSON.stringify({
                  questions,
                }),
              }
            );

          const data =
            await response.json();

          if (!response.ok) {

            throw new Error(
              data.message ||
              "Failed to sync"
            );
          }

          return true;

        } catch (error) {

          console.log(error);

          toast.error(
            error.message
          );

          return false;
        }
      },

    clearQuestions: () => {

      set({
        questions: [],
        generatedPaperId: null,
      });
    },
  })
);