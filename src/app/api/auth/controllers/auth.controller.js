import { authService } from "@/app/api/auth/services/auth.service";
import { sendAccountCreated } from "@/features/services/email.service";
import { varifyToken, verifyToken } from "@/lib/auth";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";


export const authController={
    async register(req){
        try {
            const body= await req.json();
            const user= await authService.register(body);
            const {password, ...safeUser}= user
             sendAccountCreated(user)
            return Response.json(
                {    
                    success:true,     
                    message: user.role==="TEACHER" ? "Account created. Wait for approvel" :"User created successfully",
                    data:safeUser,                   
                },
            );
        } catch (error) {
          return Response.json(
            {
                success:false,
                message: error.message,             
            },
            {status: 400}
          )  
        }
    },
    async login(req){
    try {
        const body= await req.json();
        const {user,token }= await authService.login(body)
        const {password, ...safeUser}= user
        
        return Response.json(
            {
                success:true,
                message:"Login successful",
                data: safeUser,
                token,
            },
            {status:200}
        );
    } catch (error) {
        console.log(error)
        return Response.json(
            {
                success:false,
                message:error.message,
            },
            {status:401}
        )
    }
    },
async getProfile(req) {
  try {
    const decoded = verifyToken(req);
    console.log("DECODED:", decoded);

    const user = await authService.getProfile(decoded.id);
    console.log("USER:", user);

    return Response.json(user); 

  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 401 }
    );
  }
},
  async updateProfile(req) {
  try {
    const decoded = verifyToken(req);
    const userId = decoded.id;
    const body = await req.json();
    console.log(" BODY:", body);
    const updateUser = await authService.updateProfile(userId, body);

    return Response.json(updateUser);

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 401 }
    );
  }
}


}