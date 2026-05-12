import { verifyToken } from "@/lib/auth";
import { adminService } from "../services/admin.services";

export const adminController = {
  async createAdmin(req) {
    try {
      const currentUser = verifyToken(req);
      const body = await req.json();
      console.log("body", body)

      const user = await adminService.createAdmin(body, currentUser);
      const { password, ...safeUser } = user;

      return Response.json(
        { success: true, data: safeUser },
        { status: 201 }
      );
    } catch (error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 403 }
      );
    }
  },

  async getAll(req) {
    try {
      verifyToken(req);
      const admins = await adminService.getAll();

      return Response.json({
        success: true,
        data: admins,
      });
    } catch (error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
  },

  async getById(req, id) {
    try {
      verifyToken(req);
      const admin = await adminService.getById(id);

      return Response.json({
        success: true,
        data: admin,
      });
    } catch (error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
  },

async update(req, id) {
  try {
    const currentUser = verifyToken(req);

    if (currentUser.role !== "SUPERADMIN") {
      throw new Error("Unauthorized");
    }

    const body = await req.json();

    const updated = await adminService.update(id, body);

    return Response.json(
      {
        success: true,
        message: "Admin updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
},

  async delete(req, id) {
    try {
      const currentUser = verifyToken(req);

      if (currentUser.role !== "SUPERADMIN") {
        throw new Error("Unauthorized");
      }

      await adminService.delete(id);

      return Response.json({
        success: true,
        message: "Admin deleted",
      });
    } catch (error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
  },
};