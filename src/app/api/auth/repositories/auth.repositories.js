import { prisma } from "@/lib/prisma";

export const authRepository = {
  createUser: async (data) => {
    return prisma.user.create({
      data: {
        ...data,
        status:
          data.status || (data.role === "TEACHER" ? "PENDING" : "APPROVE"),
      },
    });
  },
  findByEmail: async (email) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findByPhone: async (phone) => {
    return prisma.user.findUnique({
      where: { phone },
    });
  },
  findByEmailOrPhone: async (identifier) => {
    console.log("Search for: ", identifier);
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });
    console.log("found user", user);
    return user;
  },
  updateUserStatus: async (id, status) => {
    return prisma.user.update({
      where: { id },
      data: { status },
    });
  },
  getPendingTeachers: async () => {
    return prisma.user.findMany({
      where: {
        role: "TEACHER",
        status: "PENDING",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  findById: async (id) => {
    console.log("FIND USER ID:", id);

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    console.log("DB RESULT:", user);

    return user;
  },
  updateUser: async (id, data) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },
};
