import { Request, Response } from "express";
import { uploadService } from "../services/uploadService";

export const uploadController = {
  upload: async (req: Request, res: Response) => {
    try {
      const { image, customer_code, measure_datetime, measure_type } = req.body;

      const allowedFields = [
        "image",
        "customer_code",
        "measure_datetime",
        "measure_type",
      ];
      const receivedFields = Object.keys(req.body);

      const extraFields = receivedFields.filter(
        (field) => !allowedFields.includes(field)
      );
      if (extraFields.length > 0) {
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: `Invalid fields provided: ${extraFields.join(
            ", "
          )}`,
        });
      }

      if (!image || !customer_code || !measure_datetime || !measure_type) {
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Missing required fields",
        });
      }

      if (
        typeof image !== "string" ||
        typeof customer_code !== "string" ||
        typeof measure_type !== "string"
      ) {
        throw new Error("INVALID_TYPE");
      }

      const date = new Date(measure_datetime);
      if (isNaN(date.getTime())) {
        throw new Error("INVALID_TYPE");
      }

      const result = await uploadService.processUpload(
        image,
        customer_code,
        measure_datetime,
        measure_type as "WATER" | "GAS"
      );
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Error in upload controller:", error);

      if (error.message === "DOUBLE_REPORT") {
        return res.status(409).json({
          error_code: "DOUBLE_REPORT",
          error_description: "Leitura do mês já realizada",
        });
      }

      if (error.message === "INVALID_TYPE") {
        return res.status(400).json({
          error_code: "INTERNAL_SERVER_ERROR",
          error_description: "Invalid data type provided in request body",
        });
      }

      return res.status(500).json({
        error_code: "INTERNAL_SERVER_ERROR",
        error_description: "Internal server error",
        message: error.message,
      });
    }
  },
};
