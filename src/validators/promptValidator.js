import { z } from "zod";

const promptValidator = z.object({
  title: z
    .string()
    .min(2, "Title is required"),

  type: z
    .string()
    .min(2, "Type is required"),

  description: z
    .string()
    .optional(),

  prompt: z
    .string()
    .min(
      10,
      "Prompt must be at least 10 characters"
    ),
});

export default promptValidator;