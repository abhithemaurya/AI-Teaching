import { NextResponse } from "next/server";
import { authController } from "../../controllers/auth.controller";

export async function GET(req) {
  return authController.getProfile(req); 
}

// UPDATE profile
export async function PUT(req) {
  return authController.updateProfile(req);
}