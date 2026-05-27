import { useAuthStore } from "@/features/auth/stores/authStore";
import { toast } from "sonner";
import { create } from "zustand";

export const useAiStore = create((set) => ({

    prompts: [],

    getPrompts: async () => {

        try {

            const token =
                useAuthStore.getState().token;

            if (!token)
                throw new Error("Token not found");

            const response =
                await fetch("/api/admins/prompt", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message
                );
            }

            set({
                prompts: data.data,
            });

        } catch (error) {

            console.log(error);

            toast.error(
                error.message
            );
        }
    },

    savePrompt: async (payload) => {

        try {

            const token =
                useAuthStore.getState().token;

            const response =
                await fetch("/api/admins/prompt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message
                );
            }

            toast.success(
                "Prompt saved"
            );

            return data;

        } catch (error) {

            console.log(error);

            toast.error(
                error.message
            );
        }
    },
}));