import { Request, Response } from "express";
import { listService } from "../services/listService";

export const listController = {
  list: async (req: Request, res: Response) => {
    try {
      const customer_code = req.params.customer_code;
      const measure_type = req.query.measure_type as string | undefined;

      if (measure_type && !["WATER", "GAS"].includes(measure_type.toUpperCase())) {
        return res.status(400).json({
          error_code: "INVALID_TYPE",
          error_description: "Tipo de medição não permitida",
        });
      }

      const measures = await listService.listMeasures(customer_code, measure_type);

      if (measures.length === 0) {
        return res.status(404).json({
          error_code: "MEASURES_NOT_FOUND",
          error_description: "Nenhuma leitura encontrada",
        });
      }

      res.status(200).json({
        customer_code,
        measures: measures.map(measure => ({
          measure_uuid: measure.measure_uuid,
          measure_datetime: measure.measure_datetime,
          measure_type: measure.measure_type,
          has_confirmed: measure.has_confirmed,
          image_url: measure.image_url,
        })),
      });
    } catch (error: any) {
      res.status(500).json({
        error_code: "INTERNAL_SERVER_ERROR",
        error_description: "Internal server error",
      });
    }
  },
};
