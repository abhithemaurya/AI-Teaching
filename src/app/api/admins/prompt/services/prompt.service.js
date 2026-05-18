import { promptRepositories } from "../repositories/prompt.repositories"


export const getPromptsService= async()=>{
    return await promptRepositories.getAll()
}

export const savePromptService= async(body)=>{
    const existingPrompt=
    await promptRepositories.getByType(body.type)
    if(existingPrompt){
        return await promptRepositories.update(
            existingPrompt.id,
            body.prompt
        )
    }
    return await promptRepositories
    .create({
        title: body.type,
        type: body.type,
        prompt:body.prompt
    })
}