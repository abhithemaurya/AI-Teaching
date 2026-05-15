
import { approveUser, getPendingUsers, rejectUser } from "../../auth/controllers/userApproval.controller";



export async function GET() {
    return getPendingUsers()

}

export async function PUT(req) {
    const {action, userId}= await req.json()
    if(action=== "APPROVE"){
        return approveUser(userId)
    }
    if(action === "REJECT"){
        return rejectUser(userId)
    }
    return Response.json({message:"Invalid action"}, {status:400})
}