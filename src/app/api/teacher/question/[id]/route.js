import { deleteGeneratedQuestionController, updateGeneratedQuestionController } from "../controllers/question.controller";

export async function PUT(req,context

) {
  return updateGeneratedQuestionController(
    req,context
  )    
}

export async function DELETE(req,context) {
     return deleteGeneratedQuestionController(req,context)
}