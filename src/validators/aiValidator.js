import { z } from "zod";

export const generateQuestionValidator =
z.object({

  topic: z
    .string({
      required_error:
        "Topic is required",
    })
    .min(
      2,
      "Topic must be at least 2 characters"
    ),

  difficulty: z.enum([
    "Beginner",
    "Intermediate",
    "Advanced",
  ]),

  questionType: z.enum([
    "Multiple Choice",
    "True/False",
  ]),

  totalQuestions: z.coerce
    .number({
      required_error:
        "Total questions is required",
    })
    .min(
      1,
      "Minimum 1 question required"
    )
    .max(
      150,
      "Maximum 150 questions allowed"
    ),

});