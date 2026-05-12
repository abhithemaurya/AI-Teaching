
import { teacherRepository } from "../repositories/teacher.repositories";
import bcrypt from "bcryptjs";

export const teacherService={
   async createTeacher(data, currentUser) {
  if (currentUser.role !== "SUPERADMIN") {
    throw new Error("Unauthorized: Only super admin can create Teacher");
  }
  const { name, email, phone, school, password } = data;

  const existingEmail = await teacherRepository.findByEmail(email);
  if (existingEmail) {
    throw new Error("Email already exists");
  }
  const existingPhone = await teacherRepository.findByPhone(phone);
  if (existingPhone) {
    throw new Error("Phone number already exists");
  }
  const plainPassword = password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const teacher = await teacherRepository.createTeacher({
    name,
    email,
    phone,
    school,
    password: hashedPassword,
    role: "TEACHER",
  });


  sendAddTeacherNotification(teacher, plainPassword).catch((err) =>
    console.log("Email Error:", err)
  );
  return teacher;
},
    async getAll(){
        return await teacherRepository.findAll()
    },
    async getById(id){
        const teacher= await teacherRepository.findById(id);
        if(!teacher){
            throw new Error("Teacher not found")
            return teacher
        }
    },
    async update(id,data){
        if(data.password){
            data.password= await bcrypt.hash(data.password,10);
        }
        return await teacherRepository.updateTeacher(id,data)
    },
    async delete(id){
        return await teacherRepository.deleteTeacher(id)
    }
}