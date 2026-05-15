import { ZodError } from "zod";

import { verifyToken } from "@/lib/auth";

import {
  generateQuestionValidator,
} from "@/validators/aiValidator";
import { generatedQuestionService, getTeacherQuestionsService } from "../services/question.service";


export const generatedQuestionController =
async (req) => {
  try {
    const user = verifyToken(req);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }


    const body = await req.json();

 
    const validatedData =
      generateQuestionValidator.parse(body);

  
    const result =
      await generatedQuestionService(
        validatedData,
        user
      );

    return Response.json({
      success: true,
      data: result,
    });

  } catch (error) {

    console.log(error);


    if (error instanceof ZodError) {
      return Response.json(
        {
          success: false,
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
};

export const getTeacherQuestionsController =
async (req) => {

  try {

    const user = verifyToken(req);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const result =
      await getTeacherQuestionsService(
        user.id
      );

    return Response.json({
      success: true,
      data: result,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
};