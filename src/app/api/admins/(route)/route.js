import { adminController } from "../controllers/admin.controller";


export async function POST(req) {
  return adminController.createAdmin(req);
}
export async function GET(req) {
  return adminController.getAll(req)
  
}