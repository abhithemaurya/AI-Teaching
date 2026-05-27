import bcrypt from "bcryptjs";
import { authRepository } from "@/app/api/auth/repositories/auth.repositories";
import jwt  from "jsonwebtoken";    
const JWT_SECRET = process.env.JWT_SECRET; 


export const authService = {
   async register(data){
     const {email, phone, password, name, school, role}= data 
    const existingEmail= await authRepository.findByEmail(email);
    const existingPhone = await authRepository.findByPhone(phone)
    if(existingEmail &&  existingEmail.status !== "REJECT"){
     throw new Error("Email alredy exists")   
    }
    if(existingPhone && existingPhone.status !== "REJECT"){
        throw new Error("Phone already exists")
    }
    const hashedPassword =await bcrypt.hash(password,10);
    let status= "APPROVE"
    if(role ==="TEACHER"){
        status = "PENDING"
    }
    if(existingEmail && existingEmail.status === "REJECT"){
        const updateUser= await authRepository.updateUser(
            existingEmail.id,
            {
                email,phone, name,school, password:hashedPassword, role, status: "PENDING"
            }
        )
        return updateUser
    }
    const user = await authRepository.createUser({
        email,phone, name, school, password: hashedPassword, role, status
    })
    return user
   }

,
    //  async register(data) {
    //     const { email, phone, password, name, school, role } = data
    //     const existingEmail = await authRepository.findByEmail(email);
    //     if (existingEmail) {
    //         throw new Error("Email already exists");
    //     }
    //     const existingPhone = await authRepository.findByPhone(phone);
    //     if (existingPhone) {
    //         throw new Error("Phone already exists");
    //     }
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     let status="APPROVE";
    //     if(role==="TEACHER"){
    //         status="PENDING"
    //     }
    //     const user = await authRepository.createUser({
    //         email, phone, name, school, password: hashedPassword,
    //         role,
    //         status,
    //     })
    //     return user;
    // },

    async login(data) {
        let { identifier, email, phone, password } = data
        identifier = identifier || email || phone
        if (!identifier) {
            throw new Error("Identfier (email or password) is required")
        }
        identifier = identifier.trim();
        const user = await authRepository.findByEmailOrPhone(identifier);
        console.log("user from service", user)
        if (!user) {
            throw new Error("User not found")
        }
        if(user.status ==="PENDING"){
          throw new Error("Your account is under review")
        }
        if(user.status==="REJECT"){
         throw new Error("Your account has been rejected")
        }
        if(!user.isActive){
            throw new Error("Your account is temporarily inactive")
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error("Invalid credentials")
        }
        const token= jwt.sign(
            {
                id:user.id,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "1d" } 
        )
        console.log(token ,user)
        return {user , token}  
    },
    async createAdmin (data, currentUser){
      if(currentUser.role !=="SUPERADMIN"){
        throw new Error("Unauthorized: Only superAdmin can create Admin")
      } 
      const {email,phone,password,name,school}=data;
      const existingEmail=await authRepository.findByEmail(email);
      if(existingEmail){
        throw new Error("Email already exists");   
      }
      const existingPhone =await authRepository.findByPhone(phone);
      if(existingPhone){
        throw new Error("Phone number is already exists")
      }
      const hashedPassword= await bcrypt.hash(password,10)
      return authRepository.createUser({
        email,phone,name,school,password:hashedPassword, role:"ADMIN",
      })
    },
    async getProfile(userId){
        const user =await authRepository.findById(userId)
        if(!user){
            throw new Error("User not found")
        }
        console.log("getProfile", user)
        return user   
    },
    async updateProfile(userId, data){
        const {name, phone,school}= data
        const user= await authRepository.findById(userId);
        if(!user){
            throw new Error("User not found")
        }
        if(phone && phone !== user.phone){
            const existingPhone =await authRepository.findByPhone(phone);
            if(existingPhone){
                throw new Error("Phone already exists")
            }
        }
        const updateUser= await authRepository.updateUser(userId,{
            name, phone,school
        })
        return updateUser
    }
}

