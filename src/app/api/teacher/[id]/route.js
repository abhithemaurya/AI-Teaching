import { teacherController } from "../controllers/teacher.controller";


export async function GET(req, context) {
    const {id}= context.params;
    return teacherController.getById(req,id)
}
export async function PUT(req, context) {
    const {id}= await context.params;
    return teacherController.update(req,id);
}
export async function DELETE(req,context) {
    const {id}= await context.params
    return teacherController.delete(req,id);
}
