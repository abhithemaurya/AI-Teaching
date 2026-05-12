import { useAuthStore } from "@/features/auth/stores/authStore";
import axios from "axios";
import { create } from "zustand";

export const useProfileStore = create((set) => ({
  user: null,
  loading: false,
  saving: false,

  fetchProfile: async () => {
    try {
      set({ loading: true });

      const token = useAuthStore.getState().token;

      if (!token) {
        console.error("❌ No token found");
        return;
      }

      const res = await axios.get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ user: res.data });

    } catch (error) {
      console.log("FETCH ERROR:", error.response?.data || error.message);
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (form) => {
    try {
      set({ saving: true });

      const token = useAuthStore.getState().token;

      if (!token) {
        throw new Error("No token found");
      }

      const res = await axios.put("/api/auth/profile", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("UPDATED DATA:", res.data);

      
      return res.data;

    } catch (error) {
      console.log("UPDATE ERROR:", error.response?.data || error.message);

      throw error.response?.data || { message: error.message };

    } finally {
      set({ saving: false });
    }
  },
}));