import { useAuthStore } from "@/features/auth/stores/authStore";
import { toast } from "sonner";
import { create } from "zustand";




export const useAiStore=
create((set)=>({
    prompts: [],
    loading: false,


    getPrompts:
    async()=>{
        try {
            set({
                loading:true,
            });
            const token =useAuthStore.getState().token
            console.log("Token from atStore", token)
            if(!token)throw new Error("Token not found")

            const response= 
            // C:\Users\maged\ai-teaching\src\app\api\admins\prompt\(route)\route.js
            await fetch("/api/admins/prompt",
                {
                 method:"GET",
                 headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                 }
                }
            )

            const data = await response.json()
            if(!response.ok){
                throw new Error(
                    data?.message
                );
            }
            set({
                prompts: data.data,
            })
        } catch (error) {
            console.log(error)
            toast.error(
                error.message
            )
        }finally{
            set({
                loading:false
            })
        }
    },
    savePrompt: async(payload)=>{
     try {
        set({
            loading:true, 
        })

        // C:\Users\maged\ai-teaching\src\app\api\admins\prompt\(route)\route.js
        const response= await fetch("/api/admins/prompt",
            {
            method:"POST",
            headers:{
             "Content-Type" :"application/json"
             
            },
            body:JSON.stringify(
                payload
            ),
        })
        const data = await response.json();
        if(!response.ok){
            throw new Error(
                data?.message
            )
        }
        toast.success(
            "Prompt save"
        );
        return data;
     } catch (error) {
       console.log(error)
       toast.error(error.message) 
     }finally{
        set({
            loading:false
        })
     }
    }
}))