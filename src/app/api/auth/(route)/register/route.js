// app/api/auth/register/route.js

import { authController } from "../../controllers/auth.controller";

export async function POST(req) {
  return authController.register(req);
}