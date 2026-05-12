import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { adminRepository } from "../repositories/admin.repositories";
const JWT_SECRET = process.env.JWT_SECRET; 

export const adminService={
      async createAdmin (data, currentUser){

      if(currentUser.role !=="SUPERADMIN"){
        throw new Error("Unauthorized: Only superAdmin can create Admin")
      } 
      const {email,phone,password,name}=data;
      const existingEmail=await adminRepository.findByEmail(email);
      if(existingEmail){
        throw new Error("Email already exists");
      }
      const existingPhone =await adminRepository.findByPhone(phone);
      if(existingPhone){
        throw new Error("Phone number is already exists")
      }
      const hashedPassword= await bcrypt.hash(password,10)
      return adminRepository.createUser({
        email,phone,name,password:hashedPassword, role:"ADMIN",
      })
    },
    async getAll(){
        return await adminRepository.findAll()
    },
    async getById(id){
        const admin =await adminRepository.findById(id);
        if(!admin) throw new Error("Admin not found")
            return admin
    },
  async update(id, data) {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    return await adminRepository.updateAdmin(id, data);
},
    async delete(id){
        console.log("delete", id)
        return await adminRepository.deleteAdmin(id);
    }

}