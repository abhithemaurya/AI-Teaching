import { configurationValidator } from "@/validators/configurationValidator"
import { createConfigurationService, getConfigurationService } from "../services/configuration.service";
import { ZodError } from "zod";

export const createConfigurationController =
    async (req) => {
        try {
            const body = await req.json()
            const validatedData =
                configurationValidator.parse(
                    body
                );
            const result = await createConfigurationService(
                validatedData
            );
            return Response.json({
                success: true,
                data: result
            })
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                return Response.json(
                    {
                        success: false,
                        errors: error.errors
                    },
                    { status: 400 }
                );
            }
            return Response.json(
                {
                    success: false,
                    message: "Something went wrong"
                },
                {
                    status: 500
                }
            )
        }
    }

export const getConfigurationController = async () => {
    try {
        const result = await getConfigurationService()
        return Response.json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log("Get Config Error", error);
        return Response.json(
            {
                success: false,
                message:error?.message || "Something went wrong"
            },
            { status: 500 }
        );
    }
}