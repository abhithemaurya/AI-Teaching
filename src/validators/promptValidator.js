import z from "zod";

const promptValidator = z.object({
  type: z
    .string()
    .min(2, "Type is required"),
  prompt: z
    .string()
    .min(
      10,
      "Prompt must be at least 10 characters"
    ),
});

export default promptValidator;