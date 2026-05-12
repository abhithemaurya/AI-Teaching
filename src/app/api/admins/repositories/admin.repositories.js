import { prisma } from "@/lib/prisma";

export const adminRepository = {
  createUser: async (data) => {
    return prisma.user.create({ data });
  },

  findByEmail: async (email) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },


  findByPhone: async (phone) => {
    if (!phone) return null;
    return prisma.user.findUnique({
      where: { phone },
    });
  },

  findByEmailOrPhone: async (identifier) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });
    return user;
  },


  findAll: async () => {
    return prisma.user.findMany({
      where: { role: "ADMIN" },
      orderBy: { createdAt: "desc" },
    });
  },


  findById: async (id) => {
    return prisma.user.findUnique({
      where: { id: Number(id) },
    });
  },

  updateAdmin: async (id, data) => {
    return prisma.user.update({
      where: { id: Number(id) },
      data,
    });
  },

  deleteAdmin: async (id) => {
    console.log("deleteAdmin", id )
    return prisma.user.delete({
      where: { id: Number(id) },
    });
  },
};