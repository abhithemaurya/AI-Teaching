import { create } from "zustand";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/stores/authStore";

export const useQuestionStore = create((set, get) => ({
  questions: [],
  loading: false,
  paperMeta: null,

  generateQuestions: async (payload) => {
    try {
      set({
        loading: true,
      });

      const token = useAuthStore.getState().token;

      if (!token) {
        toast.error("Please login first");

        set({
          loading: false,
        });

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
      set({
        questions: data.data?.questions || [],
        paperMeta: {
          topic: payload.topic,
          difficulty: payload.difficulty,
          questionType: payload.questionType,
          studentClass: payload.studentClass
        },
      });

      toast.success("Questions generated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      set({
        loading: false,
      });
    }
  },
  getTeacherQuestions: async () => {
    try {
      set({
        loading: true,
      });
      const token = useAuthStore.getState().token;
      if (!token) {
        toast.error("Please login first");
        set({
          loading: false,
        });
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

      set({
        questions: data.data || [],
      });
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    } finally {
      set({
        loading: false,
      });
    }
  },
  updateQuestion: (index, updatedQuestion) =>
    set((state) => ({
      questions: state.questions.map((q, i) =>
        i === index ? updatedQuestion : q,
      ),
    })),
  removeQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),


    saveQuestionsToDatabase:async(status="DRAFT")=>{
    try {
      const {questions, paperMeta}=get()
      if(!questions.length){
        toast.error("No questions available")
      }
      const token = useAuthStore.getState().token;
      if(!token){
        toast.error("Please login first");
        return false;
      }
      const response =await fetch(
        "/api/teacher/question/save",
        {
          method:"POST",
          headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify({
          teacherId: useAuthStore.getState().user?.id,
          topic:paperMeta?.topic,
          difficulty: paperMeta?.difficulty,
          questionType:paperMeta?.questionType,
          totalQuestions: questions.length,
          questions,
          status,
          studentClass:paperMeta?.studentClass,
          downloadEnabled: status==="DOWNLOADED",
          downloadCount: status==="DOWNLOADED" ? 1:0,
        }),
        },
      );
     const data = await response.json()
     if(!response.ok){
      throw new Error(data.message || "Failed to save question") 
     }    
      return true;
    } catch (error) {
    console.log(error);
    toast.error(error.message);
    return false    
    }
    },

  // syncQuestionsToDatabase: async () => {
  //   try {
  //     const { generatedPaperId, questions } = get();

  //     if (!generatedPaperId) {
  //       toast.error("Paper ID not found");

  //       return false;
  //     }

  //     const token = useAuthStore.getState().token;

  //     const response = await fetch(
  //       `/api/teacher/question/${generatedPaperId}`,
  //       {
  //         method: "PUT",

  //         headers: {
  //           "Content-Type": "application/json",

  //           Authorization: `Bearer ${token}`,
  //         },

  //         body: JSON.stringify({
  //           questions,
  //         }),
  //       },
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Failed to sync");
  //     }

  //     return true;
  //   } catch (error) {
  //     console.log(error);

  //     toast.error(error.message);

  //     return false;
  //   }
  // },

  clearQuestions: () => {
    set({
      questions: [],
        paperMeta: null,
    });
  },
}));
