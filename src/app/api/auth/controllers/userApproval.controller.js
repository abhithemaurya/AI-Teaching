import { sendApprovalEmail, sendRejectionEmail } from "@/features/services/email.service";
import { authRepository } from "../repositories/auth.repositories";


export const approveUser = async (id) => {
    const user = await authRepository.updateUserStatus(Number(id), "APPROVE")
     sendApprovalEmail(user);
    return Response.json({ message: "User approved", user })
}
export const rejectUser = async (id) => {
    const user = await authRepository.updateUserStatus(id, "REJECT");
   sendRejectionEmail(user); 
    return Response.json({ message: "User rejected", user })
}
export const getPendingUsers = async () => {
    const user = await authRepository.getPendingTeachers()
    return Response.json(user);
};