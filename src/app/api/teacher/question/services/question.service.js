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

      const config =
        await questionRepository
          .getActiveAIConfig();

      if (!config) {
        throw new Error(
          "AI configuration not found"
        );
      }
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
      else if (
        config.provider === "grok"
      ) {
        const grok =
          new OpenAI({
            apiKey: config.apiKey,
            baseURL:
              "https://api.groq.com/openai/v1",
          });

        const response =
          await grok.responses.create({
            model: config.model,
            input: finalPrompt,
          });

        aiText =
          response.output_text;
      }
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
      else {

        throw new Error(
          "Unsupported AI provider"
        );
      }
      const cleaned =
        aiText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
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