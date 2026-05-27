import { prisma } from "@/lib/prisma";

export const questionRepository = {
  getPromptByType: async (type) => {
    return prisma.aIPrompt.findMany({
      where: {
        type:{
          in:type,
        },
        isActive: true,
      },
    });
  },
  getActiveAIConfig: async () => {
    return prisma.aIConfiguration.findFirst({
      where: {
        isActive: true,
      },
    });
  },
  createGeneratedQuestion: async (data) => {
    return prisma.generatedQuestion.create({
      data,
    });
  },
  getTeacherQuestions: async (
    teacherId
  ) => {
    return prisma.generatedQuestion.findMany({
      where: {
        teacherId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  updategeneratedQustion: async (
    id,
    questions
  ) => {
    return prisma.generatedQuestion.update({
      where: {
        id,
      },
      data: {
        questions,
      }
    })
  },
  deleteGeneratedQuestion: async(
    id,teacherId
  )=>{
    return prisma.generatedQuestion.delete({
      where:{
        id, teacherId
      }
    })
  }

};