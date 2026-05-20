import z from "zod";

export const configurationValidator =
z.object({
  provider: z.enum([
    "openai",
    "anthropic",
    "google",
    "grok",
  ]),
  model: z
    .string()
    .min(
      1,
      "Model is required"
    ),
  apiKey: z
    .string()
    .min(
      10,
      "API Key is required"
    ),
});