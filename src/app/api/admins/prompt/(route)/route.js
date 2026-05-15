import { getPromptsController, savePromptController } from "../controllers/prompt.controller";

export async function GET() {
    return getPromptsController()
}

export async function POST(req) {
    return savePromptController(
        req
    );
}