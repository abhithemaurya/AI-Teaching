import { configurationValidator }
from "@/validators/configurationValidator";

import {
  createConfigurationService,
  getConfigurationService
} from "../services/configuration.service";

import { ZodError } from "zod";

export const createConfigurationController =
  async (req) => {

    try {

      const body =
        await req.json();

      const validatedData =
        configurationValidator.parse(
          body
        );

      const result =
        await createConfigurationService(
          validatedData
        );

      return Response.json({
        success: true,
        data: result
      });

    } catch (error) {

      console.log(
        "CONFIGURATION ERROR:",
        error
      );

      if (
        error instanceof ZodError
      ) {
        return Response.json(
          {
            success: false,
            errors: error.errors
          },
          { status: 400 }
        );
      }

      let message =
        "Configuration failed";

      // Prisma duplicate error
      if (
        error?.code === "P2002"
      ) {
        message =
          "Configuration already exists";
      }

      // Invalid API key
      else if (
        error?.message
          ?.includes("API key")
      ) {
        message =
          "Invalid API key";
      }

      // Fallback
      else if (error?.message) {
        message =
          error.message;
      }

      return Response.json(
        {
          success: false,
          message
        },
        {
          status:
            error?.status || 500
        }
      );
    }
  };

export const getConfigurationController =
  async () => {

    try {

      const result =
        await getConfigurationService();

      return Response.json({
        success: true,
        data: result
      });

    } catch (error) {

      console.log(
        "GET CONFIG ERROR:",
        error
      );

      return Response.json(
        {
          success: false,
          message:
            error?.message ||
            "Failed to fetch configuration"
        },
        {
          status:
            error?.status || 500
        }
      );
    }
  };