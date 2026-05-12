import { useAuthStore } from "@/features/auth/stores/authStore";
import axios from "axios";
import { act } from "react";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useTeacherStore = create(
    persist(
        (set) => ({
            loading: false,
            error: null,
            teacher: [],
            editTeacher: null,
            isHydrated: false,
            setHydrated: () => set({ isHydrated: true }),
            setEditTeacher: (teacher) => set({ editTeacher: teacher }),
            clearEditTeacher: () => set({ editTeacher: null }),

            fetchTeachers: async () => {
                try {
                    const token = useAuthStore.getState().token;
                    if (!token) throw new Error("No token found")
                    set({ loading: true, error: null });
                    const res = await fetch("/api/teacher", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    })
                    const data = await res.json()
                    console.log(data)
                    if (!res.ok)
                        throw new Error(data.message || "Failed to fetch Teacher")
                    set({ teacher: data.data, loading: false })
                } catch (error) {
                    set({ error: error.message, loading: false })
                }
            },
            createTeacher: async (FormData) => {
                try {
                    const token = useAuthStore.getState().token
                    if (!token) {
                        throw new Error("NO token found")

                    }
                    set({ loading: true, error: null });
                    const res = await fetch("/api/teacher", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(FormData)
                    })
                    const data = await res.json()
                    if (!res.ok) throw new Error(data.message || "Failed to create teacher")
                    set((state) => ({
                        teacher: [...state.teacher, data.data],
                        loading: false
                    }))
                    return data
                } catch (error) {
                    console.log(error)
                    set({ error: error.message, loading: false })
                    throw error
                }
            },
            updateTeacher: async (id, FormData) => {
                try {
                    const token = useAuthStore.getState().token
                    if (!token) throw new Error("NO token found")
                    set({ loading: true, error: null })
                    const res = await fetch(`/api/teacher/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(FormData)
                    });
                    const data = await res.json()
                    if (!res.ok) {
                        throw new Error(data.message || "Failed to update Teacher")
                    }
                    set((state) => ({
                        teacher: state.teacher.map((teacher) =>
                            teacher.id === id ? data.data : teacher
                        ),
                        loading: false,
                    }));
                    return data;
                } catch (error) {
                    set({ error: error.message, loading: false })
                    throw error;
                }
            },
            deleteTeacher: async (id) => {
                try {
                    const token = useAuthStore.getState().token;
                    if (!token) {
                        throw new Error("NO token found")
                    }
                    set({ loading: true, error: null });
                    const res = await fetch(`/api/teacher/${id}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });
                    const data = await res.json()
                    if (!res.ok)
                        throw new Error(data.message || "failed to delete teacher ")
                    set((state) => ({
                        teacher: state.teacher.filter((teacher) => teacher.id !== id),
                        loading: false
                    }))
                } catch (error) {
                    set({ error: error.message, loading: false })
                }
            },
            teacherApproval: async (id, action) => {
                try {
                    const token = useAuthStore.getState().token;
                    if (!token) throw new Error("No token found");

                    const res = await fetch(`/api/admins/approvals`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId: id, action }),
                    });

                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(data.message || "Failed to update teacher");
                    }

                    set((state) => ({
                        teacher: state.teacher.map((t) =>
                            t.id === id ? { ...t, status: action } : t
                        ),

                    }));

                    return data;
                } catch (error) {
                    set({ error: error.message });
                    throw error;
                }
            },
            toggleTeacherStatus: async (id, isActive) => {
                try {
                    const res = await axios.patch(
                        `/api/admins/active/${id}`,
                        { isActive }
                    );
                    set((state) => ({
                        teacher: state.teacher.map((t) =>
                            t.id == id
                                ? { ...t, isActive }
                                : t
                        )
                    }))
                    toast.success(
                        isActive
                            ? "Teacher activated"
                            : "Teacher deactivated"
                    )
                } catch (error) {
                    toast.error("Failed")
                }
            }
        }),
        {
            name: "teacher-storage",
            partialize: (state) => ({
                teacher: state.teacher,
            }),

            onRehydrateStorage: () => (state) => {
                state?.setHydrated();
            }
        }
    )
)