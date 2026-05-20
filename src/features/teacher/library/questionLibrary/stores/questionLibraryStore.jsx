import { useAuthStore } from "@/features/auth/stores/authStore";
import { toast } from "sonner";
import { create } from "zustand";


export const useQuestionLibraryStore= create((set,get)=>({
  papers: [],
  loading: false,

  getTeacherLibraries: 
  async()=>{
    try {
      set({
        loading:true,
      });
      const token= useAuthStore.getState().token
      if(!token){
        toast.error("Please login first")
        return;
      }
     const response = await fetch("/api/teacher/question",
      {
       method: "GET",
       headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
       }
     })
     const data = await response.json()
     if(!response.ok){
      throw new Error(
        data.message  || "Failed to fetch library"
      )
     }
     set({
      papers:
      data.data || []
     })
    } catch (error) {
      toast.error(
        error.message
      );

    }finally{
      set({
        loading:false
      })
    }
  },
  deletePaper: 
  async(id)=>{
    try {
      const token =useAuthStore.getState().token;
      if(!token) throw new Error("Plese login first")
      const response = await fetch(`/api/teacher/question/${id}`,
    {
      method: "DELETE",
      headers:{
        Authorization: `Bearer ${token}`
      },
    })
    const data = await response.json()
    if(!response.ok){
      throw new Error(
        data.message || "Deleted failed"
      )
    }
    set({
      papers:
      get().papers.filter(
        (paper)=>
          paper.id !==id
      )
    }) 
    toast.success("Questions deleted successfully") 
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
}))