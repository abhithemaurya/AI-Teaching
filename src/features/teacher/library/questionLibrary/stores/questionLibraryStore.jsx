import { useAuthStore } from "@/features/auth/stores/authStore";
import { toast } from "sonner";
import { create } from "zustand";

export const useQuestionLibraryStore = create((set, get) => ({
  papers: [],
  loading: false,
  getTeacherLibraries: async () => {
    try {
      set({
        loading: true,
      });
      const token = useAuthStore.getState().token;
      if (!token) {
        toast.error("Please login first");
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
        throw new Error(data.message || "Failed to fetch library");
      }
      set({
       papers: data.data || [],
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({
        loading: false,
      });
    }
  },
  deletePaper: async (id) => {
    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("Please login first");
      const response = await fetch(`/api/teacher/question/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Deleted failed");
      }
      set({
        papers: get().papers.filter((paper) => paper.id !== id),
      });
      toast.success("Questions deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },
  incrementDownloadCount: async (id) => {
    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("Please login first");
      const response = await fetch(`/api/teacher/question/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          incrementDownload:true
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw Error(data.message || "Failed to update download count");
      }
      set((state)=>({
        papers: state.papers.map((paper)=>
        paper.id ===id  
        ?{
          ...paper,
          downloadCount: (paper.downloadCount || 0) +1
        }
       : paper
      )
      }))
    } catch (error) {
      toast.error(error.message);
    }
  },

  toggleDownloadStatus: async (paperId, enabled) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("Please login first");
    }
    const response = await fetch(
      `/api/teacher/question/${paperId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          downloadEnabled: enabled,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update status"
      );
    }
    set((state) => ({
      papers: state.papers.map((paper) =>
        paper.id === paperId
          ? {
              ...paper,
              downloadEnabled: enabled,
            }
          : paper
      ),
    }));
    toast.success("Download status updated");
  } catch (error) {
    toast.error(error.message);
  }
}
}));
