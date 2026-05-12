import { useAuthStore } from "@/features/auth/stores/authStore";
import { create } from "zustand";

import { persist } from "zustand/middleware";

export const useAdminsStore = create(
    persist(
        (set) => ({
            loading: false,
            error: null,
            admins: [],
            editAdmin: null,
            isHydrated: false,
            setHydrated: () => set({ isHydrated: true }),
            setEditAdmin: (admin) => set({ editAdmin: admin }),
            clearEditAdmin: () => set({ editAdmin: null }),
            fetchAdmins: async () => {
                try {
                    const token = useAuthStore.getState().token;
                    if (!token) throw new Error("NO token found")
                    set({ loading: true, error: null });
                    const res = await fetch("/api/admins", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });
                    const data = await res.json()
                    console.log(data)
                    if (!res.ok)
                        throw new Error(data.message || "Failed to fetch admins")
                    set({ admins: data.data, loading: false })
                } catch (error) {
                    set({ error: error.message, loading: false })
                }
            },


            createAdmin: async (FormData) => {
                try {
                    const token = useAuthStore.getState().token
                    if (!token) {
                        throw new Error("No token found ");
                    }
                    set({ loading: true, error: null });
                    const res = await fetch("/api/admins", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },

                        body: JSON.stringify(FormData)
                    })
                    const data = await res.json()

                    if (!res.ok) throw new Error(data.message || "Failed to create admin")
                    set((state) => ({
                        admins: [...state.admins, data.data],
                        loading: false
                    }));
                    return data;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error
                }
            },
            updateAdmin: async (id, formData) => {
                try {
                    const token = useAuthStore.getState().token;
                    if (!token) throw new Error("NO token found")
                    set({ loading: true, error: null })
                    const res = await fetch(`/api/admins/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(formData)
                    });
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.message || "Failed to update admin");
                    }
                    set((state) => ({
                        admins: state.admins.map((admin) =>
                            admin.id === id ? data.data : admin
                        ),
                        loading: false,
                    }));
                    return data;
                } catch (error) {
                    set({ error: error.message, loading: false })
                    throw error;
                }
            },
            deleteAdmin: async (id) => {
                try {
                    const token = useAuthStore.getState().token;
                    if (!token) {
                        throw new Error("NO token found")
                    }
                    set({ loading: true, error: null });
                    const res = await fetch(`/api/admins/${id}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await res.json()
                    if (!res.ok)
                        throw new Error(data.message || "Failed to delete admin")
                    set((state) => ({
                        admins: state.admins.filter((admin) => admin.id !== id),
                        loading: false,
                    }))
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            }
        }),
        {
            name: "admin-storage",
            onRehydrateStroage: () => (state) => {
                state?.setHydrated()
            }

        }
    )
)