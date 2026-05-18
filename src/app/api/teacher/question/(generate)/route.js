import { generatedQuestionController, getTeacherQuestionsController } from "../controllers/question.controller";

export async function POST(req) {
  return generatedQuestionController(req);
}

export async function GET(req) {
  return getTeacherQuestionsController(req);
}