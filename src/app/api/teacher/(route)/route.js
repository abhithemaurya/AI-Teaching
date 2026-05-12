import { teacherController } from "../controllers/teacher.controller";

export async function POST(req) {
  return teacherController.createTeacher(req)    
}
export async function GET(req) {
    return teacherController.getAll(req)
}