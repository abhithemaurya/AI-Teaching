import { useAuthStore } from "@/features/auth/stores/authStore";
import { toast } from "sonner";
import { create } from "zustand";



export const useConfigurationStore=
create((set)=>({
    configuration: null,
    loading :false,
    
    saveConfiguration:
        async(payload)=>{
            try {
                set({loading:true})
                const token= useAuthStore.getState().token;
                console.log("token from config", token)
                if(!token) throw new Error("token not found")
                    const response = await fetch("/api/admins/configuration",
                    {
                        method: "POST",
                        headers:{
                            "Content-Type":"application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body:JSON.stringify(
                            payload
                        ),
                    }

                    );
                    const data = await response.json()
                    console.log("data from config", data)
                    if(!response.ok){
                        throw new Error(
                            data?.message
                        );
                    }
                    toast.success(
                        "Configuration save"
                    )
                    set({
                        configuration:
                        data.data,
                    })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }finally{
                set({loading: false})
            }
        },
        getConfiguration: 
        async()=>{

       
            try {
                set({loading: true})
              const token = useAuthStore.getState().token;
                const response= await fetch("/api/admins/configuration",{
                    method:"GET",
                    headers:{
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`
                    }
                })
                const data= await response.json()
                if(!response.ok){
                    throw new Error(
                        data?.message
                    )
                }
                set({
                    configuration: data.data,
                })
            } catch (error) {
                console.log(error)
                toast.error(
                    error.message
                )
            }finally{
                set({loading: false})
            }
        }
    
}))