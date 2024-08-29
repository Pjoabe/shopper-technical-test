import { Request, Response } from "express";
import { confirmService } from "../services/comfirmService";

export const confirmController = {
  confirm: async (req: Request, res: Response) => {
    try {
      const { measure_uuid, confirmed_value } = req.body;

      if (typeof measure_uuid !== "string" || measure_uuid.trim() === "") {
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Invalid measure_uuid",
        });
      }

      if (typeof confirmed_value !== "number" || isNaN(confirmed_value)) {
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Invalid confirmed_value",
        });
      }

      const hasExtraParameters = Object.keys(req.body).length !== 2;
      if (hasExtraParameters) {
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Unexpected extra parameters",
        });
      }

      await confirmService.confirmMeasure(measure_uuid, confirmed_value);

      res.status(200).json({ success: true });
    } catch (error: any) {
      if (error.message === "MEASURE_NOT_FOUND") {
        return res.status(404).json({
          error_code: "MEASURE_NOT_FOUND",
          error_description: "Leitura não encontrada",
        });
      }
      if (error.message === "CONFIRMATION_DUPLICATE") {
        return res.status(409).json({
          error_code: "CONFIRMATION_DUPLICATE",
          error_description: "Leitura já confirmada",
        });
      }
      res.status(500).json({
        error_code: "INTERNAL_SERVER_ERROR",
        error_description: "Internal server error",
      });
    }
  },
};
