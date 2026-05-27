import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      teacherId,
      topic,
      difficulty,
      studentClass,
      questionType,
      totalQuestions,
      questions,
      status = "DRAFT",
      downloadEnabled = false,
      downloadCount = 0,
    } = body;

    const saveQuestion = await prisma.generatedQuestion.create({
      data: {
        teacherId,
        topic,
        difficulty,
        studentClass,
        questionType,
        totalQuestions,
        questions,
        status,
       downloadEnabled,
       downloadCount,
      },
    });

    return Response.json({
      success: true,
      data: saveQuestion,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}