import { configurationRepository } from "../repositories/configuration.repositories"

export const createConfigurationService =
    async (body) => {
        return await configurationRepository.create(body)
    };

export const getConfigurationService =
    async () => {
        return await configurationRepository.getActive()

    }