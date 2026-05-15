import OpenAI from "openai";

import { GoogleGenerativeAI }
from "@google/generative-ai";

import { questionRepository }
from "../repositories/question.repositories";

export const generatedQuestionService =
async (body, user) => {

  try {

    const {
      topic,
      difficulty,
      questionType,
      totalQuestions,
    } = body;

    // =========================
    // GET ACTIVE AI CONFIG
    // =========================

    const config =
      await questionRepository
        .getActiveAIConfig();

    if (!config) {
      throw new Error(
        "AI configuration not found"
      );
    }

    // =========================
    // GET PROMPT
    // =========================

    const promptData =
      await questionRepository
        .getPromptByType(
          questionType
        );

    if (!promptData) {
      throw new Error(
        `No prompt found for type: ${questionType}`
      );
    }

    // =========================
    // FINAL PROMPT
    // =========================

    const finalPrompt = `
${promptData.prompt}

Topic: ${topic}
Difficulty: ${difficulty}
Total Questions: ${totalQuestions}

Return ONLY valid JSON array.

Format:
[
  {
    "question": "",
    "options": [],
    "correct": 0
  }
]
`;

    let aiText = "";

    // =========================
    // OPENAI
    // =========================

    if (
      config.provider === "openai"
    ) {

      const openai =
        new OpenAI({
          apiKey: config.apiKey,
        });

      const completion =
        await openai.chat.completions.create({

          model: config.model,

          messages: [
            {
              role: "system",
              content:
                "You are an expert educational question generator.",
            },
            {
              role: "user",
              content: finalPrompt,
            },
          ],

          temperature: 0.7,
        });

      aiText =
        completion
          .choices[0]
          .message
          .content;
    }

    // =========================
    // GROK
    // =========================

    else if (
      config.provider === "grok"
    ) {

      const grok =
        new OpenAI({

          apiKey: config.apiKey,

          baseURL:
            "https://api.x.ai/v1",
        });

      const response =
        await grok.responses.create({

          model: config.model,

          input: finalPrompt,
        });

      aiText =
        response.output_text;
    }

    // =========================
    // GOOGLE GEMINI
    // =========================

    else if (
      config.provider === "google"
    ) {

      const genAI =
        new GoogleGenerativeAI(
          config.apiKey
        );

      console.log(
        "CONFIG DATA:",
        config
      );

      const model =
        genAI.getGenerativeModel({
          model: config.model,
        });

      const result =
        await model.generateContent(
          finalPrompt
        );

      const response =
        result.response;

      aiText =
        response.text();
    }

    // =========================
    // INVALID PROVIDER
    // =========================

    else {

      throw new Error(
        "Unsupported AI provider"
      );
    }

    // =========================
    // CLEAN RESPONSE
    // =========================

    const cleaned =
      aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    // =========================
    // PARSE JSON
    // =========================

    let parsedQuestions;

    try {

      parsedQuestions =
        JSON.parse(cleaned);

    } catch (jsonError) {

      console.log(
        "JSON PARSE ERROR:",
        cleaned
      );

      throw new Error(
        "AI returned invalid JSON format"
      );
    }

    // =========================
    // SAVE QUESTIONS
    // =========================

    const saved =
      await questionRepository
        .createGeneratedQuestion({

          teacherId: user.id,

          topic,
          difficulty,
          questionType,
          totalQuestions,

          questions:
            parsedQuestions,
        });

    return saved;

  } catch (error) {

    console.log(
      "AI GENERATION ERROR:",
      error
    );

    throw error;
  }
};

export const getTeacherQuestionsService =
async (teacherId) => {

  return await questionRepository
    .getTeacherQuestions(
      teacherId
    );
};