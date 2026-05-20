import { authController } from "../../controllers/auth.controller";

export async function POST(req) {
  return authController.login(req);
}