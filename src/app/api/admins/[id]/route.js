import { adminController } from "../controllers/admin.controller";

export async function GET(req, context) {
  const { id } = context.params;
  return adminController.getById(req, id);
}

export async function PUT(req, context) {
  const { id } = await context.params; 
  return adminController.update(req, id);
}

export async function DELETE(req, context) {
  const { id } =await context.params;
  return adminController.delete(req, id);
}