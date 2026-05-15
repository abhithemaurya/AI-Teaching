import { createConfigurationController, getConfigurationController } from "../controllers/configuration.controller";



export async function POST(req) {
  return createConfigurationController(req)
}

export async function GET(req) {
    return getConfigurationController(req)
    
}




