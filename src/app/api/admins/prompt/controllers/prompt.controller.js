import { ZodError } from "zod"
import { getPromptsService, savePromptService } from "../services/prompt.service"
import promptValidator from "@/validators/promptValidator";


export const getPromptsController =
async()=>{
    try {
        const result= await getPromptsService()
        return Response.json({
            success:true,
            data:result
        })
    } catch (error) {
        console.log(error)
        return Response.json(
            {
                success:false,
                message:"Something went wrong"
            },{status: 500}
        )
    }
}  
export const savePromptController=
async(req)=>{
    try {
        const body= 
        await req.json()
        const validatedData= promptValidator.parse(
            body
        )
        const result= await savePromptService(
        validatedData
        );
        return Response.json({
            success:true,
            data: result,
        })
    } catch (error) {
        console.log(error);
        if(error instanceof ZodError){
            return Response.json(
                {
                    success:false,
                    error:error.errors,
                },
                {status:400}
            );
        }
        return Response.json(
            {
                success:false,
                message:'Something went wrong'
            },{status:500}
        )
    }
}