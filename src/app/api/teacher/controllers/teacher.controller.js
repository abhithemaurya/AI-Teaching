import { verifyToken } from "@/lib/auth"
import { teacherService } from "../services/teacher.service"

export const teacherController={
    async createTeacher(req){
        try {
            const currentTeacher= verifyToken(req)
            const body = await req.json()

            const teacher= await teacherService.createTeacher(body, currentTeacher)
            const {password, ...safeUser}=teacher
            return Response.json(
                {success:true, data:safeUser},
                {status:201}
            )

        } catch (error) {
            return Response.json(
                {success:false, message:error.message},
                {status:403}
            );
            
        }
    },
    async getAll(req){
        try {
            verifyToken(req);
            const teacher =await teacherService.getAll();
            return Response.json({
                success:true,
                data: teacher
            })
        } catch (error) {
            return Response.json(
                {success:false, message:error.message},
                {status:400}
            );
        }
    },
    async getById(req,id){
       try {
         verifyToken(req);
        const teacher= await teacherService.teacherService.getById(id)
        return Response.json({
            success:true,
            data:teacher,
        });
       } catch (error) {
        return Response.json(
            {success:false, message:error.message},
            {status: 400}
        )
       }
    },
    async update(req,id){
        try {
            const currentTeacher= verifyToken(req);
            if(currentTeacher.role !== "SUPERADMIN"){
                throw new Error("unauthorized");
            }
            const body= await req.json()
            const updated= await teacherService.update(id,body)
            return Response.json(
                {
                    success:true,
                    message:"Teacher updated successfully",
                    data: updated,
                },
                {status:200}
            )
         } catch (error) {
            return Response.json(
                {success:false, message:error.message},
                {status:400}
            )
        }
    },
    async delete(req,id){
        try {
            const currentTeacher= verifyToken(req);
            if(currentTeacher.role !== "SUPERADMIN"){
                throw new Error("Unauthorized")
            }
            await teacherService.delete(id)
            return Response.json({
                success:true,
                message:"Admin deleted"
            })
        } catch (error) {
            return Response.json(
                {success:false, message: error.message},
                {status: 400}
            );
        }
    }
}