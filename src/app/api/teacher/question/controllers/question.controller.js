import { success, ZodError } from "zod";
import { verifyToken } from "@/lib/auth";
import {
  generateQuestionValidator,
} from "@/validators/aiValidator";
import { deleteGeneratedQuestionService, generatedQuestionService, getTeacherQuestionsService, updateGeneratedQuestionService } from "../services/question.service";


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
    }
    catch (error) {
      console.log(
        "QUESTION GENERATED ERROR",
        error
      );

      if (error instanceof ZodError) {
        return Response.json(
          {
            success: false,
            errors: error.errors,
          },
          { status: 400 }
        );
      }

      let message =
        "AI generation failed";
      if (
        error?.message?.includes(
          "API_KEY_INVALID"
        )
      ) {
        message =
          "Invalid API key";
      }
      else if (
        error?.message
          ?.toLowerCase()
          ?.includes("quota") ||
        error?.status === 429
      ) {
        message =
          "API quota exceeded. Try again later";
      }
      else if (
        error?.message
          ?.toLowerCase()
          ?.includes("model") ||
        error?.code ===
        "model_not_found"
      ) {
        message =
          "Selected AI model is not available";
      }
      else if (
        error?.message?.includes(
          "Incorrect API key"
        ) ||
        error?.message?.includes(
          "API key not valid"
        )
      ) {
        message =
          "Invalid API key";
      }
      else if (error?.message) {
        message = error.message;
      }
      return Response.json(
        {
          success: false,
          message,
        },
        {
          status:
            error?.status || 500,
        }
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
export const updateGeneratedQuestionController =
  async (req, context) => {

    try {

      const user =
        verifyToken(req);

      if (!user) {

        return Response.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 401 }
        );
      }

      const body =
        await req.json();

      const params =
        await context.params;

      const result =
        await updateGeneratedQuestionService(
          Number(params.id),
          body.questions
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
          message: "Update failed",
        },
        { status: 500 }
      );
    }
  };

export const deleteGeneratedQuestionController =
  async (req, context) => {
    try {
      const user = verifyToken(req)
      if (!user) {
        return Response.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 401 }
        )
      }
      const params =
        await context.params;
      await deleteGeneratedQuestionService(
        Number(params.id),
        user.id
      );
      return Response.json({
        success: true
      })
    } catch (error) {
      return Response.json(
        {
          success: false,
          message: "Delete failed"
        },
        { status: 500 }
      )
    }
  }