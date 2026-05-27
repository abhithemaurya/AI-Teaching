import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { questionRepository } from "../repositories/question.repositories";

export const generatedQuestionService = async (body, user) => {
  try {
    const { topic, difficulty, questionType, totalQuestions, studentClass } =
      body;
    const config = await questionRepository.getActiveAIConfig();
    if (!config) {
      throw new Error("AI configuration not found");
    }
    const promptData = await questionRepository.getPromptByType(questionType);
    // if (!promptData || promptData.length===0) {
    //   throw new Error(`No prompt found for types`);
    // }
const finalPrompt = `
${promptData.map((p) => p.prompt).join("\n")}

EXAM CONFIGURATION

Topic: ${topic}

Student Class: ${studentClass}

Difficulty Level: ${difficulty}

Question Types: ${questionType.join(", ")}

Total Questions: ${totalQuestions}

IMPORTANT RULES

1. Academic Quality
- Questions must be educationally meaningful.
- Questions must follow school-level academic standards.
- Questions must match the syllabus level of ${studentClass}.
- Questions should test understanding, not only memorization.

2. Difficulty Rules
- Beginner = easy for that class level.
- Intermediate = moderate for that class level.
- Advanced = challenging for that class level.
- Difficulty must always remain age appropriate.

3. Language Rules
- Use simple, clear, grammatically correct language.
- Avoid confusing wording.
- Avoid ambiguous questions.
- Questions should be easy to read and understand.

4. Question Variety
- Avoid duplicate questions.
- Generate diverse questions.
- Mix conceptual, factual, logical, and application-based questions.
- Encourage critical thinking where appropriate.

5. Educational Intelligence
- Follow Bloom's Taxonomy where possible:
  - Remember
  - Understand
  - Apply
  - Analyze
- Questions should improve learning ability.

6. Formatting Rules
- Return ONLY valid JSON array.
- Do NOT return markdown.
- Do NOT add explanations.
- Do NOT add headings outside JSON.
- Do NOT add extra text.

7. Question Type Rules

1. Multiple Choice

Format:
{
  "section": "Multiple Choice",
  "question": "",
  "options": ["", "", "", ""],
  "correct": 0
}

Rules:
- Exactly 4 options
- Only 1 correct answer
- Wrong options should be realistic
- Questions should test conceptual understanding

2. True/False

Format:
{
  "section": "True/False",
  "question": "",
  "options": ["True", "False"],
  "correct": 0
}

Rules:
- Balance true and false answers
- Avoid obvious statements
- Keep statements educational and meaningful

3. Multiple Response

Format:
{
  "section": "Multiple Response",
  "question": "",
  "options": ["", "", "", ""],
  "correct": [0, 2]
}

Rules:
- At least 2 correct answers
- Questions should test deep understanding
- Include analytical and application-based thinking

4. Subjective

Format:
{
  "section": "Subjective",
  "question": ""
}

Rules:
- Encourage explanation and reasoning
- Suitable for written answers
- Questions should improve critical thinking
- Include conceptual and descriptive questions

8. Section Rules

Organize the question paper using these exact sections:

1. Multiple Choice
2. True/False
3. Multiple Response
4. Subjective

Every question object must include a "section" field.

Examples:
- MCQ questions must use "section": "Multiple Choice"
- True/False questions must use "section": "True/False"
- Multiple Response questions must use "section": "Multiple Response"
- Subjective questions must use "section": "Subjective"

9. Student Safety
- Questions must always be safe and age appropriate.
- Avoid harmful, political, adult, violent, or offensive content.

10. Output Quality
- Maintain consistent formatting.
- Ensure all JSON is valid.
- Ensure every question follows its correct structure.
- Ensure section names are correct.
- Ensure no fields are missing.
- Ensure questions are properly distributed according to selected question types.

Generate the final question paper now.
`;
    let aiText = "";
    if (config.provider === "openai") {
      const openai = new OpenAI({
        apiKey: config.apiKey,
      });
      const completion = await openai.chat.completions.create({
        model: config.model,
        messages: [
          {
            role: "system",
            content: "You are an expert educational question generator.",
          },
          {
            role: "user",
            content: finalPrompt,
          },
        ],
        temperature: 0.7,
      });
      aiText = completion.choices[0].message.content;
    } else if (config.provider === "grok") {
      const grok = new OpenAI({
        apiKey: config.apiKey,
        baseURL: "https://api.groq.com/openai/v1",
      });
      const response = await grok.responses.create({
        model: config.model,
        input: finalPrompt,
      });
      aiText = response.output_text;
    } else if (config.provider === "google") {
      const genAI = new GoogleGenerativeAI(config.apiKey);
      console.log("CONFIG DATA:", config);
      const model = genAI.getGenerativeModel({
        model: config.model,
      });
      const result = await model.generateContent(finalPrompt);
      const response = result.response;
      aiText = response.text();
    } else {
      throw new Error("Unsupported AI provider");
    }
    const cleaned = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(cleaned);
    } catch (jsonError) {
      console.log("JSON PARSE ERROR:", cleaned);
      throw new Error("AI returned invalid JSON format");
    }
    // const saved =
    //   await questionRepository
    //     .createGeneratedQuestion({
    //       teacherId: user.id,
    //       topic,
    //       difficulty,
    //       questionType,
    //       totalQuestions,
    //       questions:
    //         parsedQuestions,
    //     });
    // return saved;
    return {
      questions: parsedQuestions,
    };
  } catch (error) {
    console.log("AI GENERATION ERROR:", error);
    throw error;
  }
};
export const getTeacherQuestionsService = async (teacherId) => {
  return await questionRepository.getTeacherQuestions(teacherId);
};
export const updateGeneratedQuestionService = async (id, questions) => {
  return await questionRepository.updategeneratedQustion(id, questions);
};

export const deleteGeneratedQuestionService = async (id, teacherId) => {
  return await questionRepository.deleteGeneratedQuestion(id, teacherId);
};
