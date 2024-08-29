import { Request, Response } from 'express';
import { listService } from '../services/listService';

export const listController = {
  list: async (req: Request, res: Response) => {
    try {
      const { customer_code } = req.params;
      const { measure_type } = req.query;

      if (measure_type && !['WATER', 'GAS'].includes(measure_type.toString().toUpperCase())) {
        return res.status(400).json({
          error_code: "INVALID_TYPE",
          error_description: "Tipo de medição não permitida"
        });
      }
      const measures = await listService.listMeasures(customer_code, measure_type as string);


      if (measures.length === 0) {
        return res.status(404).json({
          error_code: "MEASURES_NOT_FOUND",
          error_description: "Nenhuma leitura encontrada"
        });
      }

      res.status(200).json({
        customer_code,
        measures
      });
    } catch (error) {
      res.status(500).json({
        error_code: "INTERNAL_SERVER_ERROR",
        error_description: "Erro interno do servidor"
      });
    }
  }
};
